import { StyleSheet, Text, View } from "react-native";
import React from "react";

const BookingDetails = ({ route }) => {
  const { bookingId } = route.params || {};

  console.log("Booking ID received:", bookingId);

  return (
    <View>
      <Text>Booking details</Text>
      <Text>Booking ID: {bookingId}</Text>
    </View>
  );
};

export default BookingDetails;

const styles = StyleSheet.create({});


// import { StyleSheet, Text, View } from 'react-native';
// import React from 'react';

// const BookingDetails = () => {
//   return (
//     <View>
//       <Text>Booking details</Text>
//     </View>
//   );
// };

// export default BookingDetails;

// const styles = StyleSheet.create({});
