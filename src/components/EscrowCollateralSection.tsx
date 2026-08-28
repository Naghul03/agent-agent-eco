import React from 'react';
import { Lock, ArrowDownRight, ShieldCheck, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Agent, Task, FinancialAssessment, Bid } from '../types';

interface EscrowCollateralSectionProps {
  agentA: Agent;
  worker: Agent;
  task: Task;
  assessment: FinancialAssessment;
  bid: Bid;
  onProceedToExecution: () => void;
}

export const EscrowCollateralSection: React.FC<EscrowCollateralSectionProps> = ({
  agentA,
  worker,
  task,
  assessment,
  bid,
  onProceedToExecution,
}) => {
  return (
    <div className="bg-[#121217] border border-[#23232e] rounded-2xl p-6 shadow-2xl mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#20202a] pb-4 mb-6 gap-4">
        <div>
          <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest bg-red-500/10 px-2 py-0.5 rounded-full">
            Stage 5 — Autonomous Bonding & Contract Activation
          </span>
          <h2 className="text-xl font-bold text-white mt-1.5 flex items-center gap-2">
            <Lock className="w-5 h-5 text-amber-500" /> Escrow & Collateral Locking
          </h2>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4" /> CONTRACT ACTIVE & BONDED
        </div>
      </div>

      {/* Dual Wallet Bonding Visualizer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Buyer Escrow Box */}
        <div className="bg-[#161620] border border-amber-500/30 rounded-2xl p-5 relative space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={agentA.avatar} alt="Agent A" className="w-9 h-9 rounded-lg object-cover" />
              <div>
                <h4 className="text-sm font-bold text-white">Agent A (Buyer)</h4>
                <p className="text-[10px] text-gray-400 font-mono">Market Research Buyer</p>
              </div>
            </div>
            <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-1 rounded-lg font-mono">
              ESCROW LOCKED
            </span>
          </div>

          <div className="bg-[#0b0b0e] border border-[#222230] p-3 rounded-xl space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-gray-400">Total Funds</span>
              <span className="text-white font-bold">${agentA.walletBalance + assessment.escrowAmount}</span>
            </div>
            <div className="flex justify-between text-amber-400 font-bold">
              <span>Locked into Escrow</span>
              <span>-${assessment.escrowAmount}</span>
            </div>
            <div className="flex justify-between border-t border-[#1f1f2c] pt-2 text-emerald-400 font-extrabold">
              <span>Available Balance</span>
              <span>${agentA.walletBalance}</span>
            </div>
          </div>

          <p className="text-[11px] text-gray-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Funds will only be released after 5-evaluator blind jury verification.
          </p>
        </div>

        {/* Worker Collateral Box */}
        <div className="bg-[#161620] border border-red-500/30 rounded-2xl p-5 relative space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={worker.avatar} alt={worker.name} className="w-9 h-9 rounded-lg object-cover" />
              <div>
                <h4 className="text-sm font-bold text-white">{worker.name} (Worker)</h4>
                <p className="text-[10px] text-gray-400 font-mono">Execution Agent</p>
              </div>
            </div>
            <span className="text-xs bg-red-500/10 text-red-400 border border-red-500/30 px-2 py-1 rounded-lg font-mono">
              COLLATERAL BONDED
            </span>
          </div>

          <div className="bg-[#0b0b0e] border border-[#222230] p-3 rounded-xl space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-gray-400">Total Wallet</span>
              <span className="text-white font-bold">${worker.walletBalance + assessment.requiredCollateral}</span>
            </div>
            <div className="flex justify-between text-red-400 font-bold">
              <span>Skin-in-the-game Collateral</span>
              <span>-${assessment.requiredCollateral}</span>
            </div>
            <div className="flex justify-between border-t border-[#1f1f2c] pt-2 text-emerald-400 font-extrabold">
              <span>Available Unlocked</span>
              <span>${worker.walletBalance}</span>
            </div>
          </div>

          <p className="text-[11px] text-gray-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            Worker has economic skin in the game. Collateral slashed if work fails.
          </p>
        </div>
      </div>

      {/* Task Contract Card #TX-1028 */}
      <div className="bg-[#181822] border border-[#272738] rounded-2xl p-5 mb-6">
        <div className="flex items-center justify-between border-b border-[#232332] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-red-500" />
            <h3 className="text-sm font-bold text-white font-mono">TASK CONTRACT #{task.id}</h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2.5 py-0.5 rounded-full font-bold">
            CONTRACT ACTIVE
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <span className="text-gray-400 block text-[10px]">Buyer Agent</span>
            <span className="text-white font-bold">{agentA.name}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px]">Worker Agent</span>
            <span className="text-white font-bold">{worker.name}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px]">Contract Value</span>
            <span className="text-emerald-400 font-bold">${bid.price}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px]">Worker Collateral</span>
            <span className="text-red-400 font-bold">${assessment.requiredCollateral}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px]">Quality Threshold</span>
            <span className="text-amber-400 font-bold">{task.qualityThreshold}%</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px]">Verification Mechanism</span>
            <span className="text-blue-400 font-bold">Blind Jury (5 Agents)</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px]">Settlement Mode</span>
            <span className="text-purple-400 font-bold">Programmatic Auto</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px]">Human Approval Needed</span>
            <span className="text-emerald-400 font-extrabold">NONE (0%)</span>
          </div>
        </div>
      </div>

      <button
        onClick={onProceedToExecution}
        className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-red-900/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
      >
        <span>Execute Task & Submit Result</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
