import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#011627] flex items-center justify-center p-6 font-sans">
      {/* Background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[30%] w-[40%] h-[40%] bg-[#ff9f1c]/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[30%] w-[30%] h-[30%] bg-[#2ec4b6]/8 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center max-w-md"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mb-8 w-20 h-20 bg-[#ff9f1c]/10 border border-[#ff9f1c]/20 rounded-2xl flex items-center justify-center"
        >
          <AlertTriangle size={36} className="text-[#ff9f1c]" />
        </motion.div>

        {/* 404 */}
        <h1 className="text-8xl font-black text-white/10 tracking-tighter font-display mb-2">404</h1>
        <h2 className="text-2xl font-black text-white tracking-tight font-display mb-3">Page Not Found</h2>
        <p className="text-slate-400 text-sm font-medium leading-relaxed mb-10">
          The route you're looking for doesn't exist or has been moved. Please check the URL or navigate back to the dashboard.
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 border border-slate-700 hover:border-slate-600 text-white font-bold rounded-xl transition-all active:scale-95"
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-5 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-95"
          >
            <Home size={18} />
            <span>Dashboard</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
