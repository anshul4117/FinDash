import { useState, useEffect } from 'react';
import { useFinanceStore } from '../store/useFinanceStore';
import { CATEGORIES } from '../data/mockData';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts';
import StatCard from '../components/StatCard';
import { CardSkeleton } from '../components/Skeleton';
import { Wallet, ArrowUpCircle, ArrowDownCircle, Info } from 'lucide-react';
import { formatCurrency, getBalanceData, getCategorySpending } from '../utils/formatters';

export default function Dashboard() {
  const { transactions } = useFinanceStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Watch for theme changes to update charts
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Aggregate stats
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);
  
  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);
  
  const balance = totalIncome - totalExpenses;

  // Data for charts
  const balanceHistory = getBalanceData(transactions);
  const spendingByCategory = getCategorySpending(transactions, CATEGORIES);

  const chartColors = {
    text: isDark ? '#94a3b8' : '#64748b',
    grid: isDark ? '#1e3a5a' : '#f1f5f9',
    tooltipBg: isDark ? '#1d3b53' : '#ffffff',
    tooltipText: isDark ? '#fdfffc' : '#0f172a',
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">Financial Overview</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Monitoring your income and spending behavior at a glance.</p>
        </div>
        {!isLoading && (
          <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 dark:bg-primary/10 border border-primary/20 dark:border-primary/20 rounded-xl text-primary dark:text-[#2ec4b6] text-xs font-black uppercase tracking-wider">
            <Info size={16} />
            <span>Last updated: Just now</span>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          <>
            <StatCard 
              title="Total Balance" 
              amount={balance} 
              icon={Wallet} 
              variant="primary"
              trend={{ value: 12.5, isUp: true }}
            />
            <StatCard 
              title="Total Income" 
              amount={totalIncome} 
              icon={ArrowUpCircle} 
              variant="success"
              trend={{ value: 8.2, isUp: true }}
            />
            <StatCard 
              title="Total Expenses" 
              amount={totalExpenses} 
              icon={ArrowDownCircle} 
              variant="danger"
              trend={{ value: 5.4, isUp: false }}
            />
          </>
        )}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Balance Over Time Chart */}
        <div className="bg-white dark:bg-[#0b253a] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm shadow-slate-100 dark:shadow-none transition-colors">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight uppercase">Balance Trend</h3>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Your total balance over time</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            {isLoading ? <div className="h-full w-full animate-shimmer rounded-xl" /> : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={balanceHistory}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2ec4b6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#2ec4b6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartColors.grid} />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: chartColors.text, fontSize: 10, fontWeight: 600 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: chartColors.text, fontSize: 10, fontWeight: 600 }}
                    tickFormatter={(val) => `$${val}`}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', background: chartColors.tooltipBg, color: chartColors.tooltipText }}
                    labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
                    itemStyle={{ fontWeight: '600', color: '#2ec4b6' }}
                    cursor={{ stroke: '#2ec4b6', strokeWidth: 2 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="balance" 
                    stroke="#2ec4b6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorBalance)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Spending by Category Chart */}
        <div className="bg-white dark:bg-[#0b253a] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm shadow-slate-100 dark:shadow-none transition-colors">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight uppercase">Spending Breakdown</h3>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Expenses grouped by category</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            {isLoading ? <div className="h-full w-full animate-shimmer rounded-xl" /> : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={spendingByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {spendingByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', background: chartColors.tooltipBg, color: chartColors.tooltipText }}
                    itemStyle={{ fontWeight: '600' }}
                    formatter={(value) => formatCurrency(value)}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    align="center" 
                    iconType="circle"
                    wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: 'bold', color: chartColors.text }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
