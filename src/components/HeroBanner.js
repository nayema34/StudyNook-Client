import React from 'react';
import Link from 'next/link';

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-b from-indigo-950/40 via-slate-950 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 mb-6">
          Premium Study Spaces On-Demand
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
          Reserve Your Ideal <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            Quiet Study Nook
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-400 mb-8">
          Elevate your productivity with high-speed Wi-Fi, ergonomic seating, soundproof focus pods, and collaborative lab spaces.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/rooms"
            className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/30 transition-all duration-200"
          >
            Explore All Rooms
          </Link>
          <Link
            href="/about"
            className="px-8 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold transition-all duration-200"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
