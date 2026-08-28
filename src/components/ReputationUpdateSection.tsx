import React from 'react';
import { TrendingUp, Award, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { Agent, ReputationEvent } from '../types';

interface ReputationUpdateSectionProps {
  worker: Agent;
  logs: ReputationEvent[];
}

export const ReputationUpdateSection: React.FC<ReputationUpdateSectionProps> = ({ worker, logs }) => {
  const latestEvent = logs[0];

  return (
    <div className="bg-[#121217] border border-[#23232e] rounded-2xl p-6 shadow-2xl mb-6">
      <div className="flex items-center justify-between border-b border-[#20202a] pb-4 mb-6">
        <div>
          <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest bg-red-500/10 px-2 py-0.5 rounded-full">
            Post-Settlement Credit Scoring
          </span>
          <h2 className="text-xl font-bold text-white mt-1.5 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" /> Agent Performance & Reputation Engine
          </h2>
        </div>
        <span className="text-xs text-gray-400 font-mono">AUTOMATIC PROFILE UPDATE</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Worker Current Standing Card */}
        <div className="bg-[#161620] border border-emerald-500/30 rounded-2xl p-5 space-y-4 glow-emerald">
          <div className="flex items-center gap-3">
            <img src={worker.avatar} alt={worker.name} className="w-12 h-12 rounded-xl object-cover border border-emerald-500/40" />
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                {worker.name} <Award className="w-4 h-4 text-amber-400" />
              </h3>
              <span className="text-xs text-emerald-400 font-mono font-bold">
                RISK CATEGORY: LOW (Collateral Ratio: {worker.requiredCollateralRatio}%)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="bg-[#0b0b0e] p-3 rounded-xl border border-[#222230]">
              <span className="text-gray-400 block text-[10px]">Reputation Score</span>
              <span className="text-xl font-black text-emerald-400 font-mono-num">{worker.reputation}%</span>
            </div>
            <div className="bg-[#0b0b0e] p-3 rounded-xl border border-[#222230]">
              <span className="text-gray-400 block text-[10px]">Tasks Completed</span>
              <span className="text-xl font-black text-white font-mono-num">{worker.tasksCompleted}</span>
            </div>
            <div className="bg-[#0b0b0e] p-3 rounded-xl border border-[#222230]">
              <span className="text-gray-400 block text-[10px]">Successful Tasks</span>
              <span className="text-xl font-black text-emerald-400 font-mono-num">{worker.successfulTasks}</span>
            </div>
            <div className="bg-[#0b0b0e] p-3 rounded-xl border border-[#222230]">
              <span className="text-gray-400 block text-[10px]">Average Quality</span>
              <span className="text-xl font-black text-amber-400 font-mono-num">{worker.averageQuality}%</span>
            </div>
          </div>
        </div>

        {/* Latest Reputation Log Event */}
        <div className="bg-[#0b0b0e] border border-[#20202c] p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-3">
              Latest Reputation Event Log
            </h4>
            {latestEvent ? (
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between items-center bg-[#151520] p-3 rounded-xl border border-[#242436]">
                  <span className="text-gray-400">Score Delta:</span>
                  <span className={`font-bold ${latestEvent.newScore >= latestEvent.oldScore ? 'text-emerald-400' : 'text-red-400'}`}>
                    {latestEvent.oldScore}% ➔ {latestEvent.newScore}%
                  </span>
                </div>
                <div className="bg-[#151520] p-3 rounded-xl border border-[#242436]">
                  <span className="text-gray-400 block text-[10px]">Reason:</span>
                  <span className="text-gray-200">{latestEvent.reason}</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-500 font-mono">No reputation events recorded yet.</p>
            )}
          </div>

          <p className="text-[11px] text-gray-400 mt-4 leading-relaxed font-mono">
            💡 Successful verified work improves the agent's economic standing, lowering future collateral requirements.
          </p>
        </div>
      </div>
    </div>
  );
};
