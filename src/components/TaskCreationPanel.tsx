import React, { useState } from 'react';
import { FilePlus, DollarSign, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { Task } from '../types';

interface TaskCreationPanelProps {
  initialTask: Task;
  onCreateTask: (task: Task) => void;
}

export const TaskCreationPanel: React.FC<TaskCreationPanelProps> = ({ initialTask, onCreateTask }) => {
  const [title, setTitle] = useState(initialTask.title);
  const [description, setDescription] = useState(initialTask.description);
  const [budget, setBudget] = useState(initialTask.budget);
  const [qualityThreshold, setQualityThreshold] = useState(initialTask.qualityThreshold);
  const [deadlineSeconds, setDeadlineSeconds] = useState(initialTask.deadlineSeconds);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateTask({
      ...initialTask,
      title,
      description,
      budget,
      qualityThreshold,
      deadlineSeconds,
    });
  };

  return (
    <div className="bg-[#121217] border border-[#23232e] rounded-2xl p-6 shadow-2xl mb-6">
      <div className="flex items-center justify-between border-b border-[#20202a] pb-4 mb-6">
        <div>
          <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest bg-red-500/10 px-2 py-0.5 rounded-full">
            Stage 1 — Broadcast Task Specification
          </span>
          <h2 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
            <FilePlus className="w-5 h-5 text-red-500" /> Create Autonomous Task Specification
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-3 space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Task Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#181822] border border-[#272736] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
              required
            />
          </div>

          <div className="md:col-span-3 space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Task Description & Requirements</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#181822] border border-[#272736] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Budget Allocation ($)
            </label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full bg-[#181822] border border-[#272736] rounded-xl px-4 py-2 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
              min={10}
              max={1000}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Required Quality Threshold (%)
            </label>
            <input
              type="number"
              value={qualityThreshold}
              onChange={(e) => setQualityThreshold(Number(e.target.value))}
              className="w-full bg-[#181822] border border-[#272736] rounded-xl px-4 py-2 text-sm text-white font-mono focus:outline-none focus:border-amber-500"
              min={50}
              max={99}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-400" /> Max Execution Deadline (Sec)
            </label>
            <input
              type="number"
              value={deadlineSeconds}
              onChange={(e) => setDeadlineSeconds(Number(e.target.value))}
              className="w-full bg-[#181822] border border-[#272736] rounded-xl px-4 py-2 text-sm text-white font-mono focus:outline-none focus:border-blue-500"
              min={10}
              max={600}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-red-900/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <span>Broadcast Task & Activate Discovery Engine</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
