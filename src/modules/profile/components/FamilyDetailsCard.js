import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { verticalScale, scale } from '../../../utils/styling';

const FamilyDetailsCard = ({
  image,
  name,
  relationship,
  age,
  gender,
  onEdit,
  onDelete
}) => {
  return (
    <View style={styles.card}>

      {/* Top Row */}
      <View style={styles.topRow}>
        <Image source={{ uri: image }} style={styles.image} />

        <View style={styles.details}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.subText}>
            {relationship} • {age} yrs • {gender}
          </Text>
        </View>
      </View>

 
      <View style={styles.divider} />

      <View style={styles.buttonRow}>
        <TouchableOpacity  style={styles.button}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>

        <Text style={styles.separator}>|</Text>

        <TouchableOpacity  style={styles.button}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default FamilyDetailsCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: scale (12),
    padding: scale(15),
    marginVertical: verticalScale(8),
    elevation: 3,
    borderColor: "#A7D3FF",
    borderWidth: scale(1)
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  image: {
    width: scale(75),
    height: verticalScale(75),
    borderRadius: scale(60),
    marginRight: scale(15),
  },

  details: {
    flex: 1,
  },

  name: {
    fontSize: scale(18),
    fontWeight: '600',
    marginBottom: scale(4),
    color:"#000000"
  },

  subText: {
    fontSize: scale(15),
    color: '#7F7F7F',
    fontWeight: '500'
  },

  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 17,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  button: {
    paddingHorizontal: 15,
   
  },

  editText: {
    fontSize: scale(19),
    color: '#007bff',
    fontWeight: '600',
  },

  deleteText: {
    fontSize: scale(19),
    color: '#E7000B',
    fontWeight: '600',
  },

  separator: {
    fontSize: 19,
    marginHorizontal: 10,
    color: '#aaa',
  },
});
