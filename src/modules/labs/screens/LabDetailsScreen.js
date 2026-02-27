import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Share,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { labApi } from "../services/labApi";
import { COLORS, SIZES } from "../../../config/constants";
import { scale, verticalScale } from "../../../utils/styling";

const LabDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const labId = route?.params?.labId ?? 3;
  const isUploadFlow = route?.params?.isUploadFlow === true;
  const uploadedFiles = route?.params?.files || null;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [openPackageId, setOpenPackageId] = useState(null);

  const fetchLabDetails = async () => {
    try {
      const res = await labApi.getLabDetails(labId);
      setData(res?.data);
    } catch (error) {
      console.log(
        "Lab details API error:",
        error?.response?.data || error.message
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (labId) {
      fetchLabDetails();
    }
  }, [labId]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchLabDetails();
  }, [labId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.center}>
        <Text>Unable to load lab details</Text>
      </View>
    );
  }

  const handleShare = async () => {
    try {
      const locationText =
        data.address || `${data.name}, ${data.city}`;

      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        locationText
      )}`;

      await Share.share({
        message: `🏥 ${data.name}
⭐ Rating: ${data.rating || 0}
📍 Location: ${locationText}
🗺️ Google Maps:
${mapsUrl}`,
      });
    } catch (error) {
      console.log("Share error:", error);
    }
  };

  const renderStars = (rating = 0) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Icon key={i} name="star" size={scale(16)} color="#F5A623" />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <Icon key={i} name="star-half-full" size={scale(16)} color="#F5A623" />
        );
      } else {
        stars.push(
          <Icon key={i} name="star-outline" size={scale(16)} color="#F5A623" />
        );
      }
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={scale(22)} />
        </TouchableOpacity>

        <Text style={styles.headerTitle} numberOfLines={1}>
          {data.name}
        </Text>

        <TouchableOpacity onPress={handleShare}>
          <Icon name="share-variant" size={scale(20)} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
          />
        }
      >
        <Image
          source={{
            uri:
              data.imageUrl ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTxEscPwXOmagb4I6akEBtLthHxH2gFrB_xg&s",
          }}
          style={styles.banner}
        />

        {/* BASIC INFO */}
        <View style={styles.section}>
          <View style={styles.topRow}>
            <Text style={styles.labName}>{data.name}</Text>

            <TouchableOpacity
              style={styles.callBtn}
              onPress={() => Linking.openURL(`tel:${data.phone}`)}
            >
              <Icon name="phone" size={scale(18)} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.ratingRow}>
            <View style={styles.starsRow}>
              {renderStars(data.rating)}
            </View>
            <Text style={styles.ratingText}>
              {data.rating || 0}
            </Text>
          </View>
        </View>

        {/* PACKAGES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Packages Included ({data.packagesIncluded?.length || 0})
          </Text>

          {data.packagesIncluded?.map((pkg) => {
            const packageId = pkg.id ?? pkg.packageId;
            const isOpen = openPackageId === packageId;

            return (
              <View key={packageId} style={styles.accordion}>
                <TouchableOpacity
                  style={styles.accordionHeader}
                  onPress={() =>
                    setOpenPackageId(isOpen ? null : packageId)
                  }
                >
                  <Text style={styles.accordionTitle}>
                    {pkg.name ?? pkg.packageName}
                  </Text>
                  <Icon
                    name={isOpen ? "chevron-up" : "chevron-down"}
                    size={scale(20)}
                  />
                </TouchableOpacity>

                {isOpen && (
                  <View style={styles.accordionBody}>
                    {pkg.tests?.map((test, index) => (
                      <Text
                        key={`${packageId}-${index}`}
                        style={styles.bulletText}
                      >
                        • {test}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* BOTTOM BUTTON */}
      <View style={styles.bottom}>
        {isUploadFlow ? (
          <TouchableOpacity
            style={[styles.bookBtn, { backgroundColor: "#4368ed" }]}
            onPress={() =>
              navigation.navigate("ReviewPrescription", {
                lab: data,
                files: uploadedFiles,
              })
            }
          >
            <Text style={styles.bookText}>Proceed</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.bookBtn}
            onPress={() =>
              navigation.navigate("PackagesScreen", {
                labId: data.id,
              })
            }
          >
            <Text style={styles.bookText}>Book Test</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default LabDetailsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  /* HEADER */
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(40),
    paddingBottom: verticalScale(12),
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray,
  },

  headerTitle: {
    flex: 1,
    marginHorizontal: scale(12),
    fontSize: SIZES.large,
    fontWeight: "700",
    color: COLORS.black,
  },

  /* BANNER */
  banner: {
    width: "100%",
    height: verticalScale(260),
    marginTop: verticalScale(80),
  },

  /* SECTION */
  section: {
    padding: scale(16),
  },

  labName: {
    fontSize: SIZES.large,
    fontWeight: "700",
    color: COLORS.black,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  callBtn: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  /* RATING */
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(6),
    marginBottom: verticalScale(8),
  },

  starsRow: {
    flexDirection: "row",
    marginRight: scale(6),
  },

  ratingText: {
    fontSize: SIZES.medium,
    fontWeight: "600",
    color: COLORS.black,
  },

  /* SECTION TITLE */
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: "700",
    marginBottom: verticalScale(10),
    color: COLORS.black,
  },

  /* ACCORDION */
  accordion: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: scale(10),
    marginBottom: verticalScale(10),
    backgroundColor: "#FAFBFD",
  },

  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: scale(12),
  },

  accordionTitle: {
    fontSize: SIZES.medium,
    fontWeight: "600",
    color: COLORS.black,
  },

  accordionBody: {
    paddingHorizontal: scale(12),
    paddingBottom: scale(12),
  },

  bulletText: {
    fontSize: SIZES.medium,
    color: COLORS.darkgray,
    marginBottom: verticalScale(4),
  },

  /* BOTTOM BUTTON */
  bottom: {
    padding: scale(16),
    borderTopWidth: 1,
    borderColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
  },

  bookBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(14),
    borderRadius: scale(12),
    alignItems: "center",
  },

  bookText: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontWeight: "600",
  },
});