export const showToast = (message, type = 'info') => {
  if (typeof window === 'undefined') return;
  const colors = {
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
  };

  const toast = document.createElement('div');
  toast.innerText = message;
  toast.style.position = 'fixed';
  toast.style.bottom = '24px';
  toast.style.right = '24px';
  toast.style.backgroundColor = colors[type] || colors.info;
  toast.style.color = '#FFFFFF';
  toast.style.padding = '12px 24px';
  toast.style.borderRadius = '8px';
  toast.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.3)';
  toast.style.zIndex = '9999';
  toast.style.fontSize = '14px';
  toast.style.fontWeight = '500';
  toast.style.transition = 'all 0.3s ease';

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};
