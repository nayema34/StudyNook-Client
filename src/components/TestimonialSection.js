import React from 'react';

const testimonials = [
  {
    quote: 'StudyNook has completely transformed my exam prep routine. The quiet pods are super cozy and distraction-free.',
    author: 'Sarah Jenkins',
    role: 'Computer Science Major',
    rating: '5/5',
  },
  {
    quote: 'Reserving group study rooms for our capstone project meetings is seamless and reliable. Highly recommended!',
    author: 'Alex Rivera',
    role: 'Engineering Student',
    rating: '5/5',
  },
  {
    quote: 'Clean spaces, fast internet, and affordable hourly rates. The best study platform on campus.',
    author: 'Elena Rostova',
    role: 'Medical Researcher',
    rating: '5/5',
  },
];

export default function TestimonialSection() {
  return (
    <section className="py-16 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Loved by Students & Researchers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 p-6 rounded-xl relative flex flex-col justify-between">
              <p className="text-slate-300 italic mb-6">"{item.quote}"</p>
              <div>
                <div className="font-semibold text-white">{item.author}</div>
                <div className="text-xs text-indigo-400">{item.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
