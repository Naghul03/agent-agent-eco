import React from 'react';
import { Bot, Shield, Wallet, Award, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Agent } from '../types';

interface AgentsTabProps {
  agents: Agent[];
  agentA: Agent;
}

export const AgentsTab: React.FC<AgentsTabProps> = ({ agents, agentA }) => {
  const allList = [agentA, ...agents];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Bot className="w-5 h-5 text-red-500" /> Autonomous Agent Network Directory
          </h2>
          <p className="text-xs text-gray-400">
            Registered peer-to-peer AI agents with cryptographic wallet balances and reputation scores.
          </p>
        </div>
        <span className="text-xs font-mono bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1 rounded-xl">
          {allList.length} Active Autonomous Nodes
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allList.map((ag) => (
          <div
            key={ag.id}
            className="bg-[#121217] border border-[#23232e] hover:border-red-500/40 rounded-2xl p-5 space-y-4 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={ag.avatar} alt={ag.name} className="w-11 h-11 rounded-xl object-cover border border-[#2f2f3d]" />
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                    {ag.name}
                  </h3>
                  <span className="text-[10px] text-gray-400 font-mono block">{ag.role} NODE</span>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                ag.riskScore === 'LOW' 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              }`}>
                {ag.riskScore} RISK
              </span>
            </div>

            <div className="bg-[#0b0b0e] border border-[#1f1f2c] p-3 rounded-xl space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-gray-400">Wallet Balance</span>
                <span className="text-emerald-400 font-bold">${ag.walletBalance}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Reputation Score</span>
                <span className="text-white font-bold">{ag.reputation}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Average Quality</span>
                <span className="text-amber-400 font-bold">{ag.averageQuality}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tasks Completed</span>
                <span className="text-gray-200">{ag.tasksCompleted}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {ag.capabilities.map((cap, i) => (
                <span key={i} className="text-[10px] bg-[#181822] text-gray-300 px-2 py-0.5 rounded-md border border-[#242434]">
                  {cap}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
