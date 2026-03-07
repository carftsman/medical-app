import React, { useEffect, useState } from "react";
import {
View,
Text,
StyleSheet,
Modal,
TouchableOpacity,
TouchableWithoutFeedback,
ActivityIndicator,
TextInput,
ScrollView
} from "react-native";

import Slider from "@react-native-community/slider";
import { hospitalApi } from "../../../api/hospitalApi";
import { scale, verticalScale } from "../../../utils/styling";
import { COLORS, SIZES, FONT } from "../../../config/constants";

const HospitalFilterPopup = ({
visible,
onClose,
onApply,
latitude,
longitude
}) => {

const [specialities,setSpecialities] = useState([]);
const [selectedSpecialities,setSelectedSpecialities] = useState([]);

const [ratings,setRatings] = useState([]);
const [popular,setPopular] = useState(false);

const [sortBy,setSortBy] = useState("distance");
const [distance,setDistance] = useState(8);

const [stateName,setStateName] = useState("");
const [cityName,setCityName] = useState("");

const [openNow,setOpenNow] = useState(false);
const [open24x7,setOpen24x7] = useState(false);

const [loading,setLoading] = useState(false);
const [dataLoading,setDataLoading] = useState(false);

const [allHospitals,setAllHospitals] = useState([]);

useEffect(()=>{

if(!visible) return;

const loadData = async()=>{

try{

setDataLoading(true);

const res = await hospitalApi.getNearbyHospitals({
latitude,
longitude,
radius:50,
page:1,
limit:100
});

const hospitals = res?.data?.data || [];

setAllHospitals(hospitals);

const uniqueSpecialities = [
...new Set(
hospitals
.map(h => h.speciality)
.filter(Boolean)
)
];

setSpecialities(uniqueSpecialities);

}
catch(err){
console.log("Load error",err);
}
finally{
setDataLoading(false);
}

};

loadData();

},[visible]);

const toggleSpeciality = item => {

setSelectedSpecialities(prev =>
prev.includes(item)
? prev.filter(x=>x!==item)
: [...prev,item]
);

};

const toggleRating = range => {

setRatings(prev =>
prev.includes(range)
? prev.filter(r=>r!==range)
: [...prev,range]
);

};

const handleClearAll = ()=>{

setSelectedSpecialities([]);
setRatings([]);
setPopular(false);
setDistance(8);
setSortBy("distance");
setStateName("");
setCityName("");
setOpenNow(false);
setOpen24x7(false);

};

const handleApply = ()=>{

try{

setLoading(true);

let hospitals=[...allHospitals];

/* SPECIALITY FILTER */

if(selectedSpecialities.length>0){

hospitals = hospitals.filter(h =>
selectedSpecialities.includes(h.speciality)
);

}

/* RATING FILTER */

if(ratings.length > 0){

hospitals = hospitals.filter(hospital => {

const rating = hospital.rating || 0;

return ratings.some(range => {

const [min,max] = range.split("-").map(Number);

return rating >= min && rating < max + 1;

});

});

}

/* POPULARITY FILTER */

if(popular){
hospitals = hospitals.filter(h => (h.popularity || 0) >= 50);
}

/* LOCATION */

if(stateName){

hospitals = hospitals.filter(h =>
h.state?.toLowerCase().includes(stateName.toLowerCase())
);

}

if(cityName){

hospitals = hospitals.filter(h =>
h.city?.toLowerCase().includes(cityName.toLowerCase())
);

}

/* OPEN NOW */

if(openNow){
hospitals = hospitals.filter(h => h.isOpen);
}

/* 24/7 */

if(open24x7){
hospitals = hospitals.filter(h => h.open24x7);
}

/* DISTANCE */

hospitals = hospitals.filter(h => (h.distance || 0) <= distance);

/* SORT */

if(sortBy==="rating"){
hospitals.sort((a,b)=>(b.rating||0)-(a.rating||0));
}

if(sortBy==="popularity"){
hospitals.sort((a,b)=>(b.popularity||0)-(a.popularity||0));
}

if(sortBy==="distance"){
hospitals.sort((a,b)=>(a.distance||0)-(b.distance||0));
}

onApply(hospitals);
onClose();

}
catch(err){
console.log("Filter error",err);
}
finally{
setLoading(false);
}

};

return(

<Modal visible={visible} transparent animationType="slide">

<TouchableWithoutFeedback onPress={onClose}>
<View style={styles.overlay}/>
</TouchableWithoutFeedback>

<View style={styles.container}>

<View style={styles.headerRow}>
<Text style={styles.title}>Filters</Text>

<TouchableOpacity onPress={handleClearAll}>
<Text style={styles.clearText}>Clear All</Text>
</TouchableOpacity>
</View>

<ScrollView showsVerticalScrollIndicator={false}>

<Text style={styles.section}>Sort</Text>

<View style={styles.rowWrap}>
{["distance","rating","popularity"].map(item => (

<Chip
key={item}
text={item}
active={sortBy===item}
onPress={()=>setSortBy(item)}
/>

))}
</View>

<Text style={styles.section}>Rating</Text>

<View style={styles.rowWrap}>

{["0-1","1-2","2-3","3-4","4-5"].map(item => (

<CheckBox
key={item}
label={item}
checked={ratings.includes(item)}
onPress={()=>toggleRating(item)}
/>

))}

</View>

<Text style={styles.section}>Popular</Text>

<CheckBox
label="Highly Popular Hospitals"
checked={popular}
onPress={()=>setPopular(!popular)}
/>

<Text style={styles.section}>Location</Text>

<View style={styles.locationRow}>

<TextInput
placeholder="State"
value={stateName}
onChangeText={setStateName}
style={styles.locationInput}
/>

<TextInput
placeholder="City"
value={cityName}
onChangeText={setCityName}
style={styles.locationInput}
/>

</View>

<Text style={styles.section}>Speciality</Text>

{dataLoading
? <ActivityIndicator/>
: <View style={styles.rowWrap}>

{specialities.map(item => (

<Chip
key={item}
text={item}
active={selectedSpecialities.includes(item)}
onPress={()=>toggleSpeciality(item)}
/>

))}

</View>
}

<Text style={styles.section}>
Distance ({distance} km)
</Text>

<Slider
minimumValue={1}
maximumValue={50}
step={1}
value={distance}
onValueChange={setDistance}
minimumTrackTintColor="#056FD2"
thumbTintColor="#056FD2"
/>

<Text style={styles.section}>Availability</Text>

<CheckBox
label="Open Now"
checked={openNow}
onPress={()=>setOpenNow(!openNow)}
/>

<CheckBox
label="Available 24/7"
checked={open24x7}
onPress={()=>setOpen24x7(!open24x7)}
/>

</ScrollView>

<View style={styles.bottomRow}>

<TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
{loading
? <ActivityIndicator color="#FFF"/>
: <Text style={styles.applyText}>Apply</Text>
}
</TouchableOpacity>

<TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
<Text style={styles.cancelText}>Cancel</Text>
</TouchableOpacity>

</View>

</View>

</Modal>

);

};

const Chip = ({text,active,onPress}) => (

<TouchableOpacity
onPress={onPress}
style={[styles.chip,active && styles.chipActive]}
>
<Text style={[styles.chipText,active && styles.chipTextActive]}>
{text}
</Text>
</TouchableOpacity>

);

const CheckBox = ({label,checked,onPress}) => (

<TouchableOpacity style={styles.checkboxRow} onPress={onPress}>

<View style={[styles.checkbox,checked && styles.checked]}>
{checked && <Text style={styles.tick}>✓</Text>}
</View>

<Text style={styles.checkboxLabel}>{label}</Text>

</TouchableOpacity>

);

export default HospitalFilterPopup;
const styles = StyleSheet.create({

overlay:{
flex:1,
backgroundColor:"rgba(0,0,0,0.4)"
},

container:{
backgroundColor:COLORS.white,
paddingHorizontal:scale(20),
paddingTop:verticalScale(16),
paddingBottom:verticalScale(20),
borderTopLeftRadius:scale(24),
borderTopRightRadius:scale(24),
maxHeight:"85%"
},

headerRow:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
marginBottom:verticalScale(14)
},

title:{
fontSize:scale(SIZES.large),
fontFamily:FONT.bold,
color:COLORS.primary
},

clearText:{
fontSize:scale(SIZES.small),
fontFamily:FONT.medium,
color:COLORS.primary
},

section:{
fontSize:scale(SIZES.medium),
fontFamily:FONT.medium,
color:COLORS.black,
marginTop:verticalScale(18),
marginBottom:verticalScale(10)
},

rowWrap:{
flexDirection:"row",
flexWrap:"wrap",
gap:scale(10)
},

chip:{
backgroundColor:COLORS.white,
paddingHorizontal:scale(16),
paddingVertical:verticalScale(8),
borderRadius:scale(20),
borderWidth:1,
borderColor:COLORS.primary
},

chipActive:{
backgroundColor:COLORS.primary
},

chipText:{
fontSize:scale(13),
fontFamily:FONT.medium,
color:COLORS.primary
},

chipTextActive:{
color:COLORS.white
},

locationRow:{
flexDirection:"row",
gap:scale(12)
},

locationInput:{
flex:1,
height:verticalScale(44),
borderWidth:1,
borderColor:COLORS.primary,
borderRadius:scale(12),
paddingHorizontal:scale(12),
fontFamily:FONT.regular
},

checkboxRow:{
flexDirection:"row",
alignItems:"center",
marginTop:verticalScale(10)
},

checkbox:{
width:scale(22),
height:scale(22),
borderWidth:2,
borderColor:COLORS.primary,
borderRadius:6,
alignItems:"center",
justifyContent:"center",
marginRight:scale(12)
},

checked:{
backgroundColor:COLORS.primary
},

tick:{
color:COLORS.white,
fontSize:scale(12),
fontFamily:FONT.bold
},

checkboxLabel:{
fontSize:scale(14),
fontFamily:FONT.medium,
color:COLORS.black
},

bottomRow:{
flexDirection:"row",
gap:scale(12),
marginTop:verticalScale(12)
},

applyBtn:{
flex:1,
height:verticalScale(48),
backgroundColor:COLORS.primary,
borderRadius:scale(28),
alignItems:"center",
justifyContent:"center"
},

applyText:{
color:COLORS.white,
fontSize:scale(SIZES.medium),
fontFamily:FONT.bold
},

cancelBtn:{
flex:1,
height:verticalScale(48),
backgroundColor:"#EEF4FF",
borderRadius:scale(28),
alignItems:"center",
justifyContent:"center"
},

cancelText:{
color:COLORS.primary,
fontSize:scale(SIZES.medium),
fontFamily:FONT.bold
}

});