import { useEffect, useState, useCallback } from 'react';
import api from '../../../api/client';

export const useHospitalDoctors = (hospitalId) => {
  const [doctors, setDoctors] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const fetchDoctors = async (isRefresh = false) => {
    try {
      isRefresh && setRefreshing(true);

      const res = await api.get(
        `/hospital/user/hospital/${hospitalId}/doctors`
      );
      setDoctors(res?.data);
      setError('');
    } catch (e) {
      console.log('Doctors API error:', e);
      setError('Failed to load doctors');
    } finally {
      isRefresh && setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [hospitalId]);

  const refetch = useCallback(() => {
    fetchDoctors(true);
  }, [hospitalId]);

  return { doctors, refreshing, error, refetch };
};
