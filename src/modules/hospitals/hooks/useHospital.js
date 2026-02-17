import { useEffect, useState, useCallback } from 'react';
import api from '../../../api/client';

export const useHospital = (hospitalId) => {
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const fetchDetails = async (isRefresh = false) => {
    try {
      isRefresh ? setRefreshing(true) : setLoading(true);

      const res = await api.get(
        `/hospital/user/hospitals/${hospitalId}/info`,
        {
          params: {
            latitude: "17.4483",
            longitude: "78.3915"
          }
        }
      );

      setHospital(res?.data);
      setError('');
    } catch (err) {
      console.log('Hospital API error:', err);
      setError('Failed to load hospital details');
    } finally {
      isRefresh ? setRefreshing(false) : setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [hospitalId]);

  const refetch = useCallback(() => {
    fetchDetails(true);
  }, [hospitalId]);

  return { hospital, loading, refreshing, error, refetch };
};
