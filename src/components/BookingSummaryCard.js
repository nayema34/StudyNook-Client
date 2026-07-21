import React from 'react';
import Badge from './ui/Badge';
import Button from './ui/Button';

export default function BookingSummaryCard({ booking, onCancel }) {
  const { _id, roomId, date, startTime, endTime, totalCost, status } = booking;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 hover:border-slate-700 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-lg font-bold text-white">{roomId?.name || 'Study Room'}</h4>
          <p className="text-xs text-slate-400">Floor: {roomId?.floor || 'N/A'}</p>
        </div>
        <Badge variant={status === 'cancelled' ? 'warning' : 'success'}>
          {status || 'confirmed'}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
        <div>
          <span className="text-slate-500 block">Date:</span>
          <span className="text-slate-200 font-medium">{date}</span>
        </div>
        <div>
          <span className="text-slate-500 block">Time Slot:</span>
          <span className="text-slate-200 font-medium">{startTime} - {endTime}</span>
        </div>
        <div className="col-span-2 pt-2 border-t border-slate-800/60 flex justify-between items-center">
          <span className="text-slate-500">Total Paid:</span>
          <span className="text-indigo-400 font-bold text-sm">${totalCost}</span>
        </div>
      </div>

      {status !== 'cancelled' && onCancel && (
        <Button
          variant="danger"
          onClick={() => onCancel(_id)}
          className="w-full text-xs py-2"
        >
          Cancel Reservation
        </Button>
      )}
    </div>
  );
}
