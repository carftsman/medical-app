// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// import api from '../../../api/client';
// import { COLORS, SIZES } from '../../../config/constants';
// import { scale, verticalScale } from '../../../utils/styling';

// const ReviewCart = ({ navigation, route }) => {
//   const bookingIds = route?.params?.bookingIds;

//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchSummary();
//   }, []);

//   const fetchSummary = async () => {
//     try {
//       const res = await api.get('/labs/cart/summary', {
//         params: {
//           bookingIds: bookingIds.join(','),
//         },
//       });

//       setData(res.data);
//     } catch (error) {
//       console.log('Summary Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color={COLORS.primary} />
//       </View>
//     );
//   }

//   if (!data) return null;

//   const { user, lab, packages, billSummary } = data;

//   return (
//     <View style={styles.container}>
//       {/* HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <AntDesign name="arrowleft" size={scale(22)} color={COLORS.black} />
//         </TouchableOpacity>

//         <Text style={styles.headerTitle}>Cart</Text>
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* USER CARD */}
//         <View style={styles.card}>
//           <Text style={styles.userName}>{user.fullName}</Text>
//           <Text style={styles.userPhone}>+91 {user.phone}</Text>
//         </View>

//         {/* LAB CARD */}
//         <View style={styles.card}>
//           <View style={styles.rowBetween}>
//             <Text style={styles.labName}>{lab.name}</Text>
//             <Text style={styles.rating}>⭐ {lab.rating}</Text>
//           </View>

//           <Text style={styles.address}>
//             {lab.address}, {lab.city}, {lab.state}
//           </Text>

//           <Image
//             source={{ uri: lab.imageUrl }}
//             style={styles.labImage}
//             resizeMode="contain"
//           />
//         </View>

//         {/* PACKAGE LIST */}
//         <View style={styles.card}>
//           {packages.map(item => (
//             <View key={item.id} style={styles.packageRow}>
//               <Text style={styles.packageName}>{item.name}</Text>
//               <Text style={styles.price}>₹{item.price}</Text>
//             </View>
//           ))}
//         </View>

//         {/* BILL SUMMARY */}
//         <View style={styles.card}>
//           <Text style={styles.billTitle}>Bill Summary</Text>

//           <View style={styles.rowBetween}>
//             <Text style={styles.label}>Total MRP</Text>
//             <Text style={styles.value}>₹{billSummary.totalMRP}</Text>
//           </View>

//           <View style={styles.rowBetween}>
//             <Text style={styles.label}>Home Collection Charges</Text>
//             <Text style={styles.value}>₹{billSummary.homeCollection}</Text>
//           </View>

//           <View style={styles.rowBetween}>
//             <Text style={styles.label}>Booking Fee</Text>
//             <Text style={styles.value}>₹{billSummary.bookingFee}</Text>
//           </View>

//           <View style={styles.rowBetween}>
//             <Text style={styles.label}>Platform Fee</Text>
//             <Text style={styles.value}>₹{billSummary.platformFee}</Text>
//           </View>

//           <View style={styles.divider} />

//           <View style={styles.rowBetween}>
//             <Text style={styles.totalLabel}>Total Amount</Text>
//             <Text style={styles.totalAmount}>
//               ₹{billSummary.totalAmount}
//             </Text>
//           </View>
//         </View>
//       </ScrollView>

//       {/* PAY BUTTON */}
//       <TouchableOpacity style={styles.payButton}>
//         <Text style={styles.payText}>Pay Now</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default ReviewCart;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.lightGray,
//   },

//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: scale(16),
//     paddingVertical: verticalScale(14),
//     backgroundColor: COLORS.white,
//   },

//   headerTitle: {
//     fontSize: scale(SIZES.large),
//     fontWeight: '600',
//     marginLeft: scale(16),
//     color: COLORS.black,
//   },

//   card: {
//     backgroundColor: COLORS.white,
//     marginHorizontal: scale(16),
//     marginTop: verticalScale(14),
//     padding: scale(16),
//     borderRadius: scale(12),
//   },

//   userName: {
//     fontSize: scale(SIZES.medium),
//     fontWeight: '600',
//     color: COLORS.black,
//   },

//   userPhone: {
//     marginTop: verticalScale(4),
//     color: COLORS.gray,
//     fontSize: scale(SIZES.small),
//   },

//   labName: {
//     fontSize: scale(SIZES.medium),
//     fontWeight: '600',
//     color: COLORS.black,
//   },

//   rating: {
//     fontSize: scale(SIZES.small),
//     color: COLORS.green,
//   },

//   address: {
//     marginTop: verticalScale(6),
//     fontSize: scale(SIZES.small),
//     color: COLORS.gray,
//   },

//   labImage: {
//     width: '100%',
//     height: verticalScale(100),
//     marginTop: verticalScale(12),
//   },

//   packageRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: verticalScale(10),
//   },

//   packageName: {
//     flex: 1,
//     fontSize: scale(SIZES.small),
//     color: COLORS.black,
//   },

//   price: {
//     fontWeight: '600',
//     fontSize: scale(SIZES.small),
//     color: COLORS.black,
//   },

//   billTitle: {
//     fontSize: scale(SIZES.medium),
//     fontWeight: '600',
//     marginBottom: verticalScale(12),
//   },

//   rowBetween: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: verticalScale(8),
//   },

//   label: {
//     fontSize: scale(SIZES.small),
//     color: COLORS.gray,
//   },

//   value: {
//     fontSize: scale(SIZES.small),
//     color: COLORS.black,
//   },

//   divider: {
//     height: 1,
//     backgroundColor: COLORS.lightGray,
//     marginVertical: verticalScale(12),
//   },

//   totalLabel: {
//     fontSize: scale(SIZES.medium),
//     fontWeight: '700',
//   },

//   totalAmount: {
//     fontSize: scale(SIZES.medium),
//     fontWeight: '700',
//     color: COLORS.primary,
//   },

//   payButton: {
//     backgroundColor: COLORS.primary,
//     margin: scale(16),
//     paddingVertical: verticalScale(14),
//     borderRadius: scale(12),
//     alignItems: 'center',
//   },

//   payText: {
//     color: COLORS.white,
//     fontSize: scale(SIZES.medium),
//     fontWeight: '600',
//   },

//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });















import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { COLORS, SIZES } from '../../../config/constants';
import { scale, verticalScale } from '../../../utils/styling';
// import { COLORS } from 'react-native/types_generated/Libraries/Animated/AnimatedExports';

const ReviewCart = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={22} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cart</Text>
        <AntDesign name="edit" size={20} color={COLORS.primary} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* USER + TEST CARD */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <View style={styles.userRow}>
              <Image
                source={{
                  uri: 'https://randomuser.me/api/portraits/men/32.jpg',
                }}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.userName}>John Doe</Text>
                <Text style={styles.subText}>Male, 30</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.labVisitBtn}>
              <Text style={styles.labVisitText}>Lab Visit</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.phoneText}>+91 83839 38338</Text>

          <View style={styles.divider} />

          {/* TEST ROW */}
          <View style={styles.testRow}>
            <View style={styles.testLeft}>
              <View style={styles.testIcon}>
                <Text>🩸</Text>
              </View>
              <View>
                <Text style={styles.testName}>Blood Test</Text>
                <Text style={styles.testPrice}>₹400/-</Text>
              </View>
            </View>

            <AntDesign name="minuscircleo" size={20} color="red" />
          </View>
        </View>

        {/* ADDRESS CARD */}
        <View style={styles.card}>
          <Text style={styles.userNameBlue}>John Doe</Text>
          <Text style={styles.addressText}>
            Madhapur Metro Station, Road Number 23, Aditya Enclave,
            Madhapur, Hyderabad, Telangana, India
          </Text>
          <Text style={styles.phoneText}>+91 83839 38338</Text>
        </View>

        {/* LAB IMAGE */}
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1581091012184-5c3a4c4a4f8f',
          }}
          style={styles.labImage}
        />

        {/* BILL SUMMARY */}
        <View style={styles.billContainer}>
          <Text style={styles.billTitle}>Bill Summary</Text>

          <View style={styles.rowBetween}>
            <Text>Total MRP</Text>
            <Text>₹400/-</Text>
          </View>

          <View style={styles.rowBetween}>
            <Text style={{ color: COLORS.green }}>Discount</Text>
            <Text style={{ color: COLORS.green }}>₹40/-</Text>
          </View>

          <View style={styles.rowBetween}>
            <Text>Home Collection Charges</Text>
            <Text>₹50/-</Text>
          </View>

          <View style={styles.rowBetween}>
            <Text>Booking Fees</Text>
            <Text>₹10/-</Text>
          </View>

          <View style={styles.rowBetween}>
            <Text>Platform Fees</Text>
            <Text>₹30/-</Text>
          </View>

          <View style={styles.rowBetween}>
            <Text>Additional Charges</Text>
            <Text>₹10/-</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.rowBetween}>
            <Text style={styles.totalText}>Total Amount</Text>
            <Text style={styles.totalText}>₹460/-</Text>
          </View>
        </View>
      </ScrollView>

      {/* PAY BUTTON */}
      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReviewCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: scale(16),
    backgroundColor: COLORS.white,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  discountBanner: {
    margin: scale(16),
    padding: scale(14),
    borderRadius: 10,
    backgroundColor: COLORS.pink,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  discountText: {
    color: COLORS.white,
    fontWeight: '600',
  },

  card: {
    backgroundColor: COLORS.white,
    marginHorizontal: scale(16),
    marginVertical: verticalScale(14),
    padding: scale(16),
    borderRadius: 12,
    borderWidth:scale(1),
    borderColor:COLORS.blue
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },

  userName: {
    fontWeight: '600',
  },

  userNameBlue: {
    fontWeight: '600',
    color: COLORS.primary,
  },

  subText: {
    color: COLORS.gray,
    fontSize: 12,
  },

  labVisitBtn: {
    backgroundColor: COLORS.Iceblue,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  labVisitText: {
    color: COLORS.primary,
    fontSize: 12,
  },

  phoneText: {
    marginTop: 8,
    fontSize: 13,
  },

  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },

  testRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  testLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  testIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  testName: {
    fontWeight: '600',
  },

  testPrice: {
    color: COLORS.green,
    fontWeight: '600',
  },

  addressText: {
    marginTop: 4,
    color: COLORS.gray,
    fontSize: 13,
  },

  labImage: {
    width: '92%',
    height: 120,
    alignSelf: 'center',
    borderRadius: 12,
    marginBottom: 16,
  },

  billContainer: {
    paddingHorizontal: scale(16),
    marginBottom: 20,
  },

  billTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },

  totalText: {
    fontWeight: '700',
    fontSize: 15,
  },

  payButton: {
    backgroundColor: COLORS.primary,
    margin: 16,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  payText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
  },
});
