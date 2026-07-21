import React from 'react';

export function RoomCardSkeleton() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden animate-pulse">
      <div className="h-48 bg-slate-800" />
      <div className="p-5 space-y-3">
        <div className="h-6 bg-slate-800 rounded w-3/4" />
        <div className="h-4 bg-slate-800 rounded w-1/2" />
        <div className="h-4 bg-slate-800 rounded w-full" />
        <div className="flex justify-between items-center pt-4 border-t border-slate-800">
          <div className="h-6 bg-slate-800 rounded w-1/4" />
          <div className="h-8 bg-slate-800 rounded w-1/3" />
        </div>
      </div>
    </div>
  );
}

export function DetailsSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-pulse p-6">
      <div className="h-8 bg-slate-800 rounded w-1/2" />
      <div className="h-80 bg-slate-800 rounded-xl" />
      <div className="space-y-2">
        <div className="h-4 bg-slate-800 rounded w-full" />
        <div className="h-4 bg-slate-800 rounded w-5/6" />
      </div>
    </div>
  );
}
