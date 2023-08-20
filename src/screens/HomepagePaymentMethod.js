import { View, Text, StyleSheet, Image, StatusBar, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState, useRef ,useEffect} from "react";
import Downbar from "../components/Downbar";
import { Colors } from '../../src/constants';
import Navbar from "../components/Navbar";
import BottomSheet from 'react-native-raw-bottom-sheet';

export default function HomepagePaymentMethod({navigation}) {

  const bottomSheetRef1 = useRef(null);

  const bottomSheetRef2 = useRef(null);

  const [cardNumber, setCardNumber] = useState("");
  const [date, setDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");

  const [isFormComplete, setIsFormComplete] = useState(false);

  const checkFormCompletion = () => {
    // Check if all the required fields in the credit card form are filled
    if (cardNumber && date && cvc && name) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  };

  useEffect(() => {
    checkFormCompletion();
  }, [cardNumber, date, cvc, name, ]);
  

  const bottomSheetRef3 = useRef(null);

  const [userName, setUserName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const [isFormComplete2, setIsFormComplete2] = useState(false);

  const checkFormCompletion2 = () => {
    // Check if all the required fields in the credit card form are filled
    if (userName && mobileNumber) {
      setIsFormComplete2(true);
    } else {
      setIsFormComplete2(false);
    }
  };

  useEffect(() => {
    checkFormCompletion2();
  }, [userName, mobileNumber]);

 
  
  const handleCreditCardAdd = () => {
    // Handle credit card addition
    bottomSheetRef2.current.close();
    bottomSheetRef1.current.close();
    clearCreditCardFields();
  };

  const handleEasyPaisaAdd = () => {
    // Handle easy paisa addition
    bottomSheetRef3.current.close();
    bottomSheetRef1.current.close();
    clearEasyPaisaFields();
  };

  const clearCreditCardFields = () => {
    // Clear credit card fields
    setCardNumber("");
    setDate("");
    setCvc("");
    setName("");
  };

  const clearEasyPaisaFields = () => {
    // Clear easy paisa fields
    setUserName("");
    setMobileNumber("");
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor='#fffefe' />
      <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 25, color: 'black', marginTop: 20 }}>Payment Methods</Text>

      {/* Credit card*/}

      <View style={{ borderWidth: 1, borderColor: '#797979', width: 320, height: 120, borderRadius: 20, backgroundColor: Colors.primary, marginTop: 35, padding: 15 }}>
        <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 16, color: 'black', }}>Credit/Debit Card Detials</Text>
        <View style={{ marginLeft: 30, marginTop: 8 }}>
          <Text style={{ color: "#797979", fontSize: 14, marginBottom: 1,color:'grey' }}>Card Number  :  12398 3943780239</Text>
          <Text style={{ color: "#797979", fontSize: 14, marginBottom: 1,color:'grey' }}>Card Holder Name  :  Aisha Noor</Text>
          <Text style={{ color: "#797979", fontSize: 14, marginBottom: 1,color:'grey' }}>MM|YY : 08|25</Text>

        </View>
      </View>

      {/* Easy Paisa */}

      <View style={{ borderWidth: 1, borderColor: '#797979', width: 320, height: 100, borderRadius: 20, backgroundColor: Colors.primary, marginTop: 15, padding: 15 }}>
        <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 16, color: 'black', }}>Easypaisa Card Details</Text>
        <View style={{ marginLeft: 30, marginTop: 8 }}>
          <Text style={{ color: "#797979", fontSize: 14, marginBottom: 1,color:'grey' }}>Mobile Number  :  03313389943</Text>
          <Text style={{ color: "#797979", fontSize: 14, marginBottom: 1,color:'grey' }}>Username  :  Aisha Noor</Text>

        </View>
      </View>

      {/* add button*/}

      <TouchableOpacity style={{ width: 40, height: 40, marginTop: 25, backgroundColor: Colors.primary, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}
        activeOpacity={0.6}
        onPress={() => bottomSheetRef1.current.open()}>
        <Image style={{ width: 32, height: 32 }} source={require('../assets/images/icons/add.png')}></Image>
      </TouchableOpacity>

      {/* other button*/}

      <TouchableOpacity style={{
        width: 130,
        height: 35,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#797979',
        alignSelf: 'center', marginTop: 160
      }} activeOpacity={0.6}
       onPress={() => navigation.navigate("Homepage")}>
        <Text style={{ fontSize: 20, color: 'black' }}>Go Back</Text>
      </TouchableOpacity>

      {/*  Bottom navigation bar */}
      <View style={{ width: "100%", height: 70, position: 'absolute', top: 666, }}>
        <Navbar navigation={navigation}></Navbar>
      </View>

      {/* add button bottom sheet*/}

      <BottomSheet ref={bottomSheetRef1} customStyles={{
        container: {
          height: 250, borderTopStartRadius: 10, borderTopEndRadius: 10, borderTopColor: 'black', borderTopWidth: 1, borderStartColor: 'black', borderStartWidth: 1, borderEndColor: 'black', borderEndWidth: 1,
        },
      }}
        closeOnDragDown={true}>


        <TouchableOpacity style={{
          width: 170,
          height: 40,
          backgroundColor: Colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderRadius: 15,
          borderColor: '#797979',
          alignSelf: 'center', marginTop: 20
        }} activeOpacity={0.6}
          onPress={() => bottomSheetRef2.current.open()} >
          <Text style={{ fontSize: 18, color: 'black' }}>Credit/Debit Card</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{
          width: 170,
          height: 40,
          backgroundColor: Colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderRadius: 15,
          borderColor: '#797979',
          alignSelf: 'center', marginTop: 25
        }} activeOpacity={0.6}
          onPress={() => bottomSheetRef3.current.open()} >
          <Text style={{ fontSize: 18, color: 'black' }}>Easypaisa</Text>
        </TouchableOpacity>

        <View style={{ width: "100%", height: 70, position: 'absolute', top: 193, }}>
          <Navbar navigation={navigation}></Navbar>
        </View>
      </BottomSheet>


      {/* Payment Credit card bottom sheet*/}

      <BottomSheet ref={bottomSheetRef2} customStyles={{
        container: {
          height: 360, borderTopStartRadius: 10, borderTopEndRadius: 10, borderTopColor: 'black', borderTopWidth: 1, borderStartColor: 'black', borderStartWidth: 1, borderEndColor: 'black', borderEndWidth: 1,
        },
      }}
        closeOnDragDown={true}>

        <View style={styles.bottomDrawer}>

          <Text style={{ fontFamily: 'Montserrat-Bold', color: 'black', fontSize: 19, marginBottom: 20 }}>Credit/Debit Card Detials</Text>

          <View style={styles.inputField}>
            <TextInput style={styles.inputArea}
              placeholder='Card Number'
              placeholderTextColor={'grey'}
              autoComplete="off"
              autoCorrect={false}
              autoCapitalize="none"
              value={cardNumber}
              onChangeText={(data) => {
                setCardNumber(data);
                checkFormCompletion();}
              }></TextInput>
          </View>

          <View style={{ width: 310, height: 45, flexDirection: "row", marginTop: 15, justifyContent: "space-between" }}>
            <View style={{
              width: 140,
              height: 41,
              borderWidth: 1,
              borderColor: 'black',
            }}>
              <TextInput style={styles.inputArea}
                placeholder='MM/YY'
                placeholderTextColor={'grey'}
                autoComplete="off"
                autoCorrect={false}
                autoCapitalize="none"
                value={date}
                onChangeText={(data) => {
                  setDate(data);
                  checkFormCompletion();
                  }
                }></TextInput>
            </View>

            <View style={{
              width: 140,
              height: 41,
              borderWidth: 1,
              borderColor: 'black',
            }}>
              <TextInput style={styles.inputArea}
                placeholder='CVC'
                placeholderTextColor={'grey'}
                autoComplete="off"
                autoCorrect={false}
                autoCapitalize="none"
                value={cvc}
                onChangeText={(data) => {
                  setCvc(data);
                  checkFormCompletion();
                  }
                }></TextInput>
            </View>

          </View>

          <View style={[styles.inputField, { marginTop: 15 }]}>
            <TextInput style={styles.inputArea}
              placeholder='Name of card holder'
              placeholderTextColor={'grey'}
              autoComplete="off"
              autoCorrect={false}
              autoCapitalize="none"
              value={name}
              onChangeText={(data) => {
                setName(data);
                checkFormCompletion();}
              }></TextInput>
          </View>


        </View>

        <TouchableOpacity style={{
          width: 130,
          height: 35,
          backgroundColor: isFormComplete ? Colors.primary : '#C0C0C0', 
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderRadius: 15,
          borderColor: '#797979',
          alignSelf: 'center', marginTop: 22
        }} 
        activeOpacity={0.6}
        disabled={!isFormComplete}
        onPress={handleCreditCardAdd}>
          <Text style={{ fontSize: 20, color: 'black' }}>Add</Text>
        </TouchableOpacity>

        <View style={{ width: "100%", height: 70, position: 'absolute', top: 303, }}>
          <Navbar navigation={navigation}></Navbar>
        </View>
      </BottomSheet>


      {/* Payment easy paisa Bottom Sheet */}

      <BottomSheet ref={bottomSheetRef3} customStyles={{
        container: {
          height: 360, borderTopStartRadius: 10, borderTopEndRadius: 10, borderTopColor: 'black', borderTopWidth: 1, borderStartColor: 'black', borderStartWidth: 1, borderEndColor: 'black', borderEndWidth: 1,
        },
      }}
        closeOnDragDown={true}>
        <View style={styles.bottomDrawer}>

          <Text style={{ fontFamily: 'Montserrat-Bold', color: 'black', fontSize: 20, marginBottom: 30, marginTop: 20 }}>Easypaisa Details</Text>

          <View style={styles.inputField}>
            <TextInput style={styles.inputArea}
              placeholder='User Name'
              placeholderTextColor={'grey'}
              autoComplete="off"
              autoCorrect={false}
              autoCapitalize="none"
              value={userName}
              onChangeText={(data) => {
                setUserName(data);
                checkFormCompletion2();}
              }></TextInput>
          </View>



          <View style={[styles.inputField, { marginTop: 15 }]}>
            <TextInput style={styles.inputArea}
              placeholder='Mobile Number'
              placeholderTextColor={'grey'}
              autoComplete="off"
              autoCorrect={false}
              autoCapitalize="none"
              value={mobileNumber}
              onChangeText={(data) => {
                setMobileNumber(data);
                checkFormCompletion2();}
              }></TextInput>
          </View>


        </View>

        <TouchableOpacity style={{
          width: 130,
          height: 35,
          backgroundColor: isFormComplete2 ? Colors.primary : '#C0C0C0',  
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderRadius: 15,
          borderColor: '#797979',
          alignSelf: 'center', marginTop: 10
        }} 
        activeOpacity={0.6} 
        disabled={!isFormComplete2}
        onPress={handleEasyPaisaAdd}>
          <Text style={{ fontSize: 20, color: 'black' }}>Add</Text>
        </TouchableOpacity>

        <View style={{ width: "100%", height: 70, position: 'absolute', top: 303, }}>
          <Navbar navigation={navigation}></Navbar>
        </View>
      </BottomSheet>




    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    position: 'relative'
  },

  bottomDrawer: {
    width: "100%",
    height: 200,
    alignItems: 'center'
  },

  inputField: {
    width: 310,
    height: 41,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10

  },

  inputArea: {
    marginLeft: 6,
    fontSize: 18,
    textDecorationLine: 'none',
    color:'black'

  },


})