import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
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


// Fetch department categories for "Top Concerns"
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


// Fetch symptoms for "Regular Health Issues"
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


// Initial data load
  useEffect(() => {
    fetchCategories();
    fetchSymptoms();
  }, []);

  const limitedCategories = categories.slice(0, 6);
  const limitedSymptoms = symptoms.slice(0, 6);


// Navigate to doctors list using selected category
  const onDepartmentPress = (item) => {
    console.log('Pressed department:', item.name);
    navigation.getParent().navigate('DoctorsList', {
      categoryId: item.id,
      categoryName: item.name,
    });
  };


//Navigate using selected symptom
  const onSymptomPress = (item) => {
    console.log("symptom Pressed:", item)
    navigation.getParent().navigate('DoctorsList', {
      categoryId: item?.category?.id,
      categoryName: item?.category?.name,
    });
  };


  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
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
              onCategoryPress={onDepartmentPress}
            />
            <CategorySection
              title="Regular Health Issues"
              data={limitedSymptoms}
              loading={loading}
              showViewAll={false}
              onCategoryPress={onSymptomPress}
            />
          </>
        }
        ListFooterComponent={<WhyChooseUsFooter />}
      />
    </View>
  );
};

export default DepartmentsScreen;
