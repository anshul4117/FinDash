import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useWindowSize } from '../hooks/useWindowSize';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function DashboardLayout() {
  const { isMobile } = useWindowSize();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (isMobile) setIsSidebarOpen(false);
  }, [location.pathname, isMobile]);

  // Sync sidebar state with screen size changes
  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#011627] font-sans selection:bg-primary/20 overflow-x-hidden">
      {/* Mobile Backdrop */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar isOpen={isSidebarOpen} isMobile={isMobile} toggleSidebar={toggleSidebar} />

      <main className={cn(
        "flex flex-col min-h-screen transition-all duration-300 ease-in-out",
        isMobile ? "pl-0" : (isSidebarOpen ? "pl-64" : "pl-20")
      )}>
        <Navbar onMenuClick={toggleSidebar} isMobile={isMobile} />
        
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full animate-fade-in">
          <Outlet />
        </div>

        <footer className="py-4 sm:py-6 px-4 sm:px-8 border-t border-slate-100 dark:border-slate-800 bg-white/40 dark:bg-transparent mt-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <span>&copy; 2026 FinDash Analytics</span>
            <div className="flex items-center gap-4 sm:gap-6">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Support</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
