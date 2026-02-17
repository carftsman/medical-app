import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { scale, verticalScale } from '../../../../utils/styling';
import DoctorReviewCardWomen from './DoctorReviewCardWomen';


const DoctorReviewsWomen = () => {

    const reviews = [{
        photo: require("../../../../../assets/doctorPhoto.jpg"),
        name: 'Akshay',
        date: "2025-01-20T11:00:00.000Z",
        rating: 4,
        comments: "A doctor is a highly respected professional who dedicates their life to caring for the sick.",
    },
    {
        photo: require("../../../../../assets/doctorPhoto.jpg"),
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
                    <DoctorReviewCardWomen key={index} item={item} />
                ))}
            </View>

            <TouchableOpacity style={styles.writeReviewButton} >
                <Text style={styles.writeReviewText}>Write a Review</Text>
            </TouchableOpacity>
        </View>
    );
}

export default DoctorReviewsWomen;

const styles = StyleSheet.create({
    reviewsContainer: {
        marginTop: verticalScale(20),
    },
    reviewsHeaderText: {
        fontSize: scale(20),
        fontWeight: '600',
        paddingBottom: verticalScale(15),
    },
    writeReviewButton: {
        marginTop: verticalScale(60),
        flex: 1,
        borderWidth: 1,
        borderRadius: 18,
        borderColor: '#F47FBB',
        alignItems: 'center',
        paddingVertical: verticalScale(10),
        marginBottom: verticalScale(100),
    },
    writeReviewText: {
        fontSize: scale(16),
        fontWeight: '600',
        color: '#F47FBB',
    },
});