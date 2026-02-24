import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const steps = [
  {
    title: "Prescription Sent",
    description: "Documents uploaded successfully",
  },
  {
    title: "Under Review",
    description:
      "Our team has received your prescription and started process",
  },
  {
    title: "Tests Confirmed",
    description:
      "Your prescription has been sent to multiple labs.",
  },
  {
    title: "Booking Ready",
    description:
      "Your booking is ready. Lab will contact you soon.",
  },
];

const PrescriptionTimeline = ({ files = [] }) => {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (currentStep >= steps.length) return;

    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentStep]);

  // Extract file name from URL
  const getFileName = (url) => {
    if (!url) return "Prescription File";
    return url.split("/").pop();
  };

  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber <= currentStep;

        return (
          <View key={index} style={styles.rowWrapper}>
            {/* LEFT */}
            <View style={styles.leftSection}>
              <View
                style={[
                  styles.circle,
                  {
                    backgroundColor: isCompleted
                      ? "#056FD2"
                      : "#D9D9D9",
                  },
                ]}
              />

              {index !== steps.length - 1 && (
                <View
                  style={[
                    styles.line,
                    {
                      backgroundColor: isCompleted
                        ? "#056FD2"
                        : "#E5E5E5",
                    },
                  ]}
                />
              )}
            </View>

            {/* RIGHT */}
            <View style={styles.content}>
              <Text
                style={[
                  styles.title,
                  {
                    color: isCompleted
                      ? "#000"
                      : "#888",
                  },
                ]}
              >
                {step.title}
              </Text>

              <Text style={styles.description}>
                {step.description}
              </Text>

              {/* Show files in first step */}
              {index === 0 &&
                isCompleted &&
                files.length > 0 && (
                  <View style={styles.fileCard}>
                    <Ionicons
                      name="document-text-outline"
                      size={22}
                      color="#056FD2"
                    />
                    <View style={{ marginLeft: 10 }}>
                      <Text style={styles.fileName}>
                        {files.length} File(s) Uploaded
                      </Text>
                      <Text style={styles.fileSmall}>
                        {getFileName(files[0]?.fileUrl)}
                      </Text>
                    </View>
                  </View>
                )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default PrescriptionTimeline;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  rowWrapper: {
    flexDirection: "row",
  },
  leftSection: {
    alignItems: "center",
    width: 30,
  },
  circle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginTop: 5,
  },
  line: {
    width: 2,
    flex: 1,
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingBottom: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  description: {
    marginTop: 4,
    fontSize: 13,
    color: "#666",
  },
  fileCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    backgroundColor: "#F3F7FF",
    padding: 14,
    borderRadius: 14,
  },
  fileName: {
    fontWeight: "600",
    fontSize: 14,
  },
  fileSmall: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },
});