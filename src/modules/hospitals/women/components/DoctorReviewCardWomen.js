import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { scale, verticalScale } from '../../../../utils/styling';

const DoctorReviewCardWomen = ({ item }) => {

    return (
        <View style={styles.reviewCard}>
            <View style={styles.reviewsHeader}>
                <View style={styles.reviewsPhotoName}>
                    <View style={styles.reviewPhotoCard}>
                        <Image source={item.photo} style={styles.reviewPhoto} />
                    </View>
                    <View style={{ gap: 5 }}>
                        <Text style={styles.reviewName}>{item.name}</Text>
                        <Text style={styles.reviewDate}>{item.date.split("T")[0]}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    {[...Array(5)].map((_, index) => (
                        <MaterialIcons
                            key={index}
                            name={index < item.rating ? 'star' : 'star-border'}
                            size={24}
                            color="#FF4800"
                        />
                    ))}
                </View>
            </View>
            <Text style={styles.reviewComment}>{item.comments}</Text>
        </View>
    );
}

export default DoctorReviewCardWomen;

const styles = StyleSheet.create({
    reviewCard: {
        paddingVertical: verticalScale(15),
        paddingHorizontal: scale(15),
        marginBottom: verticalScale(10),
        borderWidth: 1,
        borderRadius: 14,
        borderColor: '#00000024',
    },
    reviewsHeader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    reviewsPhotoName: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: scale(20),
    },
    reviewPhotoCard: {
        width: scale(56),
        height: verticalScale(56),
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#D2D2D2',
        overflow: 'hidden',
    },
    reviewPhoto: {
        width: scale(56),
        height: verticalScale(56),
    },
    reviewName: {
        fontSize: scale(22),
        fontWeight: '700',
        color: '#2F2A2A',
    },
    reviewDate: {
        fontSize: scale(18),
        fontWeight: '400',
        color: '#302A2A99',
    },
    reviewComment: {
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(10),
        fontSize: scale(15),
        lineHeight: verticalScale(24),
        fontWeight: '400',
        color: '#2F2A2A',
    },
})