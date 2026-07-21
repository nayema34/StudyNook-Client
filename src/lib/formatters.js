export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount || 0);
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const calculateTotalHours = (startTime, endTime) => {
  if (!startTime || !endTime) return 1;
  const [startH] = startTime.split(':').map(Number);
  const [endH] = endTime.split(':').map(Number);
  const diff = endH - startH;
  return diff > 0 ? diff : 1;
};
