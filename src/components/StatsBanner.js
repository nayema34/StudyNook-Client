import React from 'react';

const stats = [
  { label: 'Active Study Pods', value: '45+' },
  { label: 'Registered Students', value: '3,200+' },
  { label: 'Hours Booked', value: '18,500+' },
  { label: 'Average User Rating', value: '4.9 / 5' },
];

export default function StatsBanner() {
  return (
    <section className="py-12 bg-indigo-950/20 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-400">{stat.value}</div>
              <div className="text-sm font-medium text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
