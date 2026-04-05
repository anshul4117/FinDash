import { TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

const variants = {
  primary: "bg-[#2ec4b6]/10 dark:bg-[#2ec4b6]/20 text-[#2ec4b6] dark:text-[#2ec4b6] border-[#2ec4b6]/20 dark:border-[#2ec4b6]/30 shadow-[#2ec4b6]/5",
  secondary: "bg-[#ff9f1c]/10 dark:bg-[#ff9f1c]/20 text-[#ff9f1c] dark:text-[#ff9f1c] border-[#ff9f1c]/20 dark:border-[#ff9f1c]/30 shadow-[#ff9f1c]/5",
  accent: "bg-[#ffbf69]/10 dark:bg-[#ffbf69]/20 text-[#ffbf69] dark:text-[#ffbf69] border-[#ffbf69]/20 dark:border-[#ffbf69]/30 shadow-[#ffbf69]/5",
  success: "bg-[#2ec4b6]/10 dark:bg-[#2ec4b6]/20 text-[#2ec4b6] dark:text-[#2ec4b6] border-[#2ec4b6]/20 dark:border-[#2ec4b6]/30 shadow-[#2ec4b6]/5",
  danger: "bg-[#ff9f1c]/10 dark:bg-[#ff9f1c]/20 text-[#ff9f1c] dark:text-[#ff9f1c] border-[#ff9f1c]/20 dark:border-[#ff9f1c]/30 shadow-[#ff9f1c]/5",
};

export default function StatCard({ title, amount, trend, icon: Icon, variant = 'primary' }) {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

  return (
    <motion.div 
      whileHover={{ y: -4, scale: 1.01 }}
      className="bg-white dark:bg-[#0b253a] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/20 group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl border transition-all duration-300 group-hover:scale-110 ${variants[variant]}`}>
          <Icon size={24} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
            trend.isUp ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400' : 'text-rose-600 bg-rose-50 dark:bg-rose-900/20 dark:text-rose-400'
          }`}>
            {trend.isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            <span>{trend.value}%</span>
          </div>
        )}
      </div>
      
      <div>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{formattedAmount}</h3>
      </div>
    </motion.div>
  );
}
