import React from 'react';
import { Search, Bot, Shield, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Agent } from '../types';

interface DiscoverySectionProps {
  candidates: Agent[];
  onProceedToCompetition: () => void;
}

export const DiscoverySection: React.FC<DiscoverySectionProps> = ({
  candidates,
  onProceedToCompetition,
}) => {
  return (
    <div className="bg-[#121217] border border-[#23232e] rounded-2xl p-6 shadow-2xl mb-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#20202a] pb-4 mb-6 gap-4">
        <div>
          <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest bg-red-500/10 px-2 py-0.5 rounded-full flex items-center gap-1.5 w-fit">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            Stage 2 — Network Discovery Active
          </span>
          <h2 className="text-xl font-bold text-white mt-1.5 flex items-center gap-2">
            <Search className="w-5 h-5 text-red-500" /> Discovery Engine
          </h2>
        </div>
        <div className="bg-[#181822] border border-[#272738] px-4 py-2 rounded-xl text-right">
          <span className="text-xs text-gray-400 block font-mono">DISCOVERY STATUS</span>
          <span className="text-sm font-bold text-emerald-400 font-mono flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> {candidates.length} CANDIDATE AGENTS FOUND
          </span>
        </div>
      </div>

      {/* Discovery Animated Status Messages */}
      <div className="bg-[#0b0b0e] border border-[#20202c] p-4 rounded-xl mb-6 space-y-2 font-mono text-xs">
        <div className="flex items-center gap-2 text-emerald-400">
          <span className="text-emerald-500">✓</span> Searching peer-to-peer agent network nodes...
        </div>
        <div className="flex items-center gap-2 text-emerald-400">
          <span className="text-emerald-500">✓</span> Matching capability profiles for "Market Analysis & NLP Synthesis"...
        </div>
        <div className="flex items-center gap-2 text-emerald-400">
          <span className="text-emerald-500">✓</span> Checking historical jury quality scores and reputation metrics...
        </div>
        <div className="flex items-center gap-2 text-amber-400 animate-pulse">
          <span>➔</span> Discovery active: 4 top candidate agents ready for economic competition.
        </div>
      </div>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {candidates.slice(0, 4).map((agent) => (
          <div
            key={agent.id}
            className="bg-[#161620] border border-[#262634] hover:border-red-500/40 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <img src={agent.avatar} alt={agent.name} className="w-10 h-10 rounded-xl object-cover border border-[#333344]" />
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">{agent.name}</h4>
                    <span className="text-[10px] text-gray-400 block font-mono">{agent.capabilities[0]}</span>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  agent.riskScore === 'LOW' 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                }`}>
                  {agent.riskScore} RISK
                </span>
              </div>

              <div className="space-y-2 border-t border-b border-[#222230] py-3 my-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Reputation</span>
                  <span className="font-bold text-white font-mono">{agent.reputation}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg Quality</span>
                  <span className="font-bold text-emerald-400 font-mono">{agent.averageQuality}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Est. Execution</span>
                  <span className="font-bold text-gray-300 font-mono">
                    {agent.name === 'InsightAI' ? '60 sec' : agent.name === 'ResearchPro' ? '45 sec' : agent.name === 'DataMind' ? '30 sec' : '20 sec'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Proposed Price</span>
                  <span className="font-extrabold text-white font-mono">
                    ${agent.name === 'InsightAI' ? 90 : agent.name === 'ResearchPro' ? 82 : agent.name === 'DataMind' ? 72 : 60}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono pt-1">
              <span>Tasks: {agent.tasksCompleted}</span>
              <span className="text-emerald-400 font-bold">Verified</span>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onProceedToCompetition}
        className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-red-900/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
      >
        <span>Proceed to Agent Bidding & Competition Engine</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
