import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../../config/constants";
import { scale, verticalScale } from "../../../utils/styling";

import CartHeader from "../components/CartHeader";
import CartPatientCard from "../components/CartPatientCard";

const LabsCartScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <FlatList
        data={[]}
        keyExtractor={() => "key"}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <CartHeader />
            <CartPatientCard />
          </>
        }
        ListFooterComponent={null}
      />
    </SafeAreaView>
  );
};

export default LabsCartScreen;

const styles = StyleSheet.create({
  back:  {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
  },
  cart: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    marginLeft: scale(12),
  },
});