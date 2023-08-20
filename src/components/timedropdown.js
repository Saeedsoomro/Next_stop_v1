import React, { useState } from "react";
import { View } from "react-native";
import {Picker} from '@react-native-picker/picker';


const TimeDropDown = () => {
  const [selectedValue1, setSelectedValue1] = useState("11:00am-12:00pm");
  return (
    <View>
         <Picker
      selectedValue={selectedValue1}
      style={{ height: 50, width: 190,  
           }}
      onValueChange={(itemValue, itemIndex) => setSelectedValue1(itemValue)}
    >
      <Picker.Item label="11:00am-12:00pm" value="11:00am-12:00pm" />
      <Picker.Item label="12:00pm-01:00pm" value="12:00pm-01:00pm" />
      <Picker.Item label="01:00pm-02:00pm" value="01:00pm-02:00pm" />
      <Picker.Item label="02:00pm-03:00pm" value="02:00pm-03:00pm" />
      <Picker.Item label="03:00pm-04:00pm" value="03:00pm-04:00pm" />
      <Picker.Item label="04:00pm-05:00pm" value="04:00pm-05:00pm" />
      <Picker.Item label="05:00pm-06:00pm" value="05:00pm-06:00pm" />
      <Picker.Item label="06:00pm-07:00pm" value="06:00pm-07:00pm" />
      <Picker.Item label="07:00pm-08:00pm" value="07:00pm-08:00pm" />
      <Picker.Item label="08:00pm-09:00pm" value="08:00pm-09:00pm" />
      <Picker.Item label="09:00pm-10:00pm" value="09:00pm-10:00pm" />
      <Picker.Item label="10:00pm-11:00pm" value="10:00pm-11:00pm" />
      <Picker.Item label="11:00pm-12:00am" value="11:00pm-12:00am" />
    </Picker>
    </View>
   
  );
};

export default TimeDropDown;