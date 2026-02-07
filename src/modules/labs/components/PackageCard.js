import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES, FONT } from '../../../config/constants';
import { scale, verticalScale } from '../../../utils/styling';

const PackageCard = ({
  item,
  isAdded,
  onAddToCart,
  onViewDetails,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      {/* TOP CONTENT */}
      <View style={styles.topRow}>
        <Image
          source={{
            uri:
              item.image ||
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTxEscPwXOmagb4I6akEBtLthHxH2gFrB_xg&s',
          }}
          style={styles.image}
        />

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {item.name}
          </Text>

          <Text style={styles.price}>₹{item.price}/-</Text>

          <Text style={styles.subText} numberOfLines={1}>
           {item.description}
          </Text>
        </View>
      </View>

      {/* BUTTON ROW */}
      <View style={styles.buttonRow}>
        {!isAdded ? (
          <TouchableOpacity
            style={[styles.button, styles.addBtn]}
            onPress={onAddToCart}
          >
            <Text style={styles.addText}>Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.viewCartBtn]}
            onPress={() => navigation.navigate('CartScreen')}
          >
            <Text style={styles.viewCartText}>View Cart</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.button, styles.viewBtn]}
          onPress={onViewDetails}
        >
          <Text style={styles.viewText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PackageCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: scale(10),
    padding: scale(12),
    marginBottom: verticalScale(12),
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  topRow: {
    flexDirection: 'row',
    marginBottom: verticalScale(10),
  },
  image: {
    width: scale(82),
    height: scale(82),
    borderRadius: scale(6),
    marginRight: scale(12),
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    color: COLORS.black,
  },
  price: {
    fontSize: SIZES.medium,
    color: COLORS.green,
    marginVertical: verticalScale(2),
  },
  subText: {
    fontSize: SIZES.medium,
    color: COLORS.black,
  },

  buttonRow: {
  flexDirection: 'row',
  gap: scale(10),
},

button: {
  flex: 1,                
  height: verticalScale(44), 
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: scale(6),
},

addBtn: {
  borderWidth: 1,
  borderColor: COLORS.primary,
  backgroundColor: COLORS.white,
},

viewCartBtn: {
  borderWidth: 1,
  borderColor: COLORS.primary,
  backgroundColor: COLORS.white,
},

viewBtn: {
  borderWidth: 1,
  borderColor: COLORS.primary,
  backgroundColor: COLORS.white,
},

  addText: {
    color: COLORS.primary,
    fontSize: SIZES.medium,
  },
   viewCartBtn: {
    backgroundColor: COLORS.primary,
  },
  viewCartText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
  },
  viewBtn: {
    backgroundColor: COLORS.primary,
  },
  viewText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
  },
});
