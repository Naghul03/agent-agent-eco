import React from 'react';
import { TransactionState } from '../types';
import { 
  Search, 
  Users, 
  Shield, 
  Lock, 
  Play, 
  Eye, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';

interface PipelineStepperProps {
  currentState: TransactionState;
  onSelectState: (state: TransactionState) => void;
  isMalicious: boolean;
}

export const PipelineStepper: React.FC<PipelineStepperProps> = ({
  currentState,
  onSelectState,
  isMalicious,
}) => {
  const steps = [
    { key: 'DISCOVERY' as TransactionState, label: '1. Discovery', icon: Search },
    { key: 'COMPETITION' as TransactionState, label: '2. Competition', icon: Users },
    { key: 'FINANCIAL_ASSESSMENT' as TransactionState, label: '3. Financial Layer', icon: Shield },
    { key: 'ESCROW_LOCKED' as TransactionState, label: '4. Escrow & Collateral', icon: Lock },
    { key: 'EXECUTING' as TransactionState, label: '5. Execution', icon: Play },
    { key: 'JURY_COMMITTING' as TransactionState, label: '6. Blind Jury', icon: Eye },
    { key: 'SETTLEMENT' as TransactionState, label: '7. Settlement', icon: CheckCircle },
  ];

  const getStateIndex = (state: TransactionState): number => {
    switch (state) {
      case 'IDLE':
      case 'FUNDING':
      case 'TASK_CREATION':
        return 0;
      case 'DISCOVERY':
        return 0;
      case 'COMPETITION':
        return 1;
      case 'FINANCIAL_ASSESSMENT':
        return 2;
      case 'ESCROW_LOCKED':
      case 'COLLATERAL_LOCKED':
        return 3;
      case 'EXECUTING':
      case 'SUBMITTED':
        return 4;
      case 'JURY_COMMITTING':
      case 'JURY_REVEALING':
      case 'CONSENSUS':
        return 5;
      case 'SETTLEMENT':
      case 'COMPLETED':
      case 'VERIFICATION_FAILED':
      case 'REFUNDED':
        return 6;
      default:
        return 0;
    }
  };

  const activeIndex = getStateIndex(currentState);

  return (
    <div className="bg-[#121217] border border-[#23232e] rounded-2xl p-4 mb-6 shadow-xl">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <h3 className="text-xs font-bold text-gray-300 tracking-wider uppercase">
            Transaction Pipeline Engine
          </h3>
          {isMalicious && (
            <span className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-md font-mono flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> MALICIOUS TEST SCENARIO
            </span>
          )}
        </div>
        <span className="text-xs font-mono text-gray-400">
          State: <strong className="text-red-400 uppercase">{currentState}</strong>
        </span>
      </div>

      {/* Stepper horizontal grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = idx === activeIndex;
          const isCompleted = idx < activeIndex;

          return (
            <button
              key={step.key}
              onClick={() => onSelectState(step.key)}
              className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all duration-200 relative ${
                isActive
                  ? 'bg-red-500/10 border-red-500 text-white shadow-lg shadow-red-900/30 scale-[1.02]'
                  : isCompleted
                  ? 'bg-[#181822] border-emerald-500/30 text-emerald-400'
                  : 'bg-[#14141a] border-[#22222e] text-gray-500 hover:text-gray-300'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center mb-1.5 text-xs font-bold ${
                  isActive
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/40'
                    : isCompleted
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-[#1f1f2a] text-gray-400'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-semibold tracking-tight leading-tight truncate w-full">
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
