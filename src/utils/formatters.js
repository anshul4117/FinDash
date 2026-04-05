export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (dateString) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateString));
};

export const getBalanceData = (transactions) => {
  // Sort by date then group and sum
  const sorted = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  let balance = 0;
  return sorted.map((t) => {
    balance += t.type === 'income' ? t.amount : -t.amount;
    return {
      date: t.date,
      balance: balance,
    };
  });
};

export const getCategorySpending = (transactions, categories) => {
  const expenses = transactions.filter((t) => t.type === 'expense');
  const totals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  return Object.keys(totals).map((catId) => {
    const category = categories.find((c) => c.id === catId);
    return {
      name: category ? category.name : 'Unknown',
      value: totals[catId],
      color: category ? category.color : '#cbd5e1',
    };
  });
};
