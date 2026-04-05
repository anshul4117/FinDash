import { useFinanceStore } from '../store/useFinanceStore';
import { CATEGORIES } from '../data/mockData';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell, Legend, ComposedChart, Line
} from 'recharts';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle2, DollarSign, PieChart as PieIcon, Layers } from 'lucide-react';
import { formatCurrency, getCategorySpending } from '../utils/formatters';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Insights() {
  const { transactions } = useFinanceStore();
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const observer = new MutationObserver(() => setIsDark(document.documentElement.classList.contains('dark')));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const chartColors = {
    text: isDark ? '#94a3b8' : '#64748b',
    grid: isDark ? '#1e3a5a' : '#f1f5f9',
    tooltipBg: isDark ? '#1d3b53' : '#ffffff',
    tooltipText: isDark ? '#fdfffc' : '#0f172a',
  };

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);
  
  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const spendingByCategory = getCategorySpending(transactions, CATEGORIES);
  const highestSpending = [...spendingByCategory].sort((a, b) => b.value - a.value)[0];
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  // Monthly comparison data (mocked for visualization)
  const monthlyData = [
    { month: 'Jan', income: 4000, expenses: 3200 },
    { month: 'Feb', income: 4200, expenses: 3500 },
    { month: 'Mar', income: 4500, expenses: 3100 },
    { month: 'Apr', income: totalIncome || 4800, expenses: totalExpenses || 3300 },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-1">Financial Insights</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium font-sans">Deep dive into your spending habits and savings performance.</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <motion.div whileHover={{ y: -4 }} className="bg-white dark:bg-[#0b253a] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm shadow-slate-100 flex items-start gap-4 transition-colors">
          <div className="p-3 rounded-xl bg-primary/5 text-primary border border-primary/20">
            <PieIcon size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Highest Spending</p>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{highestSpending?.name}</h3>
            <p className="text-sm font-bold text-[#ff9f1c] mt-1">{formatCurrency(highestSpending?.value || 0)} spent</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="bg-white dark:bg-[#0b253a] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm shadow-slate-100 flex items-start gap-4 transition-colors">
          <div className="p-3 rounded-xl bg-primary/5 text-primary border border-primary/20">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Savings Rate</p>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{savingsRate.toFixed(1)}%</h3>
            <div className="flex items-center gap-1 mt-1 text-[#2ec4b6] font-bold text-sm">
              <TrendingUp size={14} />
              <span>Above average</span>
            </div>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="bg-white dark:bg-[#0b253a] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm shadow-slate-100 flex items-start gap-4 transition-colors">
          <div className="p-3 rounded-xl bg-primary/5 text-primary border border-primary/20">
            <Layers size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Transactions</p>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{transactions.length}</h3>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-1">Last 30 days</p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Income vs Expenses Bar Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0b253a] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm shadow-slate-100 transition-colors">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight uppercase">Income vs Expenses</h3>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Comparing your earnings and spending over time</p>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={monthlyData} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartColors.grid} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: chartColors.text, fontSize: 10, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: chartColors.text, fontSize: 10, fontWeight: 600 }}
                  tickFormatter={(val) => `$${val/1000}k`}
                />
                <Tooltip 
                  cursor={{ fill: isDark ? '#ffffff' : '#000000', opacity: 0.05 }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', background: chartColors.tooltipBg, color: chartColors.tooltipText }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: '30px', fontSize: '10px', fontWeight: 'black', textTransform: 'uppercase', letterSpacing: '0.1em' }} />
                <Bar dataKey="income" fill="#2ec4b6" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="expenses" fill="#ff9f1c" radius={[4, 4, 0, 0]} barSize={20} />
                <Line type="monotone" dataKey="income" stroke="#2ec4b6" strokeWidth={2} dot={{ r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insight Breakdown List */}
        <div className="bg-white dark:bg-[#0b253a] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm shadow-slate-100 transition-colors">
          <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight mb-6 uppercase">Suggestions</h3>
          <div className="space-y-4">
            <div className="p-4 bg-[#2ec4b6]/5 border border-[#2ec4b6]/10 rounded-xl flex gap-3">
              <CheckCircle2 className="text-[#2ec4b6] shrink-0" size={20} />
              <p className="text-sm font-bold text-[#2ec4b6] leading-snug">
                Great job! Your savings rate is up <span className="font-black underline">4.2%</span> compared to last month.
              </p>
            </div>
            <div className="p-4 bg-[#ff9f1c]/5 border border-[#ff9f1c]/10 rounded-xl flex gap-3">
              <AlertCircle className="text-[#ff9f1c] shrink-0" size={20} />
              <p className="text-sm font-bold text-[#ff9f1c] leading-snug">
                Your <span className="font-black underline">Dining</span> expenses are <span className="font-black">15% higher</span> than usual this week.
              </p>
            </div>
            <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl flex gap-3">
              <DollarSign className="text-primary shrink-0" size={20} />
              <p className="text-sm font-bold text-primary dark:text-[#cbf3f0] leading-snug">
                You could save <span className="font-black">$45</span> by switching to a yearly gym membership.
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Category Limits</h4>
            <div className="space-y-4">
              {spendingByCategory.slice(0, 3).map((cat) => (
                <div key={cat.name} className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-wider">
                    <span className="text-slate-700 dark:text-slate-300">{cat.name}</span>
                    <span className="text-slate-400">{formatCurrency(cat.value)} / $1,000</span>
                  </div>
                  <div className="h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500" 
                      style={{ 
                        width: `${Math.min((cat.value / 1000) * 100, 100)}%`,
                        backgroundColor: cat.color 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
