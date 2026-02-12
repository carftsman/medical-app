  import React from "react";
  import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
  } from "react-native";
  import { COLORS } from "../../../config/constants";
  import { scale, verticalScale } from "../../../utils/styling";
  import Ionicons from "react-native-vector-icons/Ionicons";
  import Feather from "react-native-vector-icons/Feather";

  const LabsCartPatientCard = ({
    patientName = "John Doe",
    age = "30",
    gender = "Male",
    testName = "Blood Test",
    price = "₹400/-",
    onEditPress,
    onDeletePress,
    onAddPatient,
    onAddTests,
  }) => {
    return (
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Image
            source={{
              uri: "https://via.placeholder.com/100",
            }}
            style={styles.avatar}
          />

          <View style={styles.nameContainer}>
            <Text style={styles.name}>{patientName}</Text>
            <Text style={styles.subText}>
              {gender}, {age}
            </Text>
          </View>

          <TouchableOpacity onPress={onEditPress} style={styles.iconButton}>
            <Feather name="edit-2" size={18} color={COLORS.blue} />
          </TouchableOpacity>

          <TouchableOpacity onPress={onDeletePress} style={styles.iconButton}>
            <Ionicons name="close-circle-outline" size={20} color="red" />
          </TouchableOpacity>
        </View>

        <View style={styles.testRow}>
          <View style={styles.testLeft}>
            <Ionicons name="water-outline" size={18} color={COLORS.blue} />
            <Text style={styles.testName}>{testName}</Text>
          </View>

          <Text style={styles.price}>{price}</Text>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity onPress={onAddPatient}>
            <Text style={styles.actionText}>Add Patient</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onAddTests}>
            <Text style={styles.actionText}>Add Tests</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  export default LabsCartPatientCard;

  const styles = StyleSheet.create({
    card: {
      borderWidth: 1,
      borderColor: COLORS.blue,
      borderRadius: scale(12),
      padding: scale(12),
      backgroundColor: COLORS.white,
      marginBottom: verticalScale(16),
    },

    headerRow: {
      flexDirection: "row",
      alignItems: "center",
    },

    avatar: {
      width: scale(36),
      height: scale(36),
      borderRadius: scale(18),
      marginRight: scale(10),
    },

    nameContainer: {
      flex: 1,
    },

    name: {
      fontSize: scale(16),
      fontWeight: "600",
      color: COLORS.black,
    },

    subText: {
      fontSize: scale(12),
      color: COLORS.gray,
      marginTop: 2,
    },

    iconButton: {
      padding: scale(6),
    },

    testRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: verticalScale(12),
      paddingTop: verticalScale(12),
      borderTopWidth: 1,
      borderTopColor: "#E5E7EB",
    },

    testLeft: {
      flexDirection: "row",
      alignItems: "center",
    },

    testName: {
      marginLeft: scale(6),
      fontSize: scale(13),
      color: COLORS.black,
    },

    price: {
      fontSize: scale(14),
      fontWeight: "600",
      color: COLORS.green,
    },

    actionRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: verticalScale(12),
    },

    actionText: {
      fontSize: scale(13),
      fontWeight: "500",
      color: COLORS.blue,
    },
  });