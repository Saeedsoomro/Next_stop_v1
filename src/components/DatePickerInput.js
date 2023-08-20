import { View, Text, StyleSheet, Image, StatusBar, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";





export default function DatePickerInput() {

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate]=useState();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const dateConfirm = (date) => {
    const dt = new Date(date);
    const x = dt.toISOString().split('T');
    const x1 = x[0].split('-');
   setSelectedDate(x1[2] + "/" + x1[1] + "/" + x1[0]);
    hideDatePicker();
  };

  return (


    <View style={{ flexDirection: 'row', width: 190, height: 28, alignItems: 'center'}}>
      <View style={{ width: 150 }}>
        <Text style={{color:'black', fontSize:16, marginLeft:15}}>{selectedDate}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          showDatePicker();
        }}>
        <Image
          style={{
            width: 22,
            height: 22,


          }}
          source={require('../assets/images/icons/calender-icon.png')} />
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={dateConfirm}
        onCancel={hideDatePicker}
      />
    </View>





  );



}

const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    width: 190,
    height: 28,
    alignItems: 'center'



  }

})

