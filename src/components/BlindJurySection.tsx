import React from 'react';
import { Eye, ShieldCheck, Lock, Unlock, CheckCircle2, ArrowRight } from 'lucide-react';
import { JuryEvaluator } from '../types';

interface BlindJurySectionProps {
  evaluators: JuryEvaluator[];
  isCommitting: boolean;
  isRevealing: boolean;
  onCommitAll: () => void;
  onRevealAll: () => void;
  onProceedToConsensus: () => void;
}

export const BlindJurySection: React.FC<BlindJurySectionProps> = ({
  evaluators,
  isCommitting,
  isRevealing,
  onCommitAll,
  onRevealAll,
  onProceedToConsensus,
}) => {
  const allCommitted = evaluators.every((ev) => ev.committed);
  const allRevealed = evaluators.every((ev) => ev.revealed);

  return (
    <div className="bg-[#121217] border border-[#23232e] rounded-2xl p-6 shadow-2xl mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#20202a] pb-4 mb-6 gap-4">
        <div>
          <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest bg-red-500/10 px-2 py-0.5 rounded-full">
            Stage 7 — Independent Jury Verification
          </span>
          <h2 className="text-xl font-bold text-white mt-1.5 flex items-center gap-2">
            <Eye className="w-5 h-5 text-purple-400" /> Blind Jury Verification Protocol
          </h2>
        </div>
        <div className="bg-purple-500/10 border border-purple-500/30 text-purple-400 px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" /> 5 INDEPENDENT EVALUATOR NODES
        </div>
      </div>

      {/* Explanation Banner */}
      <div className="bg-[#0b0b0e] border border-[#20202c] p-4 rounded-xl mb-6 space-y-2 text-xs text-gray-300">
        <p className="font-bold text-white flex items-center gap-2">
          <Lock className="w-4 h-4 text-purple-400" /> Two-Phase Commit-Reveal Architecture
        </p>
        <p className="text-gray-400 leading-relaxed">
          Evaluators independently inspect work, construct cryptographic commitment hashes of their score before viewing peer evaluations, eliminating collusion.
        </p>
      </div>

      {/* Phase Control Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <button
          onClick={onCommitAll}
          disabled={allCommitted}
          className={`py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
            !allCommitted
              ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/30'
              : 'bg-[#181822] text-purple-400 border border-purple-500/40 cursor-default'
          }`}
        >
          <Lock className="w-4 h-4" />
          {allCommitted ? 'PHASE 1 — ALL EVALUATORS COMMITTED ✓' : 'Execute Phase 1: Cryptographic Commit'}
        </button>

        <button
          onClick={onRevealAll}
          disabled={!allCommitted || allRevealed}
          className={`py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
            allCommitted && !allRevealed
              ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/30'
              : allRevealed
              ? 'bg-[#181822] text-indigo-400 border border-indigo-500/40 cursor-default'
              : 'bg-gray-800 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Unlock className="w-4 h-4" />
          {allRevealed ? 'PHASE 2 — ALL EVALUATIONS REVEALED ✓' : 'Execute Phase 2: Sequential Reveal'}
        </button>
      </div>

      {/* 5 Evaluators Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
        {evaluators.map((ev) => (
          <div
            key={ev.id}
            className={`bg-[#161620] border rounded-2xl p-3.5 flex flex-col justify-between transition-all duration-300 ${
              ev.revealed
                ? ev.score >= 80
                  ? 'border-emerald-500/40 bg-emerald-950/10'
                  : 'border-red-500/40 bg-red-950/10'
                : ev.committed
                ? 'border-purple-500/40 bg-purple-950/10'
                : 'border-[#262634]'
            }`}
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <img src={ev.avatar} alt={ev.name} className="w-8 h-8 rounded-lg object-cover" />
                <div>
                  <h4 className="text-xs font-bold text-white leading-tight">{ev.name}</h4>
                  <span className="text-[9px] text-gray-400 font-mono">Rep: {ev.reputation}%</span>
                </div>
              </div>

              {/* Commit Hash Display */}
              <div className="bg-[#0b0b0e] p-2 rounded-lg border border-[#20202c] mb-2 font-mono text-[9px]">
                <span className="text-gray-500 block">Commit Hash:</span>
                <span className="text-purple-300 font-bold block truncate">{ev.commitHash}</span>
              </div>
            </div>

            {/* Status / Score Reveal */}
            <div className="mt-2 pt-2 border-t border-[#222230] text-center">
              {!ev.committed ? (
                <span className="text-[10px] font-mono text-gray-500">Awaiting Commit...</span>
              ) : !ev.revealed ? (
                <span className="text-[10px] font-mono font-bold text-purple-400 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-purple-400" /> COMMITTED ✓
                </span>
              ) : (
                <div className="space-y-1">
                  <span className={`text-lg font-black font-mono-num ${
                    ev.score >= 80 ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {ev.score}%
                  </span>
                  <p className="text-[9px] text-gray-400 line-clamp-2 italic">{ev.reasoning}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onProceedToConsensus}
        disabled={!allRevealed}
        className={`w-full font-bold py-3.5 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all ${
          allRevealed
            ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-red-900/30 active:scale-[0.98]'
            : 'bg-gray-800 text-gray-500 cursor-not-allowed'
        }`}
      >
        <span>Calculate Consensus & Perform Settlement Check</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
