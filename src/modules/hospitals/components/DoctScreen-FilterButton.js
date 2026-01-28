import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale, verticalScale } from '../../../utils/styling';
import { COLORS, FONT } from '../../../config/constants';


const DoctFilterButton = ({
  specializations,
  selectedFilter,
  setSelectedFilter,
  setShowFilter,
}) => {
  return (
    <View style={styles.filterRow}>
      {/* Fixed Filter Button */}
      <TouchableOpacity
        style={styles.fixedFilterBtn}
        onPress={() => {
          console.log("Filter pressed");
          setShowFilter(true);
        }}
        activeOpacity={0.7}
            
      >
        <Icon name="tune-variant" size={scale(18)} color="#056FD2" />
        <Text style={styles.fixedFilterText}>Filter</Text>
      </TouchableOpacity>

      {/* Scrollable Chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {specializations.map(item => (
          <TouchableOpacity
            key={item}
            style={[
              styles.filterButton,
              selectedFilter === item && styles.activeFilter,
            ]}
            onPress={() => setSelectedFilter(item)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === item && styles.activeFilterText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default DoctFilterButton;

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(8),
    marginBottom: verticalScale(4),
   
  },

  fixedFilterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: scale(1),
    borderColor: COLORS.primary,
    borderRadius: scale(20),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(8),
    marginRight: scale(10),
    marginTop: verticalScale(-2),
  },

  fixedFilterText: {
    marginLeft: scale(6),
    fontSize: scale(14),
    color: COLORS.primary,
    fontFamily: FONT.bold,
  },

  filterButton: {
    borderWidth: scale(1),
    borderColor: COLORS.lightGray,
    borderRadius: scale(20),
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(16),
    marginRight: scale(10),
    marginBottom: verticalScale(2),
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },

  activeFilter: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  filterText: {
    fontSize: scale(14),
    color: COLORS.gray,
    fontFamily: FONT.medium,
  },

  activeFilterText: {
    color: COLORS.white,
    fontFamily: FONT.bold,
  },
});
