import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DoctorReviewCard from './DoctorReviewCard';
import { scale, verticalScale } from '../../../utils/styling';

const DoctorReviews = () => {

    const reviews = [{
        photo: require("../../../../assets/doctorPhoto.jpg"),
        name: 'Akshay',
        date: "2025-01-20T11:00:00.000Z",
        rating: 4,
        comments: "A doctor is a highly respected professional who dedicates their life to caring for the sick.",
    },
    {
        photo: require("../../../../assets/doctorPhoto.jpg"),
        name: 'Sathvika',
        date: "2025-01-10T11:00:00.000Z",
        rating: 5,
        comments: "A doctor is a highly respected professional who dedicates their life to caring for the sick.",
    }
    ];

    return (
        <View>
            <View style={styles.reviewsContainer} >
                <Text style={styles.reviewsHeaderText} >Reviews</Text>

                {reviews.map((item, index) => (
                    <DoctorReviewCard key={index} item={item} />
                ))}
            </View>
        </View>
    );
}

export default DoctorReviews;

const styles = StyleSheet.create({
    reviewsContainer: {
        marginTop: verticalScale(20),
        marginBottom: verticalScale(140),
    },
    reviewsHeaderText: {
        fontSize: scale(20),
        fontWeight: '600',
        paddingBottom: verticalScale(15),
    },
});