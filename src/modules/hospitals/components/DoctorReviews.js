import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import DoctorReviewCard from './DoctorReviewCard';
import { scale, verticalScale } from '../../../utils/styling';

const DoctorReviews = ({ data, reviewsLoading }) => {
    return (
        <View>
            <View style={styles.reviewsContainer} >
                <Text style={styles.reviewsHeaderText} >Reviews</Text>

                {
                    reviewsLoading &&
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <ActivityIndicator size={'large'} color={'#056FD2'} />
                    </View>
                }
                {
                    !reviewsLoading &&
                    data.map((item, index) => (
                        <DoctorReviewCard key={index} item={item} />
                    ))
                }
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