import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { scale, verticalScale } from '../../../utils/styling';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HospitalDoctorCard from './HospitalDoctorCard';
import { useNavigation } from '@react-navigation/native';

const HospitalDoctorList = ({ doctor, hospitalId}) => {
    const navigation = useNavigation();
    return (
        <View style={{paddingLeft: scale(16)}}>
            <View style={styles.listHeader}>
                <Text style={styles.Hname}>Available Doctors</Text>
                <TouchableOpacity style={styles.Viewall} onPress={() => navigation.navigate('DoctorsList', {
                    hospitalId: hospitalId,
                })}>
                    <Text style={styles.viewText}>View All</Text>
                    <Ionicons name="arrow-forward" size={scale(24)} color="#056FD2" />
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
               
                <View style={styles.doctorRow}>
                    
                    {doctor?.map((item, index) => (
                        <HospitalDoctorCard  key={index} doctor={item} />
                    ))}
                </View>
               
            </ScrollView>
        </View>
    );
}

export default HospitalDoctorList;
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
        gap: scale(6)
    },
    viewText: {
        color: "#056FD2"
    },
    Hname: {
        fontSize: scale(20),
        fontWeight: '600',
        marginVertical: verticalScale(6),
        color: '#1E293B',
    },
    doctorRow: {
        flexDirection: 'row',
        gap: 20,
        marginVertical: verticalScale(10),
    },

})