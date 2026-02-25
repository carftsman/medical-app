import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS } from "../../../config/constants";
import { scale, verticalScale } from "../../../utils/styling";

const CartPackageItem = ({ item, onDelete }) => {
const totalPrice = Math.round(
  (parseFloat(item.price) || 0) *
  (parseInt(item.quantity) || 1)
);

    return (
        <View style={styles.card}>

            {/* HEADER */}
            <View style={styles.row}>
                <Ionicons name="water" size={20} color={COLORS.blue} />

                <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.packageName}>{item.name}</Text>

                    <Text style={styles.testCount}>
                        {(item.testsCount ?? item.tests?.length ?? 0)} Tests Included
                    </Text>
                </View>

                <TouchableOpacity onPress={onDelete}>
                    <Ionicons name="trash-outline" size={20} color="red" />
                </TouchableOpacity>
            </View>

            {/* TEST NAMES */}
            <View style={styles.testsContainer}>
                {Array.isArray(item.tests) && item.tests.length > 0 ? (
                    item.tests.map((test, index) => (
                        <Text key={index} style={styles.testName}>
                            • {test}
                        </Text>
                    ))
                ) : (
                    <Text style={styles.testName}>No tests available</Text>
                )}

            </View>

            {/* PRICE */}
            <Text style={styles.price}>₹{totalPrice}</Text>

        </View>
    );
};

export default CartPackageItem;

const styles = StyleSheet.create({
    card: {
        borderTopWidth: 1,
        borderColor: "#E5E7EB",
        paddingVertical: verticalScale(14)
    },

    row: {
        flexDirection: "row",
        alignItems: "center"
    },

    packageName: {
        fontSize: scale(14),
        fontWeight: "600",
        color: COLORS.black
    },

    testCount: {
        fontSize: scale(12),
        color: COLORS.gray,
        marginTop: 2
    },

    testsContainer: {
        marginTop: verticalScale(8),
        paddingLeft: scale(30)
    },

    testName: {
        fontSize: scale(12),
        color: COLORS.gray,
        marginVertical: 1
    },

    price: {
        marginTop: verticalScale(8),
        fontSize: scale(15),
        fontWeight: "700",
        color: COLORS.green,
        alignSelf: "flex-start",
        paddingLeft: scale(30)
    }
});
