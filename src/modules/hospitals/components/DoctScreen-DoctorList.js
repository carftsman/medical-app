import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { scale, verticalScale } from '../../../utils/styling';
import { COLORS, FONT } from '../../../config/constants';
import DoctorSkeleton from './DoctScreen-Skeleton';
import DoctorCard from '../components/DoctorCard';

const DoctList = ({
  loading,
  doctorsData,
  search,
  error
}) => {
  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <FlatList
          data={[1, 2, 3, 4, 5, 6]}
          keyExtractor={(index) => index.toString()}
          renderItem={() => <DoctorSkeleton />}

        />
          ) : error ? (
    <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={doctorsData}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <DoctorCard doctor={item} />
            // imageUrl={item.imageUrl}
            // doctorName={item.doctorName}
            // specialization={item.specialization}
            // rating={item.rating}
            // hospitalName={item.hospitalName}
            // experience={item.experience}
            // fee={item.fee}
            // availableDate={item.availableDate}
            // availableTime={item.availableTime}
          )}
          ListEmptyComponent={
            search.trim() ? (
              <Text style={styles.noResultText}>No Doctors found</Text>
            ) : (
              <Text style={styles.noResultText}>No Doctors available</Text>
            )
          }
        />
      )}
    </View>
  );
};

export default DoctList;

const styles = StyleSheet.create({
  /* No Results Text */
  noResultText: {
    textAlign: 'center',
    marginTop: verticalScale(20),
    fontSize: scale(16),
    color: COLORS.gray,
    fontFamily: FONT.medium,
  },
  errorText: {
  textAlign: 'center',
  marginTop: verticalScale(20),
  fontSize: scale(16),
  color: 'red',
  fontFamily: FONT.medium,
},

});
