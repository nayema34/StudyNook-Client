import { useState, useEffect } from 'react';
import { getUserBookings, cancelBooking } from '@/lib/api-client';

export function useBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUserBookings();
      setBookings(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelBooking(id);
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: 'cancelled' } : b))
      );
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return { bookings, loading, error, cancelBooking: handleCancel, refresh: fetchBookings };
}
