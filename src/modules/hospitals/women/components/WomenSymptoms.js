import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { COLORS, FONT, SIZES } from "../../../../config/constants";
import { scale, verticalScale } from "../../../../utils/styling";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=400";

const WomenSymptoms = ({ data = [], loading = false }) => {

  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate("WomenHospitalsScreen", {
          symptomId: item.id,
        })
      }
    >
      <Image
        source={{
          uri: item?.imageUrl || PLACEHOLDER_IMAGE,
        }}
        style={styles.image}
      />

      <Text style={styles.label} numberOfLines={2}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderSkeleton = () => (
    <View style={styles.card}>
      <View style={styles.skeletonImage} />
      <View style={styles.skeletonText} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Symptom Access</Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={loading ? Array.from({ length: 5 }) : data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={loading ? renderSkeleton : renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default WomenSymptoms;

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(24),
  },

  title: {
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    color: COLORS.black,
    marginLeft: scale(16),
    marginBottom: verticalScale(23),
  },

  listContent: {
    paddingLeft: scale(16),
    paddingRight: scale(8),
  },

  card: {
    width: scale(100),
    marginRight: scale(14),
    alignItems: "center",
  },

  image: {
    width: scale(100),
    height: scale(80),
    borderRadius: scale(18),
    backgroundColor: COLORS.lightGray,
  },

  label: {
    marginTop: verticalScale(8),
    fontSize: SIZES.small,
    fontFamily: FONT.medium,
    color: COLORS.black,
    textAlign: "center",
  },

  skeletonImage: {
    width: scale(100),
    height: scale(80),
    borderRadius: scale(18),
    backgroundColor: COLORS.lightGray,
  },

  skeletonText: {
    width: scale(90),
    height: verticalScale(12),
    borderRadius: scale(6),
    backgroundColor: COLORS.lightGray,
    marginTop: verticalScale(10),
  },
});
