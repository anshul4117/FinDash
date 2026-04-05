/**
 * Simple CSV Export utility
 */
export const exportToCSV = (data, filename = 'transactions.csv') => {
  if (!data || !data.length) return;

  const headers = ['Date', 'Description', 'Category', 'Amount', 'Type'];
  const rows = data.map(t => [
    t.date,
    `"${t.description.replace(/"/g, '""')}"`, // escape quotes
    t.category,
    t.amount,
    t.type
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(r => r.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
