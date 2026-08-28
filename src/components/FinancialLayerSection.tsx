import React from 'react';
import { 
  ShieldCheck, 
  Wallet, 
  Lock, 
  Scale, 
  FileCheck2, 
  History, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  Activity
} from 'lucide-react';
import { FinancialAssessment, Agent, Bid } from '../types';

interface FinancialLayerSectionProps {
  assessment: FinancialAssessment;
  worker: Agent;
  bid: Bid;
  onProceedToLocking: () => void;
}

export const FinancialLayerSection: React.FC<FinancialLayerSectionProps> = ({
  assessment,
  worker,
  bid,
  onProceedToLocking,
}) => {
  return (
    <div className="bg-[#121217] border border-[#23232e] rounded-2xl p-6 shadow-2xl mb-6 relative overflow-hidden">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#20202a] pb-4 mb-6 gap-4">
        <div>
          <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest bg-red-500/10 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 w-fit">
            <Zap className="w-3 h-3 text-red-500 animate-pulse" />
            Stage 4 — Core Differentiator
          </span>
          <h2 className="text-2xl font-black text-white mt-1.5 flex items-center gap-2 tracking-tight">
            <ShieldCheck className="w-6 h-6 text-red-500" /> AUTONOMOUS FINANCIAL LAYER
          </h2>
        </div>
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2">
          <Activity className="w-4 h-4 animate-spin" /> RISK & TERMSEVALUATED AUTOMATICALLY
        </div>
      </div>

      {/* Central Architecture Hub Diagram */}
      <div className="bg-[#0b0b0e] border border-[#20202c] rounded-2xl p-6 mb-6">
        <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest text-center mb-6">
          — CENTRAL FINANCIAL CONTROLLER ARCHITECTURE —
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Node 1: Wallet & Balance */}
          <div className="bg-[#15151e] border border-[#262636] p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-emerald-400">
              <Wallet className="w-4 h-4" />
              <h4 className="text-xs font-bold text-white">1. Wallet & Balance</h4>
            </div>
            <p className="text-[11px] text-gray-400">
              Verifies buyer liquidity (${bid.price}) and worker collateral capacity (${worker.walletBalance}).
            </p>
          </div>

          {/* Node 2: Escrow & Collateral Bonding */}
          <div className="bg-[#15151e] border border-[#262636] p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-amber-400">
              <Lock className="w-4 h-4" />
              <h4 className="text-xs font-bold text-white">2. Escrow & Collateral</h4>
            </div>
            <p className="text-[11px] text-gray-400">
              Locks Buyer Escrow (${assessment.escrowAmount}) + Worker Skin-In-The-Game Collateral (${assessment.requiredCollateral}).
            </p>
          </div>

          {/* Node 3: Risk Assessment */}
          <div className="bg-[#15151e] border border-[#262636] p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-red-400">
              <Scale className="w-4 h-4" />
              <h4 className="text-xs font-bold text-white">3. Dynamic Risk Engine</h4>
            </div>
            <p className="text-[11px] text-gray-400">
              Worker Reputation: {assessment.workerReputation}% → Risk Profile: <strong className="text-emerald-400">{assessment.risk}</strong>.
            </p>
          </div>

          {/* Node 4: Transaction Terms */}
          <div className="bg-[#15151e] border border-[#262636] p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-blue-400">
              <FileCheck2 className="w-4 h-4" />
              <h4 className="text-xs font-bold text-white">4. Transaction Terms</h4>
            </div>
            <p className="text-[11px] text-gray-400">
              Condition: {assessment.settlementCondition} via Blind Jury.
            </p>
          </div>

          {/* Node 5: Autonomous Settlement */}
          <div className="bg-[#15151e] border border-[#262636] p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-purple-400">
              <Zap className="w-4 h-4" />
              <h4 className="text-xs font-bold text-white">5. Auto Settlement</h4>
            </div>
            <p className="text-[11px] text-gray-400">
              Programmatic payout distribution upon evaluator consensus.
            </p>
          </div>

          {/* Node 6: Ledger & Reputation */}
          <div className="bg-[#15151e] border border-[#262636] p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
              <h4 className="text-xs font-bold text-white">6. Ledger & Reputation</h4>
            </div>
            <p className="text-[11px] text-gray-400">
              Immutable receipt logging and post-settlement credit scoring.
            </p>
          </div>
        </div>

        {/* Central Assessment Decision Box */}
        <div className="bg-[#171722] border border-red-500/30 p-5 rounded-2xl glow-red">
          <h4 className="text-xs font-mono text-red-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> FINANCIAL ASSESSMENT DECISION MATRIX
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono mb-4">
            <div className="bg-[#0e0e14] p-3 rounded-xl border border-[#222230]">
              <span className="text-gray-400 block text-[10px]">Task Value</span>
              <span className="text-white font-bold text-sm">${assessment.taskValue}</span>
            </div>
            <div className="bg-[#0e0e14] p-3 rounded-xl border border-[#222230]">
              <span className="text-gray-400 block text-[10px]">Required Escrow</span>
              <span className="text-emerald-400 font-bold text-sm">${assessment.escrowAmount}</span>
            </div>
            <div className="bg-[#0e0e14] p-3 rounded-xl border border-[#222230]">
              <span className="text-gray-400 block text-[10px]">Worker Collateral</span>
              <span className="text-amber-400 font-bold text-sm">${assessment.requiredCollateral}</span>
            </div>
            <div className="bg-[#0e0e14] p-3 rounded-xl border border-[#222230]">
              <span className="text-gray-400 block text-[10px]">Jury Quorum</span>
              <span className="text-blue-400 font-bold text-sm">5 Evaluators</span>
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-emerald-400 font-mono">
            <p className="flex items-center gap-2">✓ Transaction risk pre-approved by Financial Controller</p>
            <p className="flex items-center gap-2">✓ Buyer funds lock requirement validated ($90)</p>
            <p className="flex items-center gap-2">✓ Worker skin-in-the-game collateral requirement locked ($10)</p>
            <p className="flex items-center gap-2">✓ Automatic cryptographic settlement protocol enabled</p>
          </div>
        </div>
      </div>

      <button
        onClick={onProceedToLocking}
        className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-red-900/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
      >
        <span>Lock Buyer Escrow & Worker Collateral</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
