import { useEffect, useState } from 'react';
import api from '../../../api/client';

export const useHospital = (hospitalId) => {
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await api.get(
          `/hospital/user/hospitals/${hospitalId}/info`, {
            params:{
              // hospitalId,
              latitude:"17.4483",
              longitude:"78.3915"
            }
          }
        );
        setHospital(res?.data);
        console.log("hospitals response",res);
      } catch (err) {
  console.log('Hospital API error:', err);
  setError('Failed to load hospital details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [hospitalId]);

  return { hospital, loading, error };
};
