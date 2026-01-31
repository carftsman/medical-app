import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import api from "../../../api/client";
import { COLORS } from "../../../config/constants";

import DoctorConsultHeader from "../components/DeptScreen-Header";
import CategorySection from "../components/DeptScreen-CategorySection";
import WhyChooseUsFooter from "../components/DeptScreen-Footer";

const DepartmentsScreen = () => {
  const navigation = useNavigation();

  const [categories, setCategories] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  const fetchCategories = async () => {
    try {
      setLoading(true);

      const response = await api.get("/hospital/user/categories");

      if (response?.data?.data) {
        setCategories(response.data.data);
      } else {
        setError("No categories found");
      }
    } catch (err) {
      console.log("Categories API error:", err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  const fetchSymptoms = async () => {
    try {
      const response = await api.get("/hospital/user/symptoms");

      if (response?.data?.symptoms) {
        setSymptoms(response.data.symptoms);
      }
    } catch (err) {
      console.log("Symptoms API error:", err);
    }
  };



  useEffect(() => {
    fetchCategories();
    fetchSymptoms();
  }, []);

  const limitedCategories = categories.slice(0, 6);
  const limitedSymptoms = symptoms.slice(0, 6);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <FlatList
        data={[]}
        keyExtractor={() => "key"}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <DoctorConsultHeader />
            <CategorySection
              title="Top Concerns"
              data={limitedCategories}
              loading={loading}
              showViewAll={true}
              onViewAll={() =>
                navigation.navigate("DepartmentsList", {
                  data: categories,
                })
              }
            />
            <CategorySection
              title="Regular Health Issues"
              data={limitedSymptoms}
              loading={loading}
              showViewAll={false}
            />
          </>
        }
        ListFooterComponent={<WhyChooseUsFooter />}
      />
    </SafeAreaView>
  );
};

export default DepartmentsScreen;
