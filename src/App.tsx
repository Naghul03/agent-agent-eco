import React, { useState, useEffect, useRef } from 'react';
import { TransactionState, Agent, Task, Bid, FinancialAssessment, JuryEvaluator, SettlementBreakdown, TransactionRecord, ReputationEvent } from './types';
import { initialBuyerAgent, initialTask, candidateWorkerAgents, initialEvaluators, maliciousEvaluators } from './mock/data';
import { calculateBidsForTask, performFinancialAssessment, calculateConsensus, calculateSettlement, createTransactionRecord, updateWorkerReputation } from './services/engine';
import { generateWorkerSubmission } from './services/geminiService';

import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardOverview } from './components/DashboardOverview';
import { PipelineStepper } from './components/PipelineStepper';
import { FundingPanel } from './components/FundingPanel';
import { TaskCreationPanel } from './components/TaskCreationPanel';
import { DiscoverySection } from './components/DiscoverySection';
import { CompetitionSection } from './components/CompetitionSection';
import { FinancialLayerSection } from './components/FinancialLayerSection';
import { EscrowCollateralSection } from './components/EscrowCollateralSection';
import { ExecutionSection } from './components/ExecutionSection';
import { BlindJurySection } from './components/BlindJurySection';
import { ConsensusSection } from './components/ConsensusSection';
import { SettlementSection } from './components/SettlementSection';
import { TransactionLedgerSection } from './components/TransactionLedgerSection';
import { ReputationUpdateSection } from './components/ReputationUpdateSection';
import { AgentsTab } from './components/AgentsTab';

export function App() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Core State Machine
  const [currentState, setCurrentState] = useState<TransactionState>('FUNDING');
  const [isMalicious, setIsMalicious] = useState<boolean>(false);
  const [autoPlay, setAutoPlay] = useState<boolean>(false);

  // Entities
  const [agentA, setAgentA] = useState<Agent>(initialBuyerAgent);
  const [task, setTask] = useState<Task>(initialTask);
  const [candidates, setCandidates] = useState<Agent[]>(candidateWorkerAgents);
  const [bids, setBids] = useState<Bid[]>([]);
  const [selectedBid, setSelectedBid] = useState<Bid | undefined>();
  const [selectedWorker, setSelectedWorker] = useState<Agent | undefined>();
  const [assessment, setAssessment] = useState<FinancialAssessment | undefined>();
  
  // Execution
  const [executionProgress, setExecutionProgress] = useState<number>(0);
  const [executionOutput, setExecutionOutput] = useState<string>('');

  // Jury & Settlement
  const [evaluators, setEvaluators] = useState<JuryEvaluator[]>(initialEvaluators);
  const [consensusScore, setConsensusScore] = useState<number>(90.6);
  const [settlement, setSettlement] = useState<SettlementBreakdown | undefined>();
  const [ledger, setLedger] = useState<TransactionRecord[]>([]);
  const [reputationLogs, setReputationLogs] = useState<ReputationEvent[]>([]);

  // Modals & Triggers
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false);
  const [showFundModal, setShowFundModal] = useState<boolean>(false);

  // Auto-play step timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (autoPlay) {
      timer = setInterval(() => {
        advanceState();
      }, 2500);
    }
    return () => clearInterval(timer);
  }, [autoPlay, currentState, executionProgress, evaluators]);

  // Step advancement function
  const advanceState = () => {
    switch (currentState) {
      case 'FUNDING':
        handleFundWallet(500);
        setCurrentState('TASK_CREATION');
        break;
      case 'TASK_CREATION':
        handleCreateTask(task);
        break;
      case 'DISCOVERY':
        handleProceedToCompetition();
        break;
      case 'COMPETITION':
        handleProceedToFinancial();
        break;
      case 'FINANCIAL_ASSESSMENT':
        handleProceedToLocking();
        break;
      case 'ESCROW_LOCKED':
        handleProceedToExecution();
        break;
      case 'EXECUTING':
        if (executionProgress < 100) {
          setExecutionProgress(100);
        } else {
          handleProceedToJury();
        }
        break;
      case 'JURY_COMMITTING':
        handleCommitAllEvaluators();
        break;
      case 'JURY_REVEALING':
        handleRevealAllEvaluators();
        break;
      case 'CONSENSUS':
        handleProceedToSettlement();
        break;
      case 'SETTLEMENT':
        setAutoPlay(false);
        break;
      default:
        break;
    }
  };

  // 1. Funding Handler
  const handleFundWallet = (amount: number) => {
    setAgentA((prev) => ({
      ...prev,
      walletBalance: prev.walletBalance + amount,
    }));
  };

  // 2. Task Creation Handler
  const handleCreateTask = (newTask: Task) => {
    setTask(newTask);
    setCurrentState('DISCOVERY');
  };

  // 3. Discovery -> Competition
  const handleProceedToCompetition = () => {
    const computedBids = calculateBidsForTask(task, candidates);
    setBids(computedBids);
    const topBid = computedBids[0];
    setSelectedBid(topBid);
    const topWorker = candidates.find((c) => c.id === topBid.agentId) || candidates[0];
    setSelectedWorker(topWorker);
    setCurrentState('COMPETITION');
  };

  // 4. Competition -> Financial Layer
  const handleProceedToFinancial = () => {
    if (selectedWorker && selectedBid) {
      const financialEval = performFinancialAssessment(task, selectedWorker, selectedBid);
      setAssessment(financialEval);
      setCurrentState('FINANCIAL_ASSESSMENT');
    }
  };

  // 5. Financial Layer -> Lock Escrow & Collateral
  const handleProceedToLocking = () => {
    if (assessment && selectedWorker) {
      // Deduct escrow from Agent A available balance
      setAgentA((prev) => ({
        ...prev,
        walletBalance: Math.max(0, prev.walletBalance - assessment.escrowAmount),
      }));

      // Deduct collateral from Worker available balance
      setSelectedWorker((prev) => prev ? ({
        ...prev,
        walletBalance: Math.max(0, prev.walletBalance - assessment.requiredCollateral),
      }) : prev);

      setCurrentState('ESCROW_LOCKED');
    }
  };

  // 6. Lock -> Execute Task
  const handleProceedToExecution = () => {
    setCurrentState('EXECUTING');
    setExecutionProgress(0);

    // Simulate progress timer
    let prog = 0;
    const interval = setInterval(async () => {
      prog += 25;
      setExecutionProgress(prog);
      if (prog >= 100) {
        clearInterval(interval);
        const resultText = await generateWorkerSubmission(task.title, task.description, isMalicious);
        setExecutionOutput(resultText);
      }
    }, 400);
  };

  // 7. Execution -> Jury Commit
  const handleProceedToJury = () => {
    const currentEvaluators = isMalicious ? maliciousEvaluators : initialEvaluators;
    setEvaluators(currentEvaluators.map(e => ({ ...e, committed: false, revealed: false })));
    setCurrentState('JURY_COMMITTING');
  };

  // Jury Commit
  const handleCommitAllEvaluators = () => {
    setEvaluators((prev) => prev.map((ev) => ({ ...ev, committed: true })));
    setCurrentState('JURY_REVEALING');
  };

  // Jury Reveal
  const handleRevealAllEvaluators = () => {
    setEvaluators((prev) => prev.map((ev) => ({ ...ev, revealed: true })));
    const avgScore = calculateConsensus(evaluators);
    setConsensusScore(avgScore);
    setCurrentState('CONSENSUS');
  };

  // 8. Consensus -> Settlement
  const handleProceedToSettlement = () => {
    if (selectedBid && assessment && selectedWorker) {
      const avg = calculateConsensus(evaluators);
      const st = calculateSettlement(task, selectedBid, assessment, avg, isMalicious);
      setSettlement(st);

      // Perform state mutations
      if (st.isSuccess) {
        // Worker receives reward + returned collateral
        setSelectedWorker((prev) => prev ? ({
          ...prev,
          walletBalance: prev.walletBalance + st.workerPayment + st.workerCollateralReturned,
        }) : prev);
      } else {
        // Buyer gets full escrow refund
        setAgentA((prev) => ({
          ...prev,
          walletBalance: prev.walletBalance + st.buyerRefund,
        }));
      }

      // Record transaction ledger entry
      const txRecord = createTransactionRecord(task, agentA, selectedWorker, st);
      setLedger((prev) => [txRecord, ...prev]);

      // Update worker reputation
      const { updatedWorker, event } = updateWorkerReputation(selectedWorker, st);
      setSelectedWorker(updatedWorker);
      setReputationLogs((prev) => [event, ...prev]);

      setCurrentState('SETTLEMENT');
    }
  };

  // Toggle Malicious Scenario
  const handleToggleMalicious = () => {
    const nextMalicious = !isMalicious;
    setIsMalicious(nextMalicious);
    if (nextMalicious) {
      setEvaluators(maliciousEvaluators);
    } else {
      setEvaluators(initialEvaluators);
    }
  };

  // Reset Prototype
  const handleReset = () => {
    setCurrentState('FUNDING');
    setAutoPlay(false);
    setIsMalicious(false);
    setAgentA(initialBuyerAgent);
    setTask(initialTask);
    setCandidates(candidateWorkerAgents);
    setBids([]);
    setSelectedBid(undefined);
    setSelectedWorker(undefined);
    setAssessment(undefined);
    setExecutionProgress(0);
    setExecutionOutput('');
    setEvaluators(initialEvaluators);
    setSettlement(undefined);
  };

  return (
    <div className="min-h-screen bg-[#09090c] text-gray-100 flex flex-row font-sans selection:bg-red-500/30 selection:text-red-200">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Header
          agentA={agentA}
          autoPlay={autoPlay}
          onToggleAutoPlay={() => setAutoPlay(!autoPlay)}
          onRunMalicious={handleToggleMalicious}
          onReset={handleReset}
          isMalicious={isMalicious}
        />

        <main className="p-4 md:p-6 max-w-7xl mx-auto w-full space-y-6">
          {/* Top KPI Metrics Overview (Matches photo design) */}
          <DashboardOverview
            agentA={agentA}
            task={task}
            ledger={ledger}
            onOpenTaskModal={() => setCurrentState('TASK_CREATION')}
            onOpenFundModal={() => handleFundWallet(500)}
          />

          {/* Active Pipeline Stepper */}
          <PipelineStepper
            currentState={currentState}
            onSelectState={(st) => setCurrentState(st)}
            isMalicious={isMalicious}
          />

          {/* Main Pipeline Dynamic Views */}
          {activeTab === 'agents' ? (
            <AgentsTab agents={candidates} agentA={agentA} />
          ) : activeTab === 'ledger' ? (
            <TransactionLedgerSection ledger={ledger} />
          ) : (
            <>
              {/* STAGE 0: FUNDING */}
              {currentState === 'FUNDING' && (
                <FundingPanel
                  agentA={agentA}
                  onFundWallet={(amt) => {
                    handleFundWallet(amt);
                    setCurrentState('TASK_CREATION');
                  }}
                />
              )}

              {/* STAGE 1: TASK CREATION */}
              {currentState === 'TASK_CREATION' && (
                <TaskCreationPanel
                  initialTask={task}
                  onCreateTask={handleCreateTask}
                />
              )}

              {/* STAGE 2: DISCOVERY */}
              {currentState === 'DISCOVERY' && (
                <DiscoverySection
                  candidates={candidates}
                  onProceedToCompetition={handleProceedToCompetition}
                />
              )}

              {/* STAGE 3: COMPETITION */}
              {currentState === 'COMPETITION' && (
                <CompetitionSection
                  bids={bids}
                  selectedBid={selectedBid}
                  selectedWorker={selectedWorker}
                  onProceedToFinancial={handleProceedToFinancial}
                />
              )}

              {/* STAGE 4: AUTONOMOUS FINANCIAL LAYER */}
              {currentState === 'FINANCIAL_ASSESSMENT' && assessment && selectedWorker && selectedBid && (
                <FinancialLayerSection
                  assessment={assessment}
                  worker={selectedWorker}
                  bid={selectedBid}
                  onProceedToLocking={handleProceedToLocking}
                />
              )}

              {/* STAGE 5: ESCROW & COLLATERAL */}
              {currentState === 'ESCROW_LOCKED' && assessment && selectedWorker && selectedBid && (
                <EscrowCollateralSection
                  agentA={agentA}
                  worker={selectedWorker}
                  task={task}
                  assessment={assessment}
                  bid={selectedBid}
                  onProceedToExecution={handleProceedToExecution}
                />
              )}

              {/* STAGE 6: EXECUTION */}
              {currentState === 'EXECUTING' && selectedWorker && (
                <ExecutionSection
                  worker={selectedWorker}
                  task={task}
                  progress={executionProgress}
                  output={executionOutput}
                  isMalicious={isMalicious}
                  onProceedToJury={handleProceedToJury}
                />
              )}

              {/* STAGE 7: BLIND JURY */}
              {(currentState === 'JURY_COMMITTING' || currentState === 'JURY_REVEALING') && (
                <BlindJurySection
                  evaluators={evaluators}
                  isCommitting={currentState === 'JURY_COMMITTING'}
                  isRevealing={currentState === 'JURY_REVEALING'}
                  onCommitAll={handleCommitAllEvaluators}
                  onRevealAll={handleRevealAllEvaluators}
                  onProceedToConsensus={() => setCurrentState('CONSENSUS')}
                />
              )}

              {/* STAGE 8: CONSENSUS */}
              {currentState === 'CONSENSUS' && (
                <ConsensusSection
                  task={task}
                  evaluators={evaluators}
                  consensusScore={consensusScore}
                  isMalicious={isMalicious}
                  onProceedToSettlement={handleProceedToSettlement}
                />
              )}

              {/* STAGE 9: SETTLEMENT & REPUTATION */}
              {currentState === 'SETTLEMENT' && settlement && selectedWorker && (
                <div className="space-y-6">
                  <SettlementSection
                    settlement={settlement}
                    agentA={agentA}
                    worker={selectedWorker}
                    task={task}
                    onResetDemo={handleReset}
                  />

                  <ReputationUpdateSection
                    worker={selectedWorker}
                    logs={reputationLogs}
                  />

                  <TransactionLedgerSection ledger={ledger} />
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
