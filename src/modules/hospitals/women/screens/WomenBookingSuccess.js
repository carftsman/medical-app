/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import { scale, verticalScale } from "../../../../utils/styling";
import api from "../../../../api/client";
import { COLORS } from "../../../../config/constants";

const WomenBookingSuccess = ({ route }) => {
    const navigation = useNavigation();
    const bookingId = route?.params?.bookingId || 30;

    const [successData, setSuccessData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (bookingId) {
            fetchSuccessDetails();
        }
    }, [bookingId]);

    const fetchSuccessDetails = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                `/appointments/${bookingId}/success`
            );

            setSuccessData(response.data);
        } catch (err) {
            setError("Unable to fetch booking success details");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <ActivityIndicator size="large" color="#056FD2" />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <View style={styles.safeArea}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    if (!successData) return null;

    return (
        <View style={styles.safeArea}>
            <View style={styles.container}>

                {/* TOP PINK */}
                <View style={styles.topPink}>
                    <View style={styles.badgeOuter}>
                        <View style={styles.badgeMid}>
                            <View style={styles.badgeInner}>
                                <AntDesign name="check" size={scale(28)} color="#F47FBB" />
                            </View>
                        </View>
                    </View>

                    <Text style={styles.successText}>Payment Successful</Text>

                    <Text style={styles.subText}>
                        ₹{successData.payment?.amountPaid}.00 has paid to{" "}
                        {successData.payment?.hospital}
                    </Text>
                </View>

                {/* CONTENT */}
                <View style={styles.content}>

                    {/* DOCTOR CARD */}
                    <View style={styles.doctorCard}>
                        <View style={styles.row}>
                            <Image
                                source={{ uri: successData.doctor?.image }}
                                style={styles.doctorImg}
                            />

                            <View style={styles.infoBox}>
                                <Text numberOfLines={1} style={styles.docName}>
                                    {successData.doctor?.name}
                                </Text>

                                <Text numberOfLines={1} style={styles.docSub}>
                                    {successData.doctor?.specialization}
                                    <Text style={styles.green}>
                                        {" | "} {successData.doctor?.experience} Years
                                    </Text>
                                </Text>

                                <View style={styles.ratingRow}>
                                    {[...Array(5)].map((_, index) => (
                                        <MaterialIcons
                                            key={index}
                                            name={index < successData?.doctor?.rating ? 'star' : 'star-border'}
                                            size={15}
                                            color="#FDC700"
                                        />
                                    ))}
                                    <Text style={styles.rating}>
                                        {successData.doctor?.rating}
                                    </Text>
                                    <Text style={styles.review}>
                                        ({successData.doctor?.reviews} reviews)
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.dateTimeBox}>
                            <View style={styles.dateTimeItem}>
                                <Feather name="calendar" size={scale(16)} color="#F47FBB" />
                                <Text style={styles.dateTimeText}>
                                    {successData.appointment?.date}
                                </Text>
                            </View>

                            <View style={styles.dateTimeItem}>
                                <Feather name="clock" size={scale(16)} color="#F47FBB" />
                                <Text style={styles.dateTimeText}>
                                    {successData.appointment?.time}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* MAP */}
                    <View style={styles.mapPreview}>
                        <Text style={styles.mapText}>Map Preview</Text>
                    </View>

                    {/* DONE */}
                    <TouchableOpacity
                        style={styles.doneBtn}
                        onPress={() =>
                            navigation.navigate("HospitalsTab", {
                                screen: "HospitalsHomeScreeen",
                            })
                        }
                    >
                        <Text style={styles.doneText}>Done</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    );
};

export default WomenBookingSuccess;

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#fff" },
    container: { flex: 1 },

    topPink: {
        height: verticalScale(260),
        backgroundColor: "#F47FBB",
        justifyContent: "center",
        alignItems: "center",
    },

    badgeOuter: {
        width: scale(110),
        height: scale(110),
        borderRadius: scale(55),
        backgroundColor: "rgba(255,255,255,0.25)",
        justifyContent: "center",
        alignItems: "center",
    },

    badgeMid: {
        width: scale(82),
        height: scale(82),
        borderRadius: scale(41),
        backgroundColor: "rgba(255,255,255,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },

    badgeInner: {
        width: scale(56),
        height: scale(56),
        borderRadius: scale(28),
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },

    successText: {
        color: "#fff",
        fontSize: scale(20),
        fontWeight: "600",
        marginTop: 10,
    },

    subText: {
        color: "#EAF3FF",
        fontSize: scale(13),
        marginTop: 6,
    },

    content: { padding: scale(16) },

    doctorCard: {
        borderRadius: scale(16),
        borderWidth: 1,
        borderColor: "#F47FBB",
        padding: scale(12),
    },

    row: { flexDirection: "row" },

    doctorImg: {
        width: scale(87),
        height: scale(87),
        borderRadius: scale(8),
    },

    infoBox: {
        marginLeft: 12,
        flex: 1
    },

    docName: {
        fontSize: scale(16),
        fontWeight: "700"
    },
    docSub: {
        fontSize: scale(13),
        color: "#666"
    },
    green: {
        color: "#1DB954",
        fontWeight: "600"
    },

    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4
    },
    star: { fontSize: scale(12) },
    rating: {
        fontSize: scale(12),
        fontWeight: "700"
    },
    review: {
        fontSize: scale(12),
        color: "#777"
    },

    dateTimeBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },

    dateTimeItem: {
        width: "48%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#F47FBB",
        backgroundColor: "#FDF2F8",
    },

    dateTimeText: {
        fontSize: scale(14),
        fontWeight: "600",
        marginLeft: 11,
        color: "#000",
    },

    mapPreview: {
        height: verticalScale(170),
        marginTop: 12,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#D0D0D0",
        justifyContent: "center",
        alignItems: "center",
    },

    mapText: {
        color: "#888"
    },

    doneBtn: {
        height: verticalScale(48),
        backgroundColor: "#F47FBB",
        borderRadius: scale(24),
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },

    doneText: {
        color: "#fff",
        fontSize: scale(16),
        fontWeight: "600"
    },
    errorText: {
        textAlign: "center",
        color: "red",
        marginTop: 20
    },
});
