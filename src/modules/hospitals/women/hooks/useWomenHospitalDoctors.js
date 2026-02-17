import { useEffect, useState } from 'react';
import api from '../../../../api/client';

export const useWomenHospitalDoctors = (hospitalId) => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get(
          `/hospital/user/hospital/${hospitalId}/doctors`,
          {
            params: {
      women: true,
          }}
        );

        console.log("DOCTORS FULL RESPONSE:", res?.data);
        console.log("DOCTORS ARRAY:", res?.data?.data);

        setDoctors(res?.data?.data || []);  // ✅ important fix
      } catch (e) {
        console.log('Doctors API error:', e);
      }
    };

    fetchDoctors();
  }, [hospitalId]);

  return { doctors };
};
