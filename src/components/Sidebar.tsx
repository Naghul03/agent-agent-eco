import React from 'react';
import { 
  LayoutDashboard, 
  Bot, 
  FileText, 
  ShieldCheck, 
  Wallet, 
  History, 
  Settings, 
  Zap,
  HelpCircle
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'tasks', icon: FileText, label: 'Tasks & Pipeline' },
    { id: 'agents', icon: Bot, label: 'Agent Network' },
    { id: 'financial', icon: ShieldCheck, label: 'Financial Layer' },
    { id: 'ledger', icon: History, label: 'Ledger & Audit' },
    { id: 'wallets', icon: Wallet, label: 'Agent Wallets' },
  ];

  return (
    <aside className="w-20 lg:w-64 bg-[#0e0e12] border-r border-[#20202a] flex flex-col justify-between p-4 min-h-screen select-none transition-all duration-300">
      <div className="space-y-6">
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg shadow-red-900/30 text-white font-extrabold text-xl tracking-tighter">
            P
          </div>
          <div className="hidden lg:block">
            <h1 className="font-bold text-base text-white tracking-wide leading-none">PRIME<span className="text-red-500">PAY</span></h1>
            <p className="text-[10px] text-gray-400 font-mono tracking-wider mt-1 uppercase">Autonomous FinNet</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 font-semibold'
                    : 'text-gray-400 hover:text-white hover:bg-[#181820]'
                }`}
              >
                <div className={`p-1.5 rounded-lg ${isActive ? 'bg-red-700/50' : 'bg-transparent'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="hidden lg:inline text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer System Status */}
      <div className="space-y-3">
        <div className="hidden lg:block bg-[#14141c] border border-[#262634] rounded-2xl p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 font-medium">Jury Status</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <p className="text-xs text-gray-200 font-semibold flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            5 Evaluators Online
          </p>
          <div className="w-full bg-[#20202c] rounded-full h-1.5 overflow-hidden">
            <div className="bg-emerald-500 h-full w-[96%]" />
          </div>
        </div>

        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-[#181820] text-sm">
          <HelpCircle className="w-5 h-5" />
          <span className="hidden lg:inline">Hackathon Demo</span>
        </button>
      </div>
    </aside>
  );
};
