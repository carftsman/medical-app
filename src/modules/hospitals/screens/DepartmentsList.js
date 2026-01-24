import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const DepartmentsList = () => {
  
  const mode = useSelector(state => state.hospital.consultation.mode);
  

  useEffect(() => {
   

    console.log('Selected consultation mode:', mode);
  }, [mode]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Departments</Text>

      <Text style={styles.modeText}>
        Mode: {mode === 'online' ? 'Online Consultation' : 'Hospital Visit'}
      </Text>

      
    </View>
  );
};

export default DepartmentsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  modeText: {
    fontSize: 14,
    color: '#2563EB',
    marginBottom: 16,
  },
});
