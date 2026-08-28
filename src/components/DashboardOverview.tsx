import React from 'react';
import { DollarSign, ShieldAlert, CheckCircle2, Bot, Plus, TrendingUp, Cpu } from 'lucide-react';
import { Agent, Task, TransactionRecord } from '../types';

interface DashboardOverviewProps {
  agentA: Agent;
  task: Task;
  ledger: TransactionRecord[];
  onOpenTaskModal: () => void;
  onOpenFundModal: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  agentA,
  task,
  ledger,
  onOpenTaskModal,
  onOpenFundModal,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Metric Card 1: Total Capital Flow */}
      <div className="bg-[#121217] border border-[#23232e] rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden group hover:border-red-500/40 transition-all duration-300">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-xs text-gray-400 font-medium">Total Capital Flow</span>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-black text-white font-mono-num">$12,840</h3>
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +8%
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>
        <p className="text-[11px] text-gray-500 mt-3 font-mono">Autonomous Liquidity Pool</p>
      </div>

      {/* Metric Card 2: Production Efficiency / Consensus Quality */}
      <div className="bg-[#121217] border border-[#23232e] rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden group hover:border-amber-500/40 transition-all duration-300">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-xs text-gray-400 font-medium">Jury Consensus Efficiency</span>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-black text-white font-mono-num">96.4%</h3>
              <span className="text-[11px] text-gray-400 font-normal">avg quality</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
            <Cpu className="w-5 h-5" />
          </div>
        </div>
        <div className="w-full bg-[#1c1c26] rounded-full h-1.5 mt-3 overflow-hidden">
          <div className="bg-amber-500 h-full w-[96.4%]" />
        </div>
      </div>

      {/* Metric Card 3: Tasks Fulfilled */}
      <div className="bg-[#121217] border border-[#23232e] rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-300">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-xs text-gray-400 font-medium">Verified Orders Fulfilled</span>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-black text-white font-mono-num">128</h3>
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                +5%
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
        <p className="text-[11px] text-gray-500 mt-3 font-mono">100% Zero-Human Touch</p>
      </div>

      {/* Metric Card 4: Quick Action Panel (Matches "+" pill button in photo) */}
      <div className="bg-[#121217] border border-[#23232e] rounded-2xl p-4 flex items-center justify-between gap-3">
        <div className="space-y-1">
          <span className="text-xs text-gray-400 font-medium">Quick Actions</span>
          <p className="text-xs font-semibold text-gray-200">Fund Wallet or Create Task</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenFundModal}
            className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/40 hover:bg-emerald-600 text-emerald-300 flex items-center justify-center font-bold text-xs transition-colors"
            title="Fund Agent A Wallet ($500)"
          >
            +$
          </button>
          <button
            onClick={onOpenTaskModal}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white flex items-center justify-center shadow-lg shadow-red-600/30 transition-transform active:scale-95"
            title="Create New Autonomous Task"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
