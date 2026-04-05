import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { INITIAL_TRANSACTIONS } from '../data/mockData';

export const useFinanceStore = create(
  persist(
    (set) => ({
      transactions: INITIAL_TRANSACTIONS,
      role: null, 
      isAuthenticated: false,
      filters: {
        search: '',
        category: 'all',
        type: 'all',
        sortBy: 'date',
        sortOrder: 'desc',
      },

      setRole: (role) => set({ role, isAuthenticated: true }),
      
      logout: () => set({ role: null, isAuthenticated: false }),
      
      setFilters: (newFilters) => 
        set((state) => ({ filters: { ...state.filters, ...newFilters } })),

      addTransaction: (transaction) => 
        set((state) => ({ 
          transactions: [
            { ...transaction, id: crypto.randomUUID(), date: new Date().toISOString().split('T')[0] }, 
            ...state.transactions 
          ] 
        })),

      editTransaction: (updatedTransaction) => 
        set((state) => ({
          transactions: state.transactions.map((t) => 
            t.id === updatedTransaction.id ? updatedTransaction : t
          )
        })),

      deleteTransaction: (id) => 
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id)
        })),
    }),
    {
      name: 'finance-storage', // local storage persistence
    }
  )
);
