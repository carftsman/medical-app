import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { scale, verticalScale } from '../../../../utils/styling';
import {SIZES, FONT, COLORS} from '../../../../config/constants';

import Ionicons from 'react-native-vector-icons/Ionicons';
import WomenHospitalDoctorCard from './WomenHospitalDetails-DoctorCard';
import { useNavigation } from '@react-navigation/native';

const WomenHospitalDoctorList = ({ doctor, hospitalId }) => {
    const navigation = useNavigation();
    return (
        <View style={{ paddingLeft: scale(16) }}>
            <View style={styles.listHeader}>
                <Text style={styles.Hname}>Available Doctors</Text>
                <TouchableOpacity style={styles.Viewall} onPress={() => navigation.navigate('WomenDoctorsScreen', {
                    hospitalId: hospitalId,
                })}>
                    <Text style={styles.viewText}>View All</Text>
                    <Ionicons name="arrow-forward" size={scale(24)} color={COLORS.pink} />
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >

                <View style={styles.doctorRow}>

                    {doctor?.map((item, index) => (
                        <WomenHospitalDoctorCard key={index} doctor={item} />
                    ))}
                </View>

            </ScrollView>
        </View>
    );
}

export default WomenHospitalDoctorList;
const styles = StyleSheet.create({

  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  Viewall: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: scale(6),
  },

  viewText: {
    color: COLORS.pink,
    fontSize: scale(SIZES.small),
    fontFamily: FONT.medium,
  },

  Hname: {
    fontSize: scale(SIZES.large),
    fontFamily: FONT.medium,
    marginVertical: verticalScale(6),
    color: COLORS.darkgray,
  },

  doctorRow: {
    flexDirection: 'row',
    gap: scale(20),
    marginVertical: verticalScale(10),
  },

});
