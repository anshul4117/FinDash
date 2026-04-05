import { useState, useEffect } from 'react';
import { useFinanceStore } from '../store/useFinanceStore';
import { CATEGORIES } from '../data/mockData';
import { 
  Search, 
  ArrowUpDown, 
  Plus, 
  Pencil, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  Download,
  Utensils, Car, ShoppingBag, Zap, Film, Briefcase, PlusCircle
} from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/formatters';
import { exportToCSV } from '../utils/csvExport';
import { useFilteredTransactions } from '../hooks/useFilteredTransactions';
import TransactionModal from '../components/TransactionModal';
import { RowSkeleton } from '../components/Skeleton';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORY_ICONS = {
  food: Utensils,
  transport: Car,
  shopping: ShoppingBag,
  bills: Zap,
  entertainment: Film,
  salary: Briefcase,
  other: PlusCircle,
};

export default function Transactions() {
  const { 
    role, 
    filters, 
    setFilters, 
    addTransaction, 
    editTransaction, 
    deleteTransaction 
  } = useFinanceStore();

  const filteredTransactions = useFilteredTransactions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleAdd = (data) => {
    addTransaction(data);
  };

  const handleEdit = (data) => {
    editTransaction(data);
    setEditingTransaction(null);
  };

  const openEditModal = (t) => {
    if (role !== 'admin') return;
    setEditingTransaction(t);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (role !== 'admin') return;
    if (confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const handleExport = () => {
    exportToCSV(filteredTransactions, `transactions_${new Date().toISOString().split('T')[0]}.csv`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">Transactions</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium font-sans">Manage and monitor your financial activities.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
            onClick={handleExport}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-[#0b253a] border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-[#1d3b53] transition-all active:scale-95 shadow-sm"
            title="Export to CSV"
          >
            <Download size={20} />
            <span className="sm:hidden lg:inline">Export CSV</span>
          </button>
          {role === 'admin' && (
            <button 
              onClick={() => {
                setEditingTransaction(null);
                setIsModalOpen(true);
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95"
            >
              <Plus size={20} />
              <span>New Entry</span>
            </button>
          )}
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-[#0b253a] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row gap-4 items-center transition-colors">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search by description..." 
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-slate-800 focus:border-primary transition-all dark:text-white font-medium"
          />
        </div>
        
        <div className="flex flex-wrap gap-3 w-full lg:w-auto">
          <select 
            value={filters.category}
            onChange={(e) => setFilters({ category: e.target.value })}
            className="flex-1 lg:flex-none px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-bold rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          
          <button 
            onClick={() => setFilters({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' })}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-bold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <ArrowUpDown size={16} />
            <span>{filters.sortOrder === 'asc' ? 'Oldest' : 'Newest'}</span>
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white dark:bg-[#0b253a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 transition-colors">
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.1em]">Date</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.1em]">Description</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.1em]">Category</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.1em]">Amount</th>
                {role === 'admin' && <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.1em] text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {isLoading ? (
                [...Array(5)].map((_, i) => <RowSkeleton key={i} />)
              ) : (
                <AnimatePresence mode="popLayout">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((t) => {
                      const category = CATEGORIES.find(c => c.id === t.category);
                      const Icon = CATEGORY_ICONS[t.category] || PlusCircle;
                      return (
                        <motion.tr 
                          key={t.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          layout
                          className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors group"
                        >
                          <td className="px-6 py-4">
                            <span className="text-sm font-bold text-slate-600 dark:text-slate-400 tracking-tight">{formatDate(t.date)}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{t.description}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div 
                                className="p-1.5 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm"
                                style={{ backgroundColor: `${category?.color}11`, color: category?.color }}
                              >
                                <Icon size={14} />
                              </div>
                              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{category?.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`text-sm font-bold tracking-tight ${
                              t.type === 'income' ? 'text-[#2ec4b6]' : 'text-[#ff9f1c]'
                            }`}>
                              {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                            </span>
                          </td>
                          {role === 'admin' && (
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                  onClick={() => openEditModal(t)}
                                  className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                                  title="Edit"
                                >
                                  <Pencil size={16} />
                                </button>
                                <button 
                                  onClick={() => handleDelete(t.id)}
                                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                                  title="Delete"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          )}
                        </motion.tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={role === 'admin' ? 5 : 4} className="px-6 py-20 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="h-16 w-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-600">
                            <Search size={32} />
                          </div>
                          <h4 className="text-lg font-bold text-slate-900 dark:text-white">No transactions found</h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Try adjusting your filters or search query.</p>
                          <button 
                            onClick={() => setFilters({ search: '', category: 'all', type: 'all' })}
                            className="text-primary font-bold text-sm hover:underline"
                          >
                            Clear all filters
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <TransactionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={editingTransaction ? handleEdit : handleAdd}
        transaction={editingTransaction}
      />
    </div>
  );
}
