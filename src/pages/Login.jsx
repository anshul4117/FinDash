import { motion } from 'framer-motion';
import { useFinanceStore } from '../store/useFinanceStore';
import { ShieldCheck, User, ArrowRight, Lock, TrendingUp, DollarSign, BarChart3, PieChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { setRole } = useFinanceStore();
  const navigate = useNavigate();

  const handleLogin = (role) => {
    setRole(role);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#011627] flex font-sans overflow-hidden">
      
      {/* LEFT COLUMN: Finance Background */}
      <div className="hidden lg:flex w-1/2 flex-col relative justify-center items-center">
        {/* Ambient glows */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-[#2ec4b6]/10 rounded-full blur-[100px] mix-blend-screen" />
          <div className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-[#ff9f1c]/10 rounded-full blur-[100px] mix-blend-screen" />
          <div className="absolute top-[40%] left-[50%] w-[40%] h-[40%] bg-[#cbf3f0]/5 rounded-full blur-[80px] mix-blend-screen" />
          {/* Dot grid */}
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(203,243,240,0.05) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>

        {/* Floating Finance Elements */}
        <div className="relative z-10 w-full max-w-lg px-12">
          {/* Animated floating icons */}
          <div className="relative w-full h-[320px] mb-12">
            {/* Central large icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-gradient-to-br from-[#2ec4b6]/20 to-[#2ec4b6]/5 border border-[#2ec4b6]/20 rounded-3xl flex items-center justify-center backdrop-blur-sm shadow-[0_0_60px_rgba(46,196,182,0.15)]"
            >
              <DollarSign size={48} className="text-[#2ec4b6]" />
            </motion.div>

            {/* Top-right: Trending */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-4 right-8 w-16 h-16 bg-[#ff9f1c]/10 border border-[#ff9f1c]/15 rounded-2xl flex items-center justify-center backdrop-blur-sm"
            >
              <TrendingUp size={28} className="text-[#ff9f1c]" />
            </motion.div>

            {/* Bottom-left: Bar Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-4 left-8 w-16 h-16 bg-[#ffbf69]/10 border border-[#ffbf69]/15 rounded-2xl flex items-center justify-center backdrop-blur-sm"
            >
              <BarChart3 size={28} className="text-[#ffbf69]" />
            </motion.div>

            {/* Top-left: Pie */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-12 left-4 w-14 h-14 bg-[#cbf3f0]/10 border border-[#cbf3f0]/15 rounded-2xl flex items-center justify-center backdrop-blur-sm"
            >
              <PieChart size={24} className="text-[#cbf3f0]" />
            </motion.div>

            {/* Bottom-right: Shield */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-12 right-4 w-14 h-14 bg-[#2ec4b6]/10 border border-[#2ec4b6]/15 rounded-2xl flex items-center justify-center backdrop-blur-sm"
            >
              <ShieldCheck size={24} className="text-[#2ec4b6]" />
            </motion.div>

            {/* Decorative ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-dashed border-white/5 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 border border-dashed border-white/[0.03] rounded-full" />
          </div>

          {/* Editorial Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-left w-full space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
              <Lock size={14} className="text-[#2ec4b6]" />
              <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.15em]">Enterprise Grade Security</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight font-display leading-[1.1]">
              Precision.<br />
              <span className="text-[#cbf3f0]/50">Curated Finance.</span>
            </h1>
            <p className="text-slate-400 text-base font-medium max-w-sm leading-relaxed">
              Gain unparalleled clarity over your financial architecture with our next-generation asset management platform.
            </p>
          </motion.div>
        </div>
      </div>

      {/* RIGHT COLUMN: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative bg-[#0b253a]">
         <div className="absolute inset-0 bg-gradient-to-br from-[#011627] to-[#0b253a] lg:hidden" />

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md bg-[#011627] rounded-[2rem] p-8 lg:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-slate-800 relative z-10"
        >
          {/* Mobile brand header */}
          <div className="lg:hidden mb-8 text-center">
             <div className="h-12 w-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center font-bold text-white mb-4 text-xl mx-auto shadow-lg shadow-[#2ec4b6]/10">F</div>
            <h2 className="text-2xl font-black text-white tracking-tight font-display">FinDash</h2>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-black text-white tracking-tight font-display mb-2">Welcome Back</h2>
            <p className="text-slate-400 text-sm font-medium">Select your authorized workspace role to continue.</p>
          </div>

          <div className="space-y-4">
            <motion.button whileHover={{ scale: 1.01, y: -2 }} whileTap={{ scale: 0.99 }} onClick={() => handleLogin('admin')}
              className="w-full group relative flex items-center gap-5 p-5 bg-white/5 hover:bg-white/10 border-2 border-slate-800 hover:border-[#2ec4b6]/50 rounded-2xl transition-all duration-300 text-left overflow-hidden shadow-sm hover:shadow-[0_8px_24px_-8px_rgba(46,196,182,0.2)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform" />
              <div className="w-12 h-12 rounded-xl bg-[#2ec4b6]/10 text-[#2ec4b6] flex items-center justify-center shrink-0 border border-[#2ec4b6]/20 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-white font-display">Admin Access</h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed mt-0.5">Read & Write. Full control over ledgers and configuration.</p>
              </div>
              <ArrowRight size={20} className="text-slate-600 group-hover:text-[#2ec4b6] group-hover:translate-x-1 transition-all" />
            </motion.button>

            <motion.button whileHover={{ scale: 1.01, y: -2 }} whileTap={{ scale: 0.99 }} onClick={() => handleLogin('viewer')}
              className="w-full group relative flex items-center gap-5 p-5 bg-white/5 hover:bg-white/10 border-2 border-slate-800 hover:border-[#ff9f1c]/50 rounded-2xl transition-all duration-300 text-left overflow-hidden shadow-sm hover:shadow-[0_8px_24px_-8px_rgba(255,159,28,0.2)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform" />
              <div className="w-12 h-12 rounded-xl bg-[#ff9f1c]/10 text-[#ff9f1c] flex items-center justify-center shrink-0 border border-[#ff9f1c]/20 group-hover:scale-110 transition-transform duration-300">
                <User size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-white font-display">Viewer Access</h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed mt-0.5">Read-only. Monitor insights and track financial health.</p>
              </div>
              <ArrowRight size={20} className="text-slate-600 group-hover:text-[#ff9f1c] group-hover:translate-x-1 transition-all" />
            </motion.button>
          </div>

          <div className="mt-12 pt-6 border-t border-slate-800 text-center">
             <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.1em]">Internal System • Authenticated Personnel Only</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
