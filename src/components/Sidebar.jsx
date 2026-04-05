import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Receipt, 
  TrendingUp, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  X
} from 'lucide-react';
import { useFinanceStore } from '../store/useFinanceStore';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/transactions', label: 'Transactions', icon: Receipt },
  { path: '/insights', label: 'Insights', icon: TrendingUp },
];

export default function Sidebar({ isOpen, isMobile, toggleSidebar }) {
  const { role, logout } = useFinanceStore();

  const sidebarClasses = cn(
    "fixed inset-y-0 left-0 z-50 flex flex-col bg-white dark:bg-[#011627] transition-all duration-300 ease-in-out border-r border-slate-100 dark:border-slate-800 shadow-xl lg:shadow-none",
    isMobile 
      ? (isOpen ? "translate-x-0 w-[280px]" : "-translate-x-full w-[280px]") 
      : (isOpen ? "w-64" : "w-20")
  );

  return (
    <aside className={sidebarClasses}>
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-slate-100 dark:border-slate-800">
        <div className={cn("flex items-center gap-2 overflow-hidden whitespace-nowrap", !isOpen && !isMobile && "hidden")}>
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-primary/20">
            F
          </div>
          <span className="text-xl font-black font-display tracking-tight text-slate-900 dark:text-white">FinDash</span>
        </div>
        
        <button 
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500"
        >
          {isMobile ? (
            <X size={20} />
          ) : (
            isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />
          )}
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 space-y-1 p-3">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group font-bold relative overflow-hidden",
              isActive 
                ? "bg-primary text-white shadow-lg shadow-primary/30" 
                : "text-slate-500 dark:text-slate-400 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-[#2ec4b6]"
            )}
            title={!isOpen && !isMobile ? item.label : ''}
          >
            {({ isActive }) => (
              <>
                <item.icon size={22} className={cn(!isOpen && !isMobile && "mx-auto transition-transform group-hover:scale-110")} />
                {(isOpen || isMobile) && <span className="text-sm tracking-tight">{item.label}</span>}
                {isActive && isOpen && !isMobile && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute left-0 w-1 h-6 bg-white rounded-r-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Role & Footer Info */}
      <div className="mt-auto p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0b253a]/50">
        <div className={cn(
          "flex flex-col gap-2 p-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700",
          !isOpen && !isMobile && "items-center"
        )}>
          {(isOpen || isMobile) && (
            <div className="flex items-center justify-between mb-1 px-1">
              <span className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Access Mode</span>
              <span className={cn(
                "text-[10px] px-1.5 py-0.5 rounded uppercase font-bold",
                role === 'admin' ? "bg-[#2ec4b6]/20 text-[#2ec4b6]" : "bg-[#ff9f1c]/20 text-[#ff9f1c]"
              )}>
                {role}
              </span>
            </div>
          )}
          
          <button
            onClick={logout}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/10 font-bold mt-2 border border-transparent hover:border-rose-100 dark:hover:border-rose-900/20",
              !isOpen && !isMobile && "px-0 justify-center w-full"
            )}
            title="Sign Out"
          >
            <LogOut size={20} />
            {(isOpen || isMobile) && <span className="text-xs">Log Out</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
