import { useState, useEffect } from 'react';
import { getRooms } from '@/lib/api-client';

export function useRooms(initialFilters = {}) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getRooms(filters);
      setRooms(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch rooms');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [JSON.stringify(filters)]);

  return { rooms, loading, error, filters, setFilters, refresh: fetchRooms };
}
