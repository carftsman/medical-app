import { View, StyleSheet } from "react-native";

const DoctorSkeletonWomen = () => {
  return (
    <View style={styles.card}>
      <View style={styles.image} />
      <View style={styles.content}>
        <View style={styles.lineShort} />
        <View style={styles.lineLong} />
        <View style={styles.lineMedium} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 30,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
  },
  image: {
    width: 70,
    height: 70,
    
    backgroundColor: "#e0e0e0",
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  lineShort: {
    width: "40%",
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    marginBottom: 8,
  },
  lineMedium: {
    width: "60%",
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    marginBottom: 8,
  },
  lineLong: {
    width: "80%",
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    marginBottom: 8,
  },
});
export default DoctorSkeletonWomen;