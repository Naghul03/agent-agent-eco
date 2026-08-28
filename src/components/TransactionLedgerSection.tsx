import React from 'react';
import { History, FileText, CheckCircle2, Shield, DollarSign } from 'lucide-react';
import { TransactionRecord } from '../types';

interface TransactionLedgerSectionProps {
  ledger: TransactionRecord[];
}

export const TransactionLedgerSection: React.FC<TransactionLedgerSectionProps> = ({ ledger }) => {
  return (
    <div className="bg-[#121217] border border-[#23232e] rounded-2xl p-6 shadow-2xl mb-6">
      <div className="flex items-center justify-between border-b border-[#20202a] pb-4 mb-6">
        <div>
          <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest bg-red-500/10 px-2 py-0.5 rounded-full">
            Immutable Audit Trail
          </span>
          <h2 className="text-xl font-bold text-white mt-1.5 flex items-center gap-2">
            <History className="w-5 h-5 text-red-500" /> Transaction Ledger
          </h2>
        </div>
        <span className="text-xs font-mono text-gray-400">
          {ledger.length} Recorded Transactions
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse font-mono">
          <thead>
            <tr className="border-b border-[#232332] text-gray-400 uppercase bg-[#161620]">
              <th className="py-3 px-4 rounded-l-xl">TX Hash ID</th>
              <th className="py-3 px-3">Task Title</th>
              <th className="py-3 px-3">Buyer</th>
              <th className="py-3 px-3">Worker</th>
              <th className="py-3 px-3">Escrow</th>
              <th className="py-3 px-3">Worker Payout</th>
              <th className="py-3 px-3">Evaluator Pool</th>
              <th className="py-3 px-3">Collateral</th>
              <th className="py-3 px-3">Consensus</th>
              <th className="py-3 px-4 rounded-r-xl text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e1e2c]">
            {ledger.map((tx) => (
              <tr key={tx.id} className="hover:bg-[#181822] transition-colors">
                <td className="py-3 px-4 font-bold text-red-400">{tx.id}</td>
                <td className="py-3 px-3 text-white truncate max-w-[140px]">{tx.taskTitle}</td>
                <td className="py-3 px-3 text-gray-300">{tx.buyerAgentName}</td>
                <td className="py-3 px-3 text-gray-300">{tx.workerAgentName}</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">${tx.escrowAmount}</td>
                <td className="py-3 px-3 text-emerald-400">${tx.workerReward}</td>
                <td className="py-3 px-3 text-purple-400">${tx.evaluatorReward}</td>
                <td className="py-3 px-3 text-amber-400">{tx.collateralStatus}</td>
                <td className="py-3 px-3 text-gray-300">
                  {tx.consensusScore}% / {tx.threshold}%
                </td>
                <td className="py-3 px-4 text-right">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                    tx.status === 'SETTLED' 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                      : 'bg-red-500/10 text-red-400 border-red-500/30'
                  }`}>
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
