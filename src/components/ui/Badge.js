import React from 'react';

export default function Badge({ children, variant = 'primary', className = '' }) {
  const variants = {
    primary: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
    secondary: 'bg-slate-700/50 text-slate-300 border border-slate-600/30',
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm ${variants[variant] || variants.primary} ${className}`}>
      {children}
    </span>
  );
}
