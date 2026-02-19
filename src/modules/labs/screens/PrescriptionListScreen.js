import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRoute, useNavigation } from "@react-navigation/native";

const PrescriptionListScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const uploads = route?.params?.uploads || [];
  const [previewImage, setPreviewImage] = useState(null);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.labName}>{item.labName}</Text>

      <Text style={styles.status}>
        {item.files.length} file(s) • {item.status}
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {item.files.map((file, index) => {
          const isPDF =
            file?.type?.includes("pdf") ||
            file?.name?.toLowerCase()?.endsWith(".pdf");

          return (
            <View key={index} style={{ marginRight: 10 }}>
              {isPDF ? (
                <View style={styles.pdfBox}>
                  <Ionicons
                    name="document-text"
                    size={30}
                    color="#056FD2"
                  />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => setPreviewImage(file.uri)}
                >
                  <Image
                    source={{ uri: file.uri }}
                    style={styles.image}
                  />
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Prescription List</Text>
        <View style={{ width: 22 }} />
      </View>

      <FlatList
        data={uploads}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No prescriptions uploaded yet
          </Text>
        }
      />

      <Modal visible={!!previewImage} transparent>
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => setPreviewImage(null)}
        >
          <Image
            source={{ uri: previewImage }}
            style={styles.fullImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Modal>

    </View>
  );
};

export default PrescriptionListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 16,
    marginBottom: 20,
  },

  labName: {
    fontSize: 16,
    fontWeight: "700",
  },

  status: {
    marginVertical: 8,
    color: "gray",
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },

  pdfBox: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "#EAF4FF",
    justifyContent: "center",
    alignItems: "center",
  },

  empty: {
    textAlign: "center",
    marginTop: 50,
    color: "gray",
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },

  fullImage: {
    width: "95%",
    height: "80%",
  },
});
