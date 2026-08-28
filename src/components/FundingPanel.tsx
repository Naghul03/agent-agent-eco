import React from 'react';
import { Wallet, ArrowDown, CheckCircle2, ShieldCheck, DollarSign } from 'lucide-react';
import { Agent } from '../types';

interface FundingPanelProps {
  agentA: Agent;
  onFundWallet: (amount: number) => void;
}

export const FundingPanel: React.FC<FundingPanelProps> = ({ agentA, onFundWallet }) => {
  return (
    <div className="bg-[#121217] border border-[#23232e] rounded-2xl p-6 shadow-2xl relative overflow-hidden mb-6">
      <div className="flex items-center justify-between border-b border-[#20202a] pb-4 mb-6">
        <div>
          <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest bg-red-500/10 px-2 py-0.5 rounded-full">
            Stage 0 — Initial Wallet Funding
          </span>
          <h2 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-emerald-400" /> Fund Agent A Wallet
          </h2>
        </div>
        <div className="text-right">
          <span className="text-xs text-gray-400 block">Agent A Current Balance</span>
          <span className="text-2xl font-black text-emerald-400 font-mono-num">${agentA.walletBalance}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Animated Visual Flow */}
        <div className="bg-[#0b0b0e] border border-[#22222d] rounded-2xl p-5 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#16161f] border border-[#2c2c3a] text-xs font-semibold text-gray-300">
            <ShieldCheck className="w-4 h-4 text-blue-400" /> Treasury / External Capital Provider
          </div>

          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center animate-bounce">
              <ArrowDown className="w-4 h-4" />
            </div>
          </div>

          <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-sm">
            <DollarSign className="w-4 h-4" /> +$500 Autonomous Liquidity Injection
          </div>

          <div className="flex justify-center">
            <ArrowDown className="w-4 h-4 text-gray-600" />
          </div>

          <div className="bg-[#161620] border border-[#2a2a38] p-3 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={agentA.avatar} alt="Agent A" className="w-8 h-8 rounded-lg object-cover" />
              <div className="text-left">
                <p className="text-xs font-bold text-white">Agent A Wallet</p>
                <p className="text-[10px] text-gray-400">Market Research Buyer</p>
              </div>
            </div>
            <span className="text-sm font-mono font-bold text-emerald-400">${agentA.walletBalance}</span>
          </div>
        </div>

        {/* Action Form */}
        <div className="space-y-6">
          <div className="bg-[#161620] border border-[#282836] p-4 rounded-2xl space-y-3">
            <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Simulated Testnet Funding</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Before Agent A can broadcast tasks into the autonomous agent network, its smart wallet must be funded with capital.
            </p>
            <div className="flex items-center justify-between bg-[#0e0e14] p-3 rounded-xl border border-[#22222e]">
              <span className="text-xs text-gray-400">Capital Injection Amount</span>
              <span className="text-lg font-bold text-white font-mono">$500 USD</span>
            </div>
          </div>

          <button
            onClick={() => onFundWallet(500)}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <CheckCircle2 className="w-5 h-5" /> Fund Wallet ($500) & Proceed to Task Creation
          </button>
        </div>
      </div>
    </div>
  );
};
