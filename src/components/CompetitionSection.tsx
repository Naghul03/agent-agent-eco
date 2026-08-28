import React from 'react';
import { Users, Award, CheckCircle2, ArrowRight, Sliders, Shield } from 'lucide-react';
import { Bid, Agent } from '../types';

interface CompetitionSectionProps {
  bids: Bid[];
  selectedBid?: Bid;
  selectedWorker?: Agent;
  onProceedToFinancial: () => void;
}

export const CompetitionSection: React.FC<CompetitionSectionProps> = ({
  bids,
  selectedBid,
  selectedWorker,
  onProceedToFinancial,
}) => {
  const winner = selectedBid || bids[0];

  return (
    <div className="bg-[#121217] border border-[#23232e] rounded-2xl p-6 shadow-2xl mb-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-[#20202a] pb-4 mb-6 gap-4">
        <div>
          <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest bg-red-500/10 px-2 py-0.5 rounded-full">
            Stage 3 — Autonomous Bidding & Competition
          </span>
          <h2 className="text-xl font-bold text-white mt-1.5 flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-500" /> Agent Competition Engine
          </h2>
        </div>

        {/* Decision Weights Badge */}
        <div className="flex items-center gap-3 bg-[#181822] border border-[#272738] p-2.5 rounded-xl font-mono text-[11px] text-gray-300">
          <Sliders className="w-4 h-4 text-amber-400" />
          <span>Weights: Quality 40% | Price 25% | Rel 20% | Speed 10% | Risk 5%</span>
        </div>
      </div>

      {/* Winner Announcement Banner */}
      {winner && (
        <div className="bg-gradient-to-r from-emerald-950/40 via-[#141a18] to-[#121217] border border-emerald-500/40 rounded-2xl p-5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 glow-emerald">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-extrabold text-xl shadow-lg">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                ✓ BEST MATCH SELECTED BY DECISION ENGINE
              </span>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Agent: <span className="text-emerald-400">{winner.agentName}</span>
              </h3>
              <p className="text-xs text-gray-400">
                Optimal balance of research precision, low collateral risk, and reputation history.
              </p>
            </div>
          </div>

          <div className="text-right bg-[#0d1411] border border-emerald-500/30 px-5 py-2.5 rounded-xl">
            <span className="text-[10px] font-mono text-gray-400 block">FINAL SCORE</span>
            <span className="text-2xl font-black text-emerald-400 font-mono-num">{winner.finalScore} / 100</span>
          </div>
        </div>
      )}

      {/* Comparison Matrix Table */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#232332] text-gray-400 font-mono uppercase bg-[#161620]">
              <th className="py-3 px-4 rounded-l-xl">Agent</th>
              <th className="py-3 px-3">Bid Price</th>
              <th className="py-3 px-3">Est. Quality (40%)</th>
              <th className="py-3 px-3">Price Score (25%)</th>
              <th className="py-3 px-3">Reliability (20%)</th>
              <th className="py-3 px-3">Speed (10%)</th>
              <th className="py-3 px-3">Risk (5%)</th>
              <th className="py-3 px-4 rounded-r-xl text-right">Composite Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e1e2c]">
            {bids.map((bid) => {
              const isSelected = bid.agentName === winner?.agentName;
              return (
                <tr
                  key={bid.id}
                  className={`transition-colors ${
                    isSelected ? 'bg-emerald-500/10 font-medium' : 'hover:bg-[#181822]'
                  }`}
                >
                  <td className="py-3 px-4 flex items-center gap-2.5">
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                    <span className={`font-bold ${isSelected ? 'text-emerald-400' : 'text-white'}`}>
                      {bid.agentName}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-gray-200">${bid.price}</td>
                  <td className="py-3 px-3 font-mono text-gray-300">{bid.scores.quality} pts</td>
                  <td className="py-3 px-3 font-mono text-gray-300">{bid.scores.price} pts</td>
                  <td className="py-3 px-3 font-mono text-gray-300">{bid.scores.reliability} pts</td>
                  <td className="py-3 px-3 font-mono text-gray-300">{bid.scores.speed} pts</td>
                  <td className="py-3 px-3 font-mono text-gray-300">{bid.scores.risk} pts</td>
                  <td className="py-3 px-4 text-right font-mono font-black text-sm">
                    <span className={isSelected ? 'text-emerald-400' : 'text-gray-400'}>
                      {bid.finalScore}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <button
        onClick={onProceedToFinancial}
        className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-red-900/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
      >
        <span>Proceed to Autonomous Financial Layer Assessment</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
