import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import PreviewFileList from "../components/prescription/PreviewFileList";

const PrescriptionPreviewScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [files, setFiles] = useState(route.params?.files || []);

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const goToLabs = () => {
    if (files.length === 0) {
      Alert.alert("Please upload at least one prescription");
      return;
    }

    navigation.navigate("LabsScreen", { files });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <PreviewFileList
          files={files}
          onRemove={removeFile}
          showUploadMore={false}
        />

        <TouchableOpacity
          style={styles.chooseBtn}
          onPress={goToLabs}
        >
          <Text style={styles.chooseText}>Choose Lab</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default PrescriptionPreviewScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },

  chooseBtn: {
    marginTop: 30,
    backgroundColor: "#056FD2",
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: "center",
  },

  chooseText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
