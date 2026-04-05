import { useMemo } from 'react';
import { useFinanceStore } from '../store/useFinanceStore';

export function useFilteredTransactions() {
  const { transactions, filters } = useFinanceStore();

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((t) => {
        const matchesSearch = t.description.toLowerCase().includes(filters.search.toLowerCase());
        const matchesCategory = filters.category === 'all' || t.category === filters.category;
        const matchesType = filters.type === 'all' || t.type === filters.type;
        return matchesSearch && matchesCategory && matchesType;
      })
      .sort((a, b) => {
        const factor = filters.sortOrder === 'asc' ? 1 : -1;
        if (filters.sortBy === 'date') {
          return factor * (new Date(a.date).getTime() - new Date(b.date).getTime());
        }
        if (filters.sortBy === 'amount') {
          return factor * (a.amount - b.amount);
        }
        return 0;
      });
  }, [transactions, filters]);

  return filteredTransactions;
}
