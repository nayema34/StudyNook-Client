import React from 'react';
import { AMENITIES_LIST } from '@/config/constants';

export default function FilterSidebar({ filters, setFilters, onReset }) {
  const handleAmenityToggle = (amenity) => {
    const current = filters.amenities || [];
    const updated = current.includes(amenity)
      ? current.filter((a) => a !== amenity)
      : [...current, amenity];
    setFilters({ ...filters, amenities: updated });
  };

  return (
    <aside className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-slate-800">
        <h3 className="font-semibold text-white">Filter Rooms</h3>
        <button
          onClick={onReset}
          className="text-xs text-indigo-400 hover:underline"
        >
          Reset All
        </button>
      </div>

      {/* Floor Filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">Floor Location</label>
        <select
          value={filters.floor || ''}
          onChange={(e) => setFilters({ ...filters, floor: e.target.value })}
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
        >
          <option value="">All Floors</option>
          <option value="1st Floor">1st Floor</option>
          <option value="2nd Floor">2nd Floor</option>
          <option value="3rd Floor">3rd Floor</option>
          <option value="4th Floor">4th Floor</option>
        </select>
      </div>

      {/* Hourly Rate Range */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">Max Hourly Rate ($)</label>
        <input
          type="number"
          placeholder="e.g. 50"
          value={filters.maxRate || ''}
          onChange={(e) => setFilters({ ...filters, maxRate: e.target.value })}
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Amenities Checkboxes */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">Amenities</label>
        <div className="space-y-2 pt-1">
          {AMENITIES_LIST.map((item) => {
            const checked = (filters.amenities || []).includes(item);
            return (
              <label key={item} className="flex items-center space-x-2 text-sm text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleAmenityToggle(item)}
                  className="rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500"
                />
                <span>{item}</span>
              </label>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
