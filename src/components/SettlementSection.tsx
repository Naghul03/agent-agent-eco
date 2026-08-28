import React from 'react';
import { 
  DollarSign, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRightLeft, 
  UserCheck, 
  TrendingUp,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { SettlementBreakdown, Agent, Task } from '../types';

interface SettlementSectionProps {
  settlement: SettlementBreakdown;
  agentA: Agent;
  worker: Agent;
  task: Task;
  onResetDemo: () => void;
}

export const SettlementSection: React.FC<SettlementSectionProps> = ({
  settlement,
  agentA,
  worker,
  task,
  onResetDemo,
}) => {
  return (
    <div className="bg-[#121217] border border-[#23232e] rounded-2xl p-6 shadow-2xl mb-6 relative overflow-hidden">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#20202a] pb-4 mb-6 gap-4">
        <div>
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
            Final Stage — Programmatic Settlement Complete
          </span>
          <h2 className="text-2xl font-black text-white mt-1.5 flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-emerald-400" /> AUTONOMOUS SETTLEMENT COMPLETE
          </h2>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-xl text-xs font-mono font-bold">
          STATUS: SETTLED ✓
        </div>
      </div>

      {/* Settlement Summary Card */}
      <div className="bg-[#0b0b0e] border border-[#20202c] rounded-2xl p-6 mb-6 shadow-inner space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="bg-[#161622] p-3 rounded-xl border border-[#232332]">
            <span className="text-gray-400 block text-[10px]">Task Reference</span>
            <span className="text-white font-bold">{task.title.slice(0, 24)}...</span>
          </div>
          <div className="bg-[#161622] p-3 rounded-xl border border-[#232332]">
            <span className="text-gray-400 block text-[10px]">Verified Consensus</span>
            <span className="text-emerald-400 font-bold">{settlement.consensusScore}%</span>
          </div>
          <div className="bg-[#161622] p-3 rounded-xl border border-[#232332]">
            <span className="text-gray-400 block text-[10px]">Required Threshold</span>
            <span className="text-amber-400 font-bold">{settlement.threshold}%</span>
          </div>
          <div className="bg-[#161622] p-3 rounded-xl border border-[#232332]">
            <span className="text-gray-400 block text-[10px]">Worker Agent</span>
            <span className="text-white font-bold">{worker.name}</span>
          </div>
        </div>

        {/* Financial Flow Breakdown Table / Cards */}
        <div className="border-t border-b border-[#20202c] py-4 space-y-3 font-mono text-xs">
          <h4 className="text-[10px] text-gray-400 uppercase tracking-widest">Financial Distribution Breakdown</h4>

          {settlement.isSuccess ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-[#141c18] border border-emerald-500/30 p-3 rounded-xl">
                <span className="text-gray-400 block text-[10px]">Worker Reward</span>
                <span className="text-xl font-bold text-emerald-400 font-mono-num">+${settlement.workerPayment}</span>
              </div>
              <div className="bg-[#141c18] border border-emerald-500/30 p-3 rounded-xl">
                <span className="text-gray-400 block text-[10px]">Worker Collateral</span>
                <span className="text-xl font-bold text-emerald-400 font-mono-num">+${settlement.workerCollateralReturned} returned</span>
              </div>
              <div className="bg-[#161622] border border-purple-500/30 p-3 rounded-xl">
                <span className="text-gray-400 block text-[10px]">Evaluator Pool</span>
                <span className="text-xl font-bold text-purple-400 font-mono-num">+${settlement.evaluatorPoolReward}</span>
              </div>
              <div className="bg-[#161622] border border-blue-500/30 p-3 rounded-xl">
                <span className="text-gray-400 block text-[10px]">Protocol Fee</span>
                <span className="text-xl font-bold text-blue-400 font-mono-num">+${settlement.protocolFee}</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-[#221414] border border-red-500/30 p-3 rounded-xl">
                <span className="text-gray-400 block text-[10px]">Worker Reward</span>
                <span className="text-xl font-bold text-red-400 font-mono-num">$0 (REJECTED)</span>
              </div>
              <div className="bg-[#141c18] border border-emerald-500/30 p-3 rounded-xl">
                <span className="text-gray-400 block text-[10px]">Buyer Refund</span>
                <span className="text-xl font-bold text-emerald-400 font-mono-num">+${settlement.buyerRefund} REFUNDED</span>
              </div>
              <div className="bg-[#221414] border border-red-500/30 p-3 rounded-xl">
                <span className="text-gray-400 block text-[10px]">Worker Collateral</span>
                <span className="text-xl font-bold text-red-400 font-mono-num">SLASHED (-${settlement.workerCollateralSlashed})</span>
              </div>
            </div>
          )}
        </div>

        {/* Updated Wallet Balances */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#14141c] border border-[#242434] p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={agentA.avatar} alt="Agent A" className="w-9 h-9 rounded-lg object-cover" />
              <div>
                <p className="text-xs font-bold text-white">Agent A (Buyer)</p>
                <p className="text-[10px] text-gray-400">Updated Wallet Balance</p>
              </div>
            </div>
            <span className="text-lg font-black text-white font-mono">${agentA.walletBalance}</span>
          </div>

          <div className="bg-[#14141c] border border-[#242434] p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={worker.avatar} alt={worker.name} className="w-9 h-9 rounded-lg object-cover" />
              <div>
                <p className="text-xs font-bold text-white">{worker.name} (Worker)</p>
                <p className="text-[10px] text-gray-400">Updated Wallet Balance</p>
              </div>
            </div>
            <span className="text-lg font-black text-emerald-400 font-mono">${worker.walletBalance}</span>
          </div>
        </div>
      </div>



      <button
        onClick={onResetDemo}
        className="w-full bg-[#181822] hover:bg-[#20202c] border border-[#2b2b3a] text-gray-200 font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors"
      >
        <RotateCcw className="w-4 h-4 text-gray-400" /> Reset & Run Another Transaction Scenario
      </button>
    </div>
  );
};
