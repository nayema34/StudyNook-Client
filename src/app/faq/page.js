'use client';
import React, { useState } from 'react';
import MainLayout from '@/components/MainLayout';

const faqs = [
  {
    q: 'How do I reserve a study room?',
    a: 'Simply browse available rooms on the Rooms page, select your preferred date and time slot, and click Book Now to confirm your reservation.',
  },
  {
    q: 'Can I cancel or modify my reservation?',
    a: 'Yes! You can view and cancel any active reservation under your My Bookings dashboard.',
  },
  {
    q: 'What amenities are included with each room?',
    a: 'All rooms include high-speed Wi-Fi and power outlets. Specific amenities like whiteboards, monitors, and coffee machines are listed on each room detail page.',
  },
  {
    q: 'Is there a limit on how many hours I can book?',
    a: 'You can book study rooms anywhere from 1 hour up to full day slots based on room availability.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-slate-400">Everything you need to know about reserving study nooks on our platform.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full text-left p-5 text-white font-semibold flex justify-between items-center hover:bg-slate-800/50 transition-colors"
              >
                <span>{item.q}</span>
                <span className="text-indigo-400">{openIndex === idx ? '−' : '+'}</span>
              </button>
              {openIndex === idx && (
                <div className="p-5 pt-0 text-sm text-slate-400 border-t border-slate-800/40">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
