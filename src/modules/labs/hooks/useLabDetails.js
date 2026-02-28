import { useEffect, useState } from 'react';
import { labApi } from '../services/labApi';
import { Alert } from 'react-native';

const useLabDetails = labId => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (labId) {
      fetchLabDetails();
    }
  }, [labId]);

  const fetchLabDetails = async () => {
    try {
      const res = await labApi.getLabDetails(labId);
      setData(res?.data);
    } catch (error) {
      console.log(
        'Lab details API error:',
        error?.response?.data || error.message,
      );

      Alert.alert('Error', error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  return {
    loading,
    data,
    refreshing,
  };
};

export default useLabDetails;
