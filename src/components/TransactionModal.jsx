import { useState, useEffect } from 'react';
import { X, Plus, Wallet, ShoppingBag, Utensils, Car, Zap, Film, Briefcase, PlusCircle } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORY_ICONS = {
  Utensils, 
  Car, 
  ShoppingBag, 
  Zap, 
  Film, 
  Briefcase, 
  PlusCircle
};

export default function TransactionModal({ isOpen, onClose, onSave, transaction = null }) {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'food',
    type: 'expense',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (transaction) {
      setFormData(transaction);
    } else {
      setFormData({
        description: '',
        amount: '',
        category: 'food',
        type: 'expense',
        date: new Date().toISOString().split('T')[0],
      });
    }
  }, [transaction, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      amount: parseFloat(formData.amount),
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white dark:bg-[#0b253a] rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
        >
          <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
              {transaction ? 'Edit Transaction' : 'New Transaction'}
            </h3>
            <button 
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Type Selector */}
            <div className="flex p-1 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'expense' })}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                  formData.type === 'expense' 
                    ? 'bg-white dark:bg-slate-700 text-[#ff9f1c] shadow-sm ring-1 ring-black/5' 
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'income' })}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                  formData.type === 'income' 
                    ? 'bg-white dark:bg-slate-700 text-[#2ec4b6] shadow-sm ring-1 ring-black/5' 
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                Income
              </button>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Description</label>
              <input
                required
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="e.g. Grocery Store"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-slate-800 focus:border-primary transition-all text-slate-900 dark:text-white font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Amount */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Amount ($)</label>
                <input
                  required
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="0.00"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-slate-800 focus:border-primary transition-all text-slate-900 dark:text-white font-medium"
                />
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Date</label>
                <input
                  required
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-slate-800 focus:border-primary transition-all text-slate-900 dark:text-white font-medium"
                />
              </div>
            </div>

            {/* Category Grid */}
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Category</label>
              <div className="grid grid-cols-4 gap-2">
                {CATEGORIES.map((cat) => {
                  const Icon = CATEGORY_ICONS[cat.icon] || PlusCircle;
                  const isSelected = formData.category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat.id })}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-300 ${
                        isSelected 
                          ? 'bg-primary border-primary scale-105 shadow-lg shadow-primary/20' 
                          : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-400 hover:border-slate-300 hover:text-slate-600 shadow-sm'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg mb-1 ${isSelected ? 'bg-white/20' : 'bg-slate-50 dark:bg-slate-900'}`} style={{ color: isSelected ? '#ffffff' : cat.color }}>
                        <Icon size={18} strokeWidth={isSelected ? 2.5 : 2} />
                      </div>
                      <span className={`text-[10px] font-black truncate w-full text-center tracking-tight ${isSelected ? 'text-white' : 'text-slate-500'}`}>
                        {cat.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-black uppercase tracking-wider rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-none px-8 py-3 bg-primary text-white font-black uppercase tracking-wider rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 active:scale-95 flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                <span>{transaction ? 'Update' : 'Add'} Entry</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
