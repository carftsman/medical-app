import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { scale, verticalScale } from '../../../utils/styling';

const AboutDoctor = ({ about, languages, qualification }) => {

    const [expanded, setExpanded] = useState(false);
    const [showReadMore, setShowReadMore] = useState(false);
    const fullHeight = useRef(0);
    
    return (
        <View>
            <View style={styles.aboutDoctorContainer}>
                <Text style={styles.aboutDoctorHeading} >About Doctor</Text>

                <Text
                    style={styles.aboutDoctor}
                    numberOfLines={expanded ? undefined : 4}
                    onLayout={(e) => {
                        if (fullHeight.current > e.nativeEvent.layout.height) {
                            setShowReadMore(true);
                        }
                    }}
                >
                    {about}
                </Text>

                {showReadMore && (
                    <Pressable onPress={() => setExpanded((p) => !p)}>
                        <Text style={styles.readMore}>
                            {expanded ? "Read less" : "Read more"}
                        </Text>
                    </Pressable>
                )}
            </View>

            <View style={styles.languagesHeader}>
                <Text style={styles.languagesHeaderText}>Languages</Text>
                <Text style={styles.languagesData}>{languages?.join("    ")}</Text>
            </View>

            <View style={styles.qualificationHeader}>
                <Text style={styles.qualificationHeaderText}>Qualification</Text>
                <Text style={styles.qualificationData}>{qualification}</Text>
            </View>
        </View>
    );
}

export default AboutDoctor;

const styles = StyleSheet.create({
    aboutDoctorContainer: {
        marginTop: verticalScale(20),
    },
    aboutDoctorHeading: {
        fontSize: scale(20),
        fontWeight: '600',
        paddingBottom: verticalScale(15),
    },
    aboutDoctor: {
        fontSize: scale(16),
        fontWeight: '400',
    },
    readMore: {
        color: "#056FD2",
        fontSize: scale(15),
        fontWeight: '500',
    },
    languagesHeader: {
        marginTop: verticalScale(20),
    },
    languagesHeaderText: {
        fontSize: scale(18),
        fontWeight: '600',
        paddingBottom: verticalScale(15),
    },
    languagesData: {
        fontSize: scale(16),
        fontWeight: '400',
    },
    qualificationHeader: {
        marginTop: verticalScale(20),
    },
    qualificationHeaderText: {
        fontSize: scale(18),
        fontWeight: '600',
        paddingBottom: verticalScale(15),
    },
    qualificationData: {
        fontSize: scale(16),
        fontWeight: '400',
    }
})