import { View, Text, StyleSheet, Image, StatusBar, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState, useRef } from "react";
import { Colors } from '../../src/constants';
import Navbar from "../components/Navbar";
import menu from "../constants/data";
import { ScrollView } from "react-native-gesture-handler";
import BottomSheet from 'react-native-raw-bottom-sheet';


export default function OTPVerification({navigation}) {

  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");

  const OTP = `${input1}${input2}${input3}${input4}`
 

  const submit = () => {
    if (input1 == "") {
      Alert.alert('Please enter the full code')
    }
    else if (input2 == "") {
      Alert.alert('Please enter the full code')
    }
    else if (input3 == "") {
      Alert.alert('Please enter the full code')
    }
    else if (input4 == "") {
      Alert.alert('Please enter the full code')
    }
    else {
      navigation.navigate("Homepage")
    }

   

  }



    return (


      <View style={styles.mainContainer}>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor='#fffefe' />

        <Text style={{ color: 'black', fontFamily: 'Montserrat-Bold', fontSize: 30, position: 'absolute', top: 100 }}>Verification Code</Text>
        <Text style={{ fontFamily: 'Arimo-Italic', color: 'black', fontSize: 16, position: 'absolute', top: 150 }}>please enter the verification code</Text>
        <Text style={{ fontFamily: 'Arimo-Italic', color: 'black', fontSize: 16, position: 'absolute', top: 170 }}>sent on XXXX-XXXXXXX</Text>

        {/* Input boxes */}

        <View style={{ width: 300, height: 70, position: 'absolute', top: 250, flexDirection: 'row', justifyContent: 'space-between' }}>

          <View style={{ width: 60, height: 60, borderWidth: 1, borderColor: '#797979', borderRadius: 8, backgroundColor: Colors.primary }}>
            <TextInput style={{ width: 60, height: 60, textAlign: 'center', fontSize: 26, textAlignVertical: "top", }}
              autoComplete="off"
              autoCorrect={false}
              autoCapitalize="none"
              value={input1}
              onChangeText={(data) => setInput1(data)
              }></TextInput>
          </View>

          <View style={{ width: 60, height: 60, borderWidth: 1, borderColor: '#797979', borderRadius: 8, backgroundColor: Colors.primary }}>
            <TextInput style={{ width: 60, height: 60, textAlign: 'center', fontSize: 26 }}
              autoComplete="off"
              autoCorrect={false}
              autoCapitalize="none"
              value={input2}
              onChangeText={(data) => setInput2(data)
              }></TextInput>
          </View>

          <View style={{ width: 60, height: 60, borderWidth: 1, borderColor: '#797979', borderRadius: 8, backgroundColor: Colors.primary }}>
            <TextInput style={{ width: 60, height: 60, textAlign: 'center', fontSize: 26 }}
              autoComplete="off"
              autoCorrect={false}
              autoCapitalize="none"
              value={input3}
              onChangeText={(data) => setInput3(data)
              }></TextInput>
          </View>

          <View style={{ width: 60, height: 60, borderWidth: 1, borderColor: '#797979', borderRadius: 8, backgroundColor: Colors.primary }}>
            <TextInput style={{ width: 60, height: 60, textAlign: 'center', fontSize: 26 }}
              autoComplete="off"
              autoCorrect={false}
              autoCapitalize="none"
              value={input4}
              onChangeText={(data) => setInput4(data)
              }></TextInput>
          </View>

        </View>


        <View style={{ width: 300, height: 70, position: 'absolute', top: 390, alignItems: "center" }}>

          <Text style={{ fontFamily: 'Arimo-Italic', fontSize: 18, }}>Didn't recieve OTP?</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={{ fontFamily: 'Arimo-Bold', fontSize: 18, color: 'black' }}>Resend OTP?</Text>
          </TouchableOpacity>


          <View style={styles.line1}></View>

        </View>


        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => { submit() }}>
          <Text style={{ fontSize: 18, color: 'black' }}>Submit</Text>
        </TouchableOpacity>


      </View>
    );
  }

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      boxSizing: 'border-box',
      position: 'relative',
      backgroundColor: '#fff',
    },
    line1: {
      width: 140,
      backgroundColor: '#797979',
      borderWidth: 0.3,
      borderColor: '#797979',
      marginTop: 5
    },
    button: {
      width: 150,
      height: 40,
      backgroundColor: Colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      position: 'absolute',
      top: 520
    },



  })