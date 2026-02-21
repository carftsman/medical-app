import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const PrescriptionTimeline = ({ files = [] }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepTimes, setStepTimes] = useState({});

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

  useEffect(() => {
    if (currentStep > steps.length) return;

    const timer = setTimeout(() => {
      setStepTimes((prev) => ({
        ...prev,
        [currentStep]: new Date(),
      }));

      setCurrentStep((prev) => prev + 1);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, [currentStep]);

  const formatTime = (date) => {
    if (!date) return "";
    return (
      new Date(date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };

  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber < currentStep;

        return (
          <View key={index} style={styles.rowWrapper}>
            {/* LEFT SIDE */}
            <View style={styles.leftSection}>
              <View
                style={[
                  styles.circle,
                  {
                    backgroundColor: isActive
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
                      backgroundColor: isActive
                        ? "#056FD2"
                        : "#E5E5E5",
                    },
                  ]}
                />
              )}
            </View>

            {/* RIGHT SIDE */}
            <View style={styles.content}>
              <Text
                style={[
                  styles.title,
                  { color: isActive ? "#000" : "#888" },
                ]}
              >
                {step.title}
              </Text>

              <Text style={styles.description}>
                {step.description}
              </Text>

              {/* SHOW TIME */}
              {isActive && (
                <Text style={styles.timeText}>
                  {formatTime(stepTimes[stepNumber])}
                </Text>
              )}

              {/* FILE DETAILS ONLY FIRST STEP */}
              {index === 0 && isActive && files.length > 0 && (
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
                      {files[0]?.name}
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
    marginTop: 20,
    paddingHorizontal: 16,
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
    marginTop: 4,
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

  timeText: {
    marginTop: 6,
    fontSize: 12,
    color: "#056FD2",
    fontWeight: "500",
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
