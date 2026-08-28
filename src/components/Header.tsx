import React from 'react';
import { Search, Bell, Shield, Play, RotateCcw, AlertTriangle, Wallet } from 'lucide-react';
import { Agent } from '../types';

interface HeaderProps {
  agentA: Agent;
  autoPlay: boolean;
  onToggleAutoPlay: () => void;
  onRunMalicious: () => void;
  onReset: () => void;
  isMalicious: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  agentA,
  autoPlay,
  onToggleAutoPlay,
  onRunMalicious,
  onReset,
  isMalicious,
}) => {
  return (
    <header className="bg-[#0e0e12] border-b border-[#20202a] px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-30">
      {/* Welcome & Search Bar (Matches photo style) */}
      <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-start">
        <div>
          <h2 className="text-xs text-gray-400 font-medium">Welcome!</h2>
          <h1 className="text-lg font-bold text-white tracking-tight">John Hardward <span className="text-xs font-normal text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full ml-1">Buyer Agent A</span></h1>
        </div>

        <div className="relative hidden sm:block w-72 lg:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks, ledger TX, agent capabilities..."
            className="w-full bg-[#181820] border border-[#272734] rounded-2xl pl-10 pr-4 py-2 text-xs text-gray-200 focus:outline-none focus:border-red-500 transition-colors"
          />
        </div>
      </div>

      {/* Control Actions & User Pill */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-end flex-wrap">
        {/* Full Autonomous Flow Button */}
        <button
          onClick={onToggleAutoPlay}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-xs transition-all shadow-md ${
            autoPlay
              ? 'bg-amber-500 hover:bg-amber-600 text-black shadow-amber-500/20 animate-pulse'
              : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-red-600/30'
          }`}
        >
          <Play className={`w-3.5 h-3.5 ${autoPlay ? 'animate-spin' : ''}`} />
          {autoPlay ? 'Pause Auto Demo' : '▶ Run Full Autonomous Flow'}
        </button>

        {/* Malicious Worker Scenario Button */}
        <button
          onClick={onRunMalicious}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-medium text-xs border transition-all ${
            isMalicious
              ? 'bg-red-500/20 border-red-500 text-red-400 font-bold'
              : 'bg-[#181820] border-[#2c2c3a] text-gray-300 hover:bg-red-900/20 hover:text-red-300 hover:border-red-500/50'
          }`}
          title="Simulate low quality worker failing jury threshold & slashing collateral"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          <span>{isMalicious ? 'Malicious Mode Active' : 'Run Malicious Scenario'}</span>
        </button>

        {/* Reset Button */}
        <button
          onClick={onReset}
          className="p-2 bg-[#181820] border border-[#272734] rounded-xl text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
          title="Reset Prototype State"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Wallet Quick Pill */}
        <div className="flex items-center gap-2 bg-[#14141c] border border-[#272734] px-3 py-1.5 rounded-xl font-mono text-xs">
          <Wallet className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-gray-400">Agent A:</span>
          <span className="text-emerald-400 font-bold">${agentA.walletBalance}</span>
        </div>

        {/* Profile Avatar Pill */}
        <div className="flex items-center gap-2 bg-[#181820] border border-[#272734] p-1.5 rounded-xl">
          <img
            src={agentA.avatar}
            alt="Profile"
            className="w-7 h-7 rounded-lg object-cover border border-red-500/30"
          />
          <div className="hidden lg:block text-left pr-1">
            <p className="text-[11px] font-bold text-gray-200 leading-tight">Agent A</p>
            <p className="text-[9px] text-gray-400 font-mono">Rep: {agentA.reputation}%</p>
          </div>
        </div>
      </div>
    </header>
  );
};
