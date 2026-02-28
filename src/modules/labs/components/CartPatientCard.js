import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../config/constants';
import { scale, verticalScale } from '../../../utils/styling';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CartPatientCard = ({
  patientName,
  age,
  gender,
  packageName,
  tests = [],
  testsCount,
  quantity,
  price,
  onDeletePress,
  onAddPatient,
}) => {
  const [expanded, setExpanded] = useState(false);
  const visibleTests = expanded ? tests : tests.slice(0, 2);

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.headerRow}>
        {}
        <Image
          source={{
            uri: 'https://static.vecteezy.com/system/resources/thumbnails/036/280/650/small_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg',
          }}
          style={styles.avatar}
        />

        <View style={styles.nameContainer}>
          <Text style={styles.name}>{patientName}</Text>
          <Text style={styles.subText}>
            {gender}, {age}
          </Text>
        </View>

        <TouchableOpacity onPress={onDeletePress}>
          <Ionicons name="trash-outline" size={22} color="red" />
        </TouchableOpacity>
      </View>

      {/* Package Title */}
      <Text style={styles.packageTitle}>{packageName}</Text>
      <Text style={styles.testCount}>{testsCount} Tests Included</Text>

      {/* Tests */}
      <View style={{ marginTop: 6 }}>
        {visibleTests.map((test, index) => (
          <Text key={index} style={styles.testItem}>
            • {test}
          </Text>
        ))}

        {tests.length > 2 && (
          <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            <Text style={styles.viewMore}>
              {expanded ? 'Show Less' : `View All ${tests.length} Tests`}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Footer */}
      <View style={styles.footerRow}>
        <TouchableOpacity onPress={onAddPatient}>
          <Text style={styles.actionText}>Add Patient</Text>
        </TouchableOpacity>

        {/* <Text style={styles.quantity}>Qty: {quantity}</Text> */}
        <Text style={styles.price}>{price}</Text>
      </View>
    </View>
  );
};

export default CartPatientCard;

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
    flexDirection: 'row',
    alignItems: 'center',
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
    fontWeight: '600',
    color: COLORS.black,
  },

  subText: {
    fontSize: scale(12),
    color: COLORS.gray,
  },

  packageTitle: {
    fontSize: scale(15),
    fontWeight: '600',
    marginTop: verticalScale(10),
    color: COLORS.black,
  },

  testCount: {
    fontSize: scale(12),
    color: COLORS.gray,
  },

  testItem: {
    fontSize: scale(13),
    color: '#374151',
    marginVertical: 2,
  },

  viewMore: {
    color: COLORS.blue,
    marginTop: 4,
    fontSize: scale(13),
  },

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(12),
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: verticalScale(10),
  },

  actionText: {
    color: COLORS.blue,
    fontWeight: '500',
  },

  quantity: {
    color: COLORS.gray,
  },

  price: {
    fontSize: scale(14),
    fontWeight: '600',
    color: COLORS.green,
  },
});
