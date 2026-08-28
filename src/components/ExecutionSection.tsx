import React from 'react';
import { Play, Cpu, CheckCircle2, ArrowRight, FileCheck, Terminal } from 'lucide-react';
import { Agent, Task } from '../types';

interface ExecutionSectionProps {
  worker: Agent;
  task: Task;
  progress: number;
  output: string;
  isMalicious: boolean;
  onProceedToJury: () => void;
}

export const ExecutionSection: React.FC<ExecutionSectionProps> = ({
  worker,
  task,
  progress,
  output,
  isMalicious,
  onProceedToJury,
}) => {
  return (
    <div className="bg-[#121217] border border-[#23232e] rounded-2xl p-6 shadow-2xl mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#20202a] pb-4 mb-6 gap-4">
        <div>
          <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest bg-red-500/10 px-2 py-0.5 rounded-full">
            Stage 6 — Autonomous Execution
          </span>
          <h2 className="text-xl font-bold text-white mt-1.5 flex items-center gap-2">
            <Play className="w-5 h-5 text-blue-400 animate-spin" /> Worker Agent Execution
          </h2>
        </div>
        <div className="flex items-center gap-2 bg-[#181822] border border-[#272738] px-3 py-1.5 rounded-xl text-xs font-mono">
          <img src={worker.avatar} alt={worker.name} className="w-6 h-6 rounded-md object-cover" />
          <span className="text-gray-300 font-bold">{worker.name}</span>
          <span className="text-emerald-400 font-bold">EXECUTING</span>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="bg-[#0b0b0e] border border-[#20202c] p-5 rounded-2xl mb-6 space-y-3">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-gray-300 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-blue-400" />
            {worker.name} processing task parameters...
          </span>
          <span className="text-blue-400 font-bold">{progress}%</span>
        </div>

        <div className="w-full bg-[#181824] rounded-full h-3 overflow-hidden p-0.5 border border-[#242436]">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              isMalicious ? 'bg-gradient-to-r from-red-600 to-amber-600' : 'bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Live Terminal Output */}
        <div className="bg-[#07070a] border border-[#1d1d28] p-3 rounded-xl font-mono text-[11px] space-y-1 text-gray-400 max-h-32 overflow-y-auto">
          <p className="text-gray-500">[SYSTEM] Task #{task.id} compute node assigned to {worker.name}.</p>
          {progress >= 20 && <p className="text-blue-400">[0.2s] Ingesting customer feedback vectors...</p>}
          {progress >= 50 && <p className="text-blue-400">[0.5s] Running multi-dimensional sentiment clustering...</p>}
          {progress >= 80 && <p className="text-indigo-400">[0.8s] Formatting strategic summary output...</p>}
          {progress >= 100 && (
            <p className={isMalicious ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
              [1.1s] WORK SUBMITTED SUCCESSFULLY — PAYLOAD READY FOR BLIND JURY.
            </p>
          )}
        </div>
      </div>

      {/* Work Submission Viewer */}
      {progress >= 100 && (
        <div className="bg-[#161620] border border-[#272738] rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-between border-b border-[#232332] pb-3 mb-3">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold text-white uppercase font-mono">Submitted Work Result Payload</h3>
            </div>
            <span className="text-[10px] font-mono bg-blue-500/20 text-blue-400 border border-blue-500/40 px-2 py-0.5 rounded-full">
              READY FOR VERIFICATION
            </span>
          </div>

          <pre className="bg-[#0d0d12] border border-[#1f1f2c] p-4 rounded-xl text-xs font-mono text-gray-300 overflow-x-auto max-h-56 leading-relaxed whitespace-pre-wrap">
            {output}
          </pre>
        </div>
      )}

      <button
        onClick={onProceedToJury}
        disabled={progress < 100}
        className={`w-full font-bold py-3.5 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all ${
          progress >= 100
            ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-red-900/30 active:scale-[0.98]'
            : 'bg-gray-800 text-gray-500 cursor-not-allowed'
        }`}
      >
        <span>Submit Result to 5-Agent Blind Jury</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
