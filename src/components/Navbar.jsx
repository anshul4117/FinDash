import { Search, Bell, Moon, Sun, UserCircle, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useFinanceStore } from '../store/useFinanceStore';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) { return twMerge(clsx(inputs)); }

export default function Navbar({ onMenuClick, isMobile }) {
  const { role } = useFinanceStore();
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <header className="sticky top-0 z-30 h-16 w-full border-b border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-[#011627]/80 backdrop-blur-md px-4 sm:px-6 transition-colors">
      <div className="flex h-full items-center justify-between gap-4">
        {/* Mobile: Hamburger + Logo */}
        {isMobile && (
          <div className="flex items-center gap-3">
            <button onClick={onMenuClick} className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Open menu">
              <Menu size={22} />
            </button>
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 bg-primary rounded-lg flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-primary/20">F</div>
              <span className="text-base font-black font-display tracking-tight text-slate-900 dark:text-white">FinDash</span>
            </div>
          </div>
        )}

        {/* Desktop: Search */}
        {!isMobile && (
          <div className="flex-1 max-w-md">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input type="text" placeholder="Search transactions..." className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-slate-800 focus:border-primary transition-all dark:text-slate-200 font-medium" />
            </div>
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary transition-colors" aria-label="Toggle dark mode">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary transition-colors" aria-label="Notifications">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-secondary border-2 border-white dark:border-[#011627]" />
          </button>

          {!isMobile && <div className="h-8 w-px bg-slate-100 dark:bg-slate-800 mx-1" />}

          <div className="flex items-center gap-3 pl-1">
            {!isMobile && (
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Alex Rivera</p>
                <span className={cn("text-[9px] px-1.5 py-0.5 rounded-full font-black uppercase tracking-wider border", role === 'admin' ? "bg-[#2ec4b6]/10 text-[#2ec4b6] border-[#2ec4b6]/20" : "bg-[#ff9f1c]/10 text-[#ff9f1c] border-[#ff9f1c]/20")}>{role}</span>
              </div>
            )}
            <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center border shadow-sm transition-all", role === 'admin' ? "bg-[#2ec4b6]/5 text-[#2ec4b6] border-[#2ec4b6]/10" : "bg-[#ff9f1c]/5 text-[#ff9f1c] border-[#ff9f1c]/10")}>
              <UserCircle size={22} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
