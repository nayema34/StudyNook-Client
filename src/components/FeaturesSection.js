import React from 'react';

const features = [
  {
    icon: '⚡',
    title: 'Instant Booking',
    description: 'Reserve private rooms or collaborative spaces in real-time with instant confirmation.',
  },
  {
    icon: '🎧',
    title: 'Soundproof Pods',
    description: 'Acoustically isolated study pods tailored for distraction-free deep work.',
  },
  {
    icon: '📶',
    title: 'High-Speed Fiber Wi-Fi',
    description: 'Ultra-fast gigabit internet connections in every study room.',
  },
  {
    icon: '☕',
    title: 'Complimentary Refreshments',
    description: 'Enjoy unlimited organic coffee, tea, and purified water during your session.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Why Choose StudyNook?</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Everything you need for an uninterrupted, comfortable, and productive study environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-indigo-500/40 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
