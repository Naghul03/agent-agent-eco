import React from 'react';
import { Award, CheckCircle2, AlertTriangle, ArrowRight, Scale, XCircle } from 'lucide-react';
import { Task, JuryEvaluator } from '../types';

interface ConsensusSectionProps {
  task: Task;
  evaluators: JuryEvaluator[];
  consensusScore: number;
  isMalicious: boolean;
  onProceedToSettlement: () => void;
}

export const ConsensusSection: React.FC<ConsensusSectionProps> = ({
  task,
  evaluators,
  consensusScore,
  isMalicious,
  onProceedToSettlement,
}) => {
  const isPassed = consensusScore >= task.qualityThreshold && !isMalicious;

  return (
    <div className="bg-[#121217] border border-[#23232e] rounded-2xl p-6 shadow-2xl mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#20202a] pb-4 mb-6 gap-4">
        <div>
          <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest bg-red-500/10 px-2 py-0.5 rounded-full">
            Stage 8 — Consensus Score Calculation
          </span>
          <h2 className="text-xl font-bold text-white mt-1.5 flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-400" /> Consensus Engine
          </h2>
        </div>
        <div className={`px-4 py-2 rounded-xl text-xs font-mono font-bold border flex items-center gap-2 ${
          isPassed 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
            : 'bg-red-500/10 border-red-500/30 text-red-400'
        }`}>
          {isPassed ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
          {isPassed ? '✓ PASSED QUALITY THRESHOLD' : '✕ VERIFICATION FAILED'}
        </div>
      </div>

      {/* Main Consensus vs Threshold Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Left: Score Breakdown */}
        <div className="bg-[#0b0b0e] border border-[#20202c] p-5 rounded-2xl space-y-4">
          <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider">
            Evaluator Scores Mean Aggregation
          </h3>

          <div className="flex items-baseline justify-between bg-[#151520] p-4 rounded-xl border border-[#242436]">
            <div>
              <span className="text-xs text-gray-400 block font-mono">Consensus Score</span>
              <span className="text-[10px] text-gray-500 font-mono">5 Independent Scores Sum ÷ 5</span>
            </div>
            <span className={`text-3xl font-black font-mono-num ${isPassed ? 'text-emerald-400' : 'text-red-400'}`}>
              {consensusScore}%
            </span>
          </div>

          <div className="flex items-baseline justify-between bg-[#151520] p-4 rounded-xl border border-[#242436]">
            <div>
              <span className="text-xs text-gray-400 block font-mono">Required Threshold</span>
              <span className="text-[10px] text-gray-500 font-mono">Specified in Task Spec</span>
            </div>
            <span className="text-3xl font-black text-amber-400 font-mono-num">{task.qualityThreshold}%</span>
          </div>
        </div>

        {/* Right: Decision Result Box */}
        <div className={`p-6 rounded-2xl border flex flex-col justify-between ${
          isPassed 
            ? 'bg-emerald-950/20 border-emerald-500/40 glow-emerald' 
            : 'bg-red-950/20 border-red-500/40 glow-red'
        }`}>
          <div>
            <div className="flex items-center gap-2 mb-2">
              {isPassed ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-red-400" />
              )}
              <h3 className={`text-lg font-bold ${isPassed ? 'text-emerald-400' : 'text-red-400'}`}>
                {isPassed ? 'WORK VERIFIED SUCCEEDED' : 'WORK VERIFICATION REJECTED'}
              </h3>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed mb-4">
              {isPassed
                ? `Consensus score of ${consensusScore}% strictly exceeds target threshold of ${task.qualityThreshold}%. Settlement engine is authorized to release escrow payout.`
                : `Consensus score of ${consensusScore}% is BELOW required threshold of ${task.qualityThreshold}%. Settlement engine will REFUND buyer and SLASH worker collateral.`}
            </p>
          </div>

          <div className="bg-[#0c0c12] border border-[#222230] p-3 rounded-xl font-mono text-xs text-gray-300">
            <div className="flex justify-between">
              <span>Condition Check:</span>
              <span className="font-bold text-white font-mono">{consensusScore}% {isPassed ? '>' : '<'} {task.qualityThreshold}%</span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onProceedToSettlement}
        className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-red-900/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
      >
        <span>Execute Autonomous Payment Settlement</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
