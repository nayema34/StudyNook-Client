import React from 'react';
import MainLayout from '@/components/MainLayout';

export default function PrivacyPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-16 text-slate-300 space-y-6">
        <h1 className="text-3xl font-extrabold text-white">Privacy Policy & Terms</h1>
        <p className="text-sm text-slate-400">Last updated: July 2026</p>

        <section className="space-y-3 bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <h2 className="text-xl font-bold text-white">1. Information Collection</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            We collect account details (name, email address, profile picture) to facilitate study room reservations and profile personalization.
          </p>
        </section>

        <section className="space-y-3 bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <h2 className="text-xl font-bold text-white">2. Room Reservation Data</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Booking dates, selected time slots, and special requests are securely stored to ensure seamless access to booked facilities.
          </p>
        </section>

        <section className="space-y-3 bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <h2 className="text-xl font-bold text-white">3. Security Standards</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            All authentication credentials and session tokens are encrypted using industry-standard protocols.
          </p>
        </section>
      </div>
    </MainLayout>
  );
}
