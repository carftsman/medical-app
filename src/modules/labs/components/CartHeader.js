import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { scale, verticalScale } from "../../../utils/styling";
import { COLORS } from "../../../config/constants";

import { useNavigation } from "@react-navigation/native";

const CartHeader = () => {

    const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigation.goBack}>
        <Ionicons name="arrow-back" size={22} />
      </TouchableOpacity>

      <Text style={styles.title}>Your Cart</Text>
    </View>
  );
};

export default CartHeader;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: verticalScale(56),
        backgroundColor: COLORS.white,
    },
    title: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "600",
        marginLeft: scale(32),
    },


});