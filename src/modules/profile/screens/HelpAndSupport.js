import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { scale, verticalScale } from "../../../utils/styling";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const DATA = [
  {
    title: "How do I add family members?",
    content: "Go to Profile > Family Members and tap the + icon.",
  },
  {
    title: "Is my health data secure?",
    content: "Yes, your data is encrypted and fully protected.",
  },
  {
    title: "Can I reschedule a virtual visit?",
    content: "Yes, you can reschedule from the appointments section.",
  },
  {
    title: "What if my doctor is late?",
    content: "You will be notified if there is any delay.",
  },
  {
    title: "How do I track my prescription?",
    content: "Track prescriptions from the Orders tab.",
  },
  {
    title: "What is the refund policy?",
    content: "Refunds are processed within 5–7 business days.",
  },
  {
    title: "How are lab tests received?",
    content: "Lab results are shared directly in the app.",
  },
  {
    title: "How to book an appointment?",
    content: "Select a doctor and choose an available slot.",
  },
];

export default function HelpSupport() {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={scale(22)} color="#111" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Help & Support</Text>
          <View style={styles.rightPlaceholder} />
        </View>
        <TextInput
          placeholder="Search Questions"
          placeholderTextColor="#9CA3AF"
          style={styles.searchInput}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
        {DATA.map((item, index) => (
          <View key={index} style={styles.card}>
            <TouchableOpacity
              style={styles.cardHeader}
              activeOpacity={0.7}
              onPress={() => toggleAccordion(index)}
            >
              <Text style={styles.cardTitle}>{item.title}</Text>

              <Ionicons
                name={
                  activeIndex === index
                    ? "chevron-up-outline"
                    : "chevron-down-outline"
                }
                size={scale(18)}
                color="#9CA3AF"
              />
            </TouchableOpacity>

            {activeIndex === index && (
              <View style={styles.contentWrapper}>
                <Text style={styles.cardContent}>{item.content}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: scale(20),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: verticalScale(12),
    marginBottom: verticalScale(20),
  },

  backButton: {
    width: scale(40),
    alignItems: "flex-start",
  },

  headerTitle: {
    fontSize: scale(18),
    fontWeight: "600",
    color: "#111",
    horizontalalign : "centre"
  },

  rightPlaceholder: {
    width: scale(40), 
  },
  searchInput: {
    height: verticalScale(50),
    backgroundColor: "#F9FAFB",
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: scale(16),
    fontSize: scale(15),
    color: "#111",
    marginBottom: verticalScale(20),
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: "#EDEDED",
    marginBottom: verticalScale(14),
    overflow: "hidden",

    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: verticalScale(18),
    paddingHorizontal: scale(18),
  },

  cardTitle: {
    flex: 1,
    fontSize: scale(16),
    color: "#1F2937",
    marginRight: scale(10),
  },

  contentWrapper: {
    paddingHorizontal: scale(18),
    paddingBottom: verticalScale(18),
  },

  cardContent: {
    fontSize: scale(14),
    color: "#6B7280",
    lineHeight: verticalScale(22),
  },
});