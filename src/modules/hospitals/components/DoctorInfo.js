import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { scale, verticalScale } from '../../../utils/styling';

const DoctorInfo = ({ image, name, specialization, experience, rating, reviewCount, patientsTreated, consultationFee }) => {
    return (
        <View>
            <View style={styles.doctorDetailsCard} >
                <View style={styles.doctorPhotoCard}>
                    <Image source={{ uri: image }} style={styles.doctorPhoto} />
                </View>
                <View>
                    <Text style={styles.doctorName} >{name}</Text>
                    <Text>
                        <Text style={styles.doctorSpecification} >{specialization} </Text>
                        <Text>|</Text>
                        <Text style={styles.doctorExperience} > {experience} Years</Text>
                    </Text>
                    <View style={styles.doctorStars} >
                        {[...Array(5)].map((_, index) => (
                            <MaterialIcons
                                key={index}
                                name={index < rating ? 'star' : 'star-border'}
                                size={15}
                                color="#FDC700"
                            />
                        ))}
                        <Text>
                            <Text style={{ fontWeight: 'bold' }}> {rating}</Text>
                            <Text> ({reviewCount} reviews)</Text>
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.statsRow} >
                <View style={styles.statItem} >
                    <View style={styles.bedIcon} >
                        <Fontisto name="bed-patient" size={26} color="#FFFFFF" />
                    </View>
                    <View>
                        <Text style={styles.statText} >Treated
                            <Text style={{ color: '#056FD2', fontWeight: '600' }}
                            > {patientsTreated}
                            </Text>
                        </Text>
                        <Text style={styles.statText} >Patients</Text>
                    </View>
                </View>
                <View style={styles.statItem} >
                    <View style={styles.bedIcon} >
                        <Fontisto name="bed-patient" size={26} color="#FFFFFF" />
                    </View>
                    <View>
                        <Text style={styles.statText}>Consultation Fee</Text>
                        <Text>
                            <FontAwesome name="rupee" size={15} color="black" />
                            <Text style={{ fontWeight: '600', fontSize: 15 }}> {consultationFee}/-</Text>
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default DoctorInfo;

const styles = StyleSheet.create({
    doctorDetailsCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(20),
    },
    doctorPhotoCard: {
        width: scale(96),
        height: verticalScale(96),
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#D2D2D2',
        overflow: 'hidden',
    },
    doctorPhoto: {
        width: scale(90),
        height: verticalScale(150),
    },
    doctorName: {
        fontSize: scale(20),
        fontWeight: '600',
        color: '#000000',
    },
    doctorSpecification: {
        fontSize: scale(15),
        fontWeight: '400',
        color: '#5C5C5C',
    },
    doctorExperience: {
        fontSize: scale(15),
        fontWeight: '500',
        color: '#05A836',
    },
    doctorStars: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statsRow: {
        flexDirection: 'row',
        gap: scale(20),
        paddingTop: verticalScale(20),
    },
    statItem: {
        flexDirection: 'row',
        gap: scale(10),
        justifyContent: 'center',
        alignItems: 'center',
    },
    statText: {
        fontWeight: '400',
        fontSize: scale(15),
    },
    bedIcon: {
        width: scale(48),
        height: verticalScale(42),
        backgroundColor: '#056FD2',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
})