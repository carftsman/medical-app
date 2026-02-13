import React from 'react';
import { View, Text, Image, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { scale, verticalScale } from '../../../../utils/styling';



const DoctorsHospitalDetailsWomen = ({ image, name, place, latitude, longitude, days, startTime, endTime }) => {
    const rating = 4.3;
    const hospitalRatingStars = Math.round(rating);

    const openGoogleMaps = () => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`;

        Linking.openURL(url);
    };

    const formatTime = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);

    return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
};


    return (
        <View style={styles.hospitalDetailsHeader}>
            <Text style={styles.hospitalDetailsHeaderText} >Hospital Details</Text>

            <View style={styles.hospitalCard} >
                <View style={styles.hospitalInfoCard}>
                    <View style={styles.hospitalPhotoCard} >
                        <Image source={{ uri: image }} style={styles.hospitalPhoto} />
                    </View>
                    <View style={styles.hospitalDetails}>
                        <Text style={styles.hospitalName}>{name}</Text>
                        <Text style={styles.hospitalLocation}>
                            <Text><FontAwesome name="location-arrow" size={15} color="#F47FBB" /> 2km </Text>
                            |
                            <Ionicons name="location-outline" size={15} color="#FF0000" /><Text> {place}</Text>
                        </Text>
                        <View style={styles.hospitalRatingStars}>
                            {[...Array(5)].map((_, index) => (
                                <MaterialIcons
                                    key={index}
                                    name={index < hospitalRatingStars ? 'star' : 'star-border'}
                                    size={20}
                                    color="#FDC700"
                                />
                            ))}
                            <Text style={styles.ratingValue}> {rating}</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.timingsText} >Timings</Text>
                    <View style={styles.timingsCards}>
                        <View style={styles.timingsCard}>
                            <Text style={styles.timingsTextDays}>{days}</Text>
                            <Text style={styles.timingsTextTime}> {formatTime(startTime)} - {formatTime(endTime)}</Text>
                        </View>
                        <View style={styles.timingsCard}>
                            <Text style={styles.timingsTextDays}>Sun</Text>
                            <Text style={styles.timingsTextTime}>closed</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.mapContainer}>
                    <Image style={styles.mapImage} source={require('../../../../../assets/Map.png')}/>
                </View>

                <TouchableOpacity style={styles.getDirectionsButton} onPress={openGoogleMaps}>
                    <Text style={styles.getDirectionsText} >Get Directions</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default DoctorsHospitalDetailsWomen;

const styles = StyleSheet.create({
    hospitalDetailsHeader: {
        marginTop: verticalScale(20),
    },
    hospitalDetailsHeaderText: {
        fontSize: scale(20),
        fontWeight: '600',
        paddingBottom: verticalScale(15),
    },
    hospitalCard: {
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: scale(15),
        paddingVertical: verticalScale(15),
    },
    hospitalInfoCard: {
        gap: scale(15),
        flexDirection: 'row',
        alignItems: 'center',
    },
    hospitalPhotoCard: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#FFFFFF',
        overflow: 'hidden',
    },
    hospitalPhoto: {
        width: scale(120),
        height: verticalScale(80),
    },
    hospitalDetails: {
        gap: verticalScale(2),
    },
    hospitalName: {
        fontSize: scale(18),
        fontWeight: '600',
    },
    hospitalLocation: {
        fontSize: scale(15),
    },
    hospitalRatingStars: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingValue: {
        fontSize: 18,
    },
    timingsText: {
        fontSize: scale(16),
        fontWeight: '500',
        paddingVertical: verticalScale(10),
    },
    timingsCards: {
        flexDirection: 'row',
        gap: scale(10),
    },
    timingsCard: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#F47FBB',
        borderRadius: 8,
        paddingHorizontal: scale(15),
        paddingVertical: verticalScale(10),
    },
    timingsTextDays: {
        fontSize: scale(16),
        fontWeight: '500',
    },
    timingsTextTime: {
        fontSize: scale(12),
        fontWeight: 'bold',
        color: '#fa0584',
    },
    mapContainer: {
        paddingVertical: verticalScale(15),
        marginBottom: verticalScale(10),
        width: scale('100%'),
        height: verticalScale(180),
    },
    mapImage: {
        width: scale('100%'),
        height: verticalScale(160),
    },
    getDirectionsButton: {
        alignItems: 'center',
        paddingVertical: verticalScale(10),
        borderWidth: 1,
        borderRadius: 18,
        backgroundColor: '#F47FBB',
        borderColor: '#F47FBB',
    },
    getDirectionsText: {
        color: '#FFFFFF',
        fontSize: scale(16),
        fontWeight: '600',
    },
})