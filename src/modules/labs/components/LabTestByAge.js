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
import { scale, verticalScale } from "../../../utils/styling";

/* AGE GROUPS */
const AGE_GROUPS = [
  {
    label: "10–20",
    minAge: 10,
    maxAge: 20,
    image: require("../../../../assets/10-20.png"),
  },
  {
    label: "20–40",
    minAge: 20,
    maxAge: 40,
    image: require("../../../../assets/20-40.png"),
  },
  {
    label: "40–60",
    minAge: 40,
    maxAge: 60,
    image: require("../../../../assets/40-60.png"),
  },
  {
    label: "60+",
    minAge: 60,
    maxAge: 100,
    image: require("../../../../assets/60+.png"),
  },
];

const LabTestByAge = ({ labId }) => {
  const navigation = useNavigation();

  const onAgePress = (minAge, maxAge) => {
    if (!labId) {
      console.log("Lab ID missing");
      return;
    }

    navigation.navigate("PackagesScreen", {
      labId,
      minAge,
      maxAge,
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => onAgePress(item.minAge, item.maxAge)}
    >
      <View style={styles.imageWrapper}>
        <Image source={item.image} style={styles.image} />
      </View>

      <Text style={styles.label}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Lab Tests by Age</Text>

      <FlatList
        horizontal
        data={AGE_GROUPS}
        keyExtractor={(item) => item.label}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default LabTestByAge;

/* STYLES */

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(22),
  },

  heading: {
    fontSize: scale(16),
    fontWeight: "700",
    color: "#222",
    marginBottom: verticalScale(12),
  },

  card: {
    width: scale(80),
    alignItems: "center",
    marginRight: scale(14),
  },

  imageWrapper: {
    width: scale(64),
    height: scale(64),
    borderRadius: scale(32),
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    overflow: "hidden",
    marginBottom: verticalScale(6),
  },

  image: {
    width: scale(64),
    height: scale(64),
    borderRadius: scale(32),
    resizeMode: "cover",
  },

  label: {
    fontSize: scale(11),
    fontWeight: "600",
    color: "#444",
    textAlign: "center",
  },
});