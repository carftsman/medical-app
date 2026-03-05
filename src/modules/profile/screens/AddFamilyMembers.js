import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, TextInput, FlatList, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import { scale, verticalScale } from '../../../utils/styling';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PhotoOptionModal from '../components/PhotoOptionModal';
import { Image } from 'react-native';
import api from '../../../api/client';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { familyMemberSchema } from '../utils/Validations';


const AddFamilyMembers = ({ navigation, route }) => {
  const memberData = route?.params?.memberData;
  const isEditMode = !!memberData;
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState("Select Gender");
  const [relationtype, setRelationtype] = useState("Select");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState({});
  const options = ['Male', 'Female', 'Other'];
  const relation = ['Mother', 'Father', 'Brother', 'Sister', 'Daughter', 'Son', 'GrandMother', 'GrandFather', 'Other']

  const validateField = (field, value) => {

    // ✅ Skip validation if optional field is empty
    if ((field === "email" || field === "relation") && value === "") {
      setErrors(prev => ({ ...prev, [field]: undefined }));
      return;
    }

    if (value === "") {
      setErrors(prev => ({ ...prev, [field]: `${field} is required` }));
      return;
    }

    const singleFieldSchema = familyMemberSchema.pick({ [field]: true });

    const result = singleFieldSchema.safeParse({ [field]: value });

    if (!result.success) {
      setErrors(prev => ({
        ...prev,
        [field]: result.error.errors[0].message,
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const isFormValid =
    name.trim() !== "" &&
    age.trim() !== "" &&
    number.trim() !== "" &&
    selected !== "Select Gender" &&
    !errors.name &&
    !errors.age &&
    !errors.mobile &&
    !errors.gender &&
    !errors.email;

  const handleSubmit = async () => {
    try {
      const payload = {
        fullName: name,
        relation:
          relationtype !== "Select"
            ? relationtype.toUpperCase()
            : null,
        age: Number(age),
        gender: selected.toUpperCase(),
        phone: number,
        email: email
      };

      console.log("Payload:", payload);

      let response;

      if (isEditMode) {
        // ✅ UPDATE
        response = await api.patch(
          `/family-member/${memberData.id}`,
          payload
        );
        console.log("Updated:", response.data);
      } else {
        // ✅ CREATE
        response = await api.post(
          "/family-member",
          payload
        );
        console.log("Created:", response.data);
      }

      navigation.navigate("FamilyMembers");

    } catch (error) {
      console.log(
        "API Error:",
        error.response?.data || error.message
      );
    }
  };
  useEffect(() => {
    if (memberData) {
      setName(memberData.fullName || "");
      setAge(memberData.age?.toString() || "");
      setSelected(memberData.gender || "Select Gender");
      setRelationtype(memberData.relation || "Select");
      setNumber(memberData.phone || "");
      setEmail(memberData.email || "");
    }
  }, [memberData]);
  return (
    <KeyboardAvoidingView
       style={styles.container}
       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
       keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <View>
        <View style={styles.screenHeader}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>

          <Text style={styles.screenHeaderText}>Family Members</Text>
          <View style={{ width: scale(26) }}></View>
        </View>


        <View >
          <Text style={styles.title}>Full Name <Text style={{ color: 'red' }}>*</Text></Text>
          <TextInput placeholder="Enter Name"
            value={name}
            onChangeText={(text) => {
              setName(text);
              validateField("name", text);
            }}
            style={styles.input} />
          {errors.name && (
            <Text style={{ color: 'red', marginTop: 4 }}>
              {errors.name}
            </Text>
          )}
        </View>

        <View >
          <Text style={styles.title}>Age <Text style={{ color: 'red' }}>*</Text></Text>
          <TextInput placeholder="Enter Age"
            value={age}
            onChangeText={(text) => {
              setAge(text);
              validateField("age", text);
            }}
            keyboardType="numeric"
            style={styles.input} />
          {errors.age && (
            <Text style={{ color: 'red', marginTop: 4 }}>
              {errors.age}
            </Text>
          )}
        </View>

        <View >
          <Text style={styles.title}>Phone Number <Text style={{ color: 'red' }}>*</Text></Text>
          <TextInput placeholder="Enter Number"
            value={number}
            onChangeText={(text) => {
              setNumber(text);
              validateField("mobile", text);
            }}
            keyboardType="numeric"
            maxLength={10}
            style={styles.input} />
          {errors.mobile && (
            <Text style={{ color: 'red', marginTop: 4 }}>
              {errors.mobile}
            </Text>
          )}
        </View>


        <View >
          <Text style={styles.title}>Email Id</Text>
          <TextInput placeholder="Enter email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              validateField("email", text);
            }}
            keyboardType="email-address"
            style={styles.input} />
          {errors.email && (
            <Text style={{ color: 'red', marginTop: 4 }}>
              {errors.email}
            </Text>
          )}
        </View>

        <View >
          <Text style={styles.title}>Gender <Text style={{ color: 'red' }}>*</Text></Text>
          <TouchableOpacity
            style={styles.dropdownHeader}
            onPress={() => setOpen(!open)}
          >
            <Text>{selected}</Text>
            <AntDesign name="down" size={18} />
          </TouchableOpacity>
          {errors.gender && (
            <Text style={{ color: 'red', marginTop: 4 }}>
              {errors.gender}
            </Text>
          )}

          {open && (
            <View style={styles.dropdownList}>
              {options.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.option}
                  onPress={() => {
                    setSelected(item);          // ✅ correct state
                    setOpen(false);
                    validateField("gender", item);
                  }}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View >
          <Text style={styles.title}>Relation</Text>
          <TouchableOpacity
            style={styles.dropdownHeader}
            onPress={() => setOpen2(!open2)}
          >
            <Text>{relationtype}</Text>
            <AntDesign name="down" size={18} />
          </TouchableOpacity>
          {errors.relation && (
            <Text style={{ color: 'red', marginTop: 4 }}>
              {errors.relation}
            </Text>
          )}

          {open2 && (
            <View style={[styles.dropdownList, { maxHeight: verticalScale(160) }]}>
              <ScrollView
                nestedScrollEnabled
                showsVerticalScrollIndicator={true}
              >
                {relation.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.option}
                    onPress={() => {
                      setRelationtype(item);
                      setOpen2(false);
                    }}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>


        <TouchableOpacity
          onPress={handleSubmit}
          style={[
            styles.btn,
            { opacity: isFormValid ? 1 : 0.5 }
          ]}
          disabled={!isFormValid}
        >
          <Text style={styles.book}>
            {isEditMode ? "Update" : "Add"}
          </Text>
        </TouchableOpacity>
      </View>
     
    </KeyboardAvoidingView>
  )
}

export default AddFamilyMembers

const styles = StyleSheet.create({
  container: {
    padding: scale(10),
    backgroundColor: '#ffffff',
    flex: 1
  },
  screenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: verticalScale(25),
  },
  screenHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontSize: scale(18),
    fontWeight: '600',
  },
  profile: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: verticalScale(10),
    borderWidth: 1,
    borderColor: "#00000040",
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 6,
  },
  upload: {
    alignItems: 'center',
    flexDirection: 'column',
    gap: scale(6)
  },
  text: {
    color: "#0071E2",
    fontWeight: '800',
    fontSize: scale(18),
    fontStyle: 'normal'
  },
  title: {
    fontSize: scale(20),
    fontWeight: '600',
    color: "#525252",
    marginTop: verticalScale(10),

  },
  input: {
    borderRadius: scale(8),
    borderWidth: scale(1),
    borderColor: "#A4A4A4",
    marginTop: scale(10),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(10),
    marginRight: scale(10)
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A4A4A4',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(10),
    borderRadius: scale(8),
    marginTop: verticalScale(10),
    marginRight: scale(10)
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: verticalScale(5),
    borderRadius: 10,
  },
  option: {
    padding: scale(8),
    borderBottomWidth: 0.5,
    borderColor: '#eee',
    fontSize: scale(20),
    fontWeight: '800'
  },

  btn: {
    borderRadius: scale(10),
    backgroundColor: '#056FD2',
    marginHorizontal: scale(10),
    marginBottom: verticalScale(30),
    marginTop: verticalScale(90),
    // padding: scale(20)
  },
  book: {
    color: '#fff',
    fontSize: scale(16),
    paddingVertical: verticalScale(10),
    textAlign: 'center',
    fontWeight: '600',
  },
})