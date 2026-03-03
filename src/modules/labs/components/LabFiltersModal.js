
import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import Slider from "@react-native-community/slider";

const LabFiltersModal = ({
  visible,
  onClose,
  onApply,
  initialFilters = {},
}) => {
  const [sortBy, setSortBy] = useState("");
  const [radius, setRadius] = useState(1);
  const [ratingRange, setRatingRange] = useState(null);
  const [feeRange, setFeeRange] = useState(null);

  useEffect(() => {
    if (visible) {
      setSortBy(initialFilters.sortBy || "");
      setRadius(initialFilters.radius || 1);
      setRatingRange(initialFilters.ratingRange || null);
      setFeeRange(initialFilters.feeRange || null);
    }
  }, [visible]);

  const handleApply = () => {
    let minRating = null;

    if (ratingRange) {
      const [min] = ratingRange.split("-");
      minRating = Number(min);
    }

    let minFee = null;
    let maxFee = null;

    if (feeRange) {
      const [min, max] = feeRange.split("-");
      minFee = Number(min);
      maxFee = Number(max);
    }

    onApply({
      sortBy,
      radius,
      minRating,
      minFee,
      maxFee,
    });

    onClose();
  };

  const handleClearAll = () => {
    setSortBy("");
    setRadius(1);
    setRatingRange(null);
    setFeeRange(null);
  };

  const renderSortButton = (label, value) => (
    <TouchableOpacity
      style={[
        styles.sortButton,
        sortBy === value && styles.selectedSort,
      ]}
      onPress={() => setSortBy(value)}
    >
      <Text
        style={[
          styles.sortText,
          sortBy === value && styles.selectedSortText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderCheckbox = (label, value, selected, setSelected) => (
    <Pressable
      style={styles.checkboxRow}
      onPress={() => setSelected(selected === value ? null : value)}
    >
      <View style={[styles.checkbox, selected === value && styles.checked]} />
      <Text style={styles.checkboxLabel}>{label}</Text>
    </Pressable>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>

          {/* Top Handle */}
          <View style={styles.handle} />

          {/* Header */}
          <View style={styles.headerRow}>
            <Text style={styles.header}>Filters</Text>
            <TouchableOpacity onPress={handleClearAll}>
              <Text style={styles.clearText}>Clear All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>

            {/* SORT */}
            <Text style={styles.sectionTitle}>Sort</Text>
            <View style={styles.sortRow}>
              {renderSortButton("Distance", "distance")}
              {renderSortButton("Rating", "rating")}
              {renderSortButton("Popularity", "popularity")}
            </View>

            {/* RATING */}
            <Text style={styles.sectionTitle}>Rating</Text>
            <View style={styles.checkboxContainer}>
              {renderCheckbox("0-1", "0-1", ratingRange, setRatingRange)}
              {renderCheckbox("1-2", "1-2", ratingRange, setRatingRange)}
              {renderCheckbox("2-3", "2-3", ratingRange, setRatingRange)}
              {renderCheckbox("3-4", "3-4", ratingRange, setRatingRange)}
              {renderCheckbox("4-5", "4-5", ratingRange, setRatingRange)}
            </View>

            {/* DISTANCE */}
            <Text style={styles.sectionTitle}>Distance</Text>
            <Slider
              style={{ width: "100%", height: 40 }}
              minimumValue={1}
              maximumValue={15}
              step={1}
              value={radius}
              onValueChange={(value) => setRadius(value)}
              minimumTrackTintColor="#1E73BE"
              maximumTrackTintColor="#ccc"
              thumbTintColor="#1E73BE"
            />
            <View style={styles.distanceLabels}>
              <Text>1 km</Text>
              <Text>{radius} kms</Text>
              <Text>15 kms</Text>
            </View>

            {/* FEE RANGE */}
            <Text style={styles.sectionTitle}>Fee Range</Text>
            <View style={styles.checkboxContainer}>
              {renderCheckbox("0-100", "0-100", feeRange, setFeeRange)}
              {renderCheckbox("100-300", "100-300", feeRange, setFeeRange)}
              {renderCheckbox("300-500", "300-500", feeRange, setFeeRange)}
              {renderCheckbox("500-1000", "500-1000", feeRange, setFeeRange)}
              {renderCheckbox("1000-2000", "1000-2000", feeRange, setFeeRange)}
            </View>

          </ScrollView>

          {/* APPLY BUTTON */}
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyText}>Apply</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

export default LabFiltersModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    maxHeight: "90%",
  },
  handle: {
    width: 50,
    height: 5,
    backgroundColor: "#ccc",
    alignSelf: "center",
    borderRadius: 5,
    marginBottom: 15,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    fontSize: 18,
    fontWeight: "700",
  },
  clearText: {
    color: "#1E73BE",
    fontWeight: "600",
  },
  sectionTitle: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: "600",
  },
  sortRow: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },
  sortButton: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    backgroundColor: "#E9EEF4",
    borderRadius: 20,
  },
  selectedSort: {
    backgroundColor: "#1E73BE",
  },
  sortText: {
    color: "#333",
  },
  selectedSortText: {
    color: "#fff",
    fontWeight: "600",
  },
  checkboxContainer: {
    marginTop: 10,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#555",
    marginRight: 10,
  },
  checked: {
    backgroundColor: "#1E73BE",
    borderColor: "#1E73BE",
  },
  checkboxLabel: {
    fontSize: 14,
  },
  distanceLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  applyButton: {
    backgroundColor: "#1E73BE",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 15,
  },
  applyText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});