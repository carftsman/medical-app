import { useEffect, useState } from 'react';
import api from '../../../api/client';

export const useHospitalDoctors = (hospitalId) => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get(
          `/hospital/user/hospital/${hospitalId}/doctors`
        );
        setDoctors(res?.data);
      } catch (e) {
        console.log('Doctors API error:', e);
      }
    };

    fetchDoctors();
  }, [hospitalId]);

  return { doctors };
};
