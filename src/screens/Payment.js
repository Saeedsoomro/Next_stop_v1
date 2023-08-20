import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {Colors} from '../../src/constants';
import Navbar from '../components/Navbar';
import BottomSheet from 'react-native-raw-bottom-sheet';
import CheckBox from '@react-native-community/checkbox';
import Toast from 'react-native-toast-message';
// import {useStripe} from '@stripe/stripe-react-native';

import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {createOrder, getPreviousOrders} from '../redux/reducers/orderSlice';
import {STATUSES} from '../redux/reducers/restaurantSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Payment({navigation, route}) {
  const {cartItems, cartLength, item, total} = route.params;
  const {userState} = useSelector(state => state.auth);
  const {status} = useSelector(state => state.order);
  const dispatch = useDispatch();
  // const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [voucherCode, setVoucherCode] = useState('');

  const bottomSheetRef1 = useRef(null);

  const [cardNumber, setCardNumber] = useState('');
  const [date, setDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [agree1, setAgree1] = useState(false);

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
  }, [cardNumber, date, cvc, name, agree1]);

  const bottomSheetRef2 = useRef(null);

  const [userName, setUserName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [agree2, setAgree2] = useState(false);

  const [isFormComplete2, setIsFormComplete2] = useState(false);

  const onCheckout = async () => {
    // 1. Create a payment intent
    const response = await axios.post(
      'http://localhost:3000/api/order/intents',
      {
        amount: Math.floor(total * 100),
      },
    );
    console.log(response);
    // if (response.error) {
    //   Alert.alert('Something went wrong');
    //   return;
    // }

    // 2. Initialize the Payment sheet
    // const initResponse = await initPaymentSheet({
    //   merchantDisplayName: 'notJust.dev',
    //   paymentIntentClientSecret: response.data.paymentIntent,
    // });
    // if (initResponse.error) {
    //   console.log(initResponse.error);
    //   Alert.alert('Something went wrong');
    //   return;
    // }

    // 3. Present the Payment Sheet from Stripe
    // const paymentResponse = await presentPaymentSheet();

    // if (paymentResponse.error) {
    //   Alert.alert(
    //     `Error code: ${paymentResponse.error.code}`,
    //     paymentResponse.error.message
    //   );
    //   return;
    // }

    // 4. If payment ok -> create the order
    // onCreateOrder();
  };

  const checkFormCompletion2 = () => {
    // Check if all the required fields in the credit card form are filled
    if (userName && mobileNumber) {
      setIsFormComplete2(true);
    } else {
      setIsFormComplete2(false);
    }
  };

  const handlePlaceOrder = () => {
    if (userState) {
      cartItems.map(cartItem => {
        const totalPrice = cartItem.item.Price * cartItem.quantity;
        const orderDetails = {
          restaurantMenuId: cartItem.item.RestaurantsMenuId,
          customerId: userState.CustomerId,
          restaurantId: cartItem.item.RestaurantId,
          restaurantOrderQty: cartItem.quantity,
          restaurantOrderPrice: totalPrice,
        };
        console.log(orderDetails);
        dispatch(createOrder(orderDetails))
          .unwrap()
          .then(async data => {
            // console.log(data);
            Toast.show({
              type: 'success',
              text1: 'Success',
              text2: 'Order successful !',
            });
            await AsyncStorage.removeItem(cartItem.item.RestaurantId);
            // navigation.navigate('Homepage');
          })
          .catch(error => {
            console.log(error);
            Toast.show({
              type: 'Error',
              text1: 'Error',
              text2: error,
            });
          });
      });
    } else {
      navigation.navigate('Login');
    }
  };

  useEffect(() => {
    checkFormCompletion2();
  }, [userName, mobileNumber, agree2]);

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#fffefe"
      />

      {/* back button */}

      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          width: 45,
          height: 45,
          position: 'absolute',
          left: 10,
          top: 10,
          borderWidth: 1,
          borderRadius: 30,
          borderColor: 'black',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() =>
          navigation.navigate('Cart', {item, cartItems, cartLength})
        }>
        <Image
          style={{width: 35, height: 25}}
          source={require('../assets/images/icons/back-arrow2.png')}></Image>
      </TouchableOpacity>

      <Text
        style={{
          fontFamily: 'Montserrat-Bold',
          color: 'black',
          fontSize: 28,
          marginTop: 12,
          marginLeft: 15,
        }}>
        Payment
      </Text>

      {/* order summary */}

      <View
        style={{width: '92%', height: 'auto', position: 'relative', top: 30}}>
        <Text
          style={{fontFamily: 'Montserrat-Bold', color: 'black', fontSize: 20}}>
          Order Summary
        </Text>

        <View
          style={{
            borderWidth: 1,
            borderColor: '#797979',
            width: '100%',
            marginTop: 15,
            padding: 12,
            alignSelf: 'center',
            borderRadius: 18,
            backgroundColor: Colors.primary,
            justifyContent: 'center',
          }}>
          {cartItems.map(orderItem =>
            Array(orderItem.quantity)
              .fill(null)
              .map((_, index) => (
                <View
                  key={`${orderItem.item.RestaurantsMenuId}_${index}`}
                  style={{
                    width: '86%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Bold',
                      color: 'black',
                      fontSize: 16,
                    }}>
                    {orderItem.item.MenuName}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Bold',
                      color: 'black',
                      fontSize: 16,
                    }}>
                    Rs. {orderItem.item.Price}
                  </Text>
                </View>
              )),
          )}

          <View
            style={{
              width: '86%',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                color: 'black',
                fontSize: 16,
                alignSelf: 'center',
                marginRight: 15,
              }}>
              Total
            </Text>
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                color: 'black',
                fontSize: 16,
                alignSelf: 'center',
              }}>
              Rs. {total}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: '#797979',
            width: '100%',
            height: 50,
            marginTop: 20,
            alignSelf: 'center',
            borderRadius: 18,
            backgroundColor: Colors.primary,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              color: 'black',
              fontSize: 16,
              alignSelf: 'center',
              marginRight: 10,
            }}>
            Apply a voucher
          </Text>

          <TextInput
            style={{
              width: 150,
              height: 40,
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: '#797979',
              borderRadius: 13,
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 16,
            }}
            value={voucherCode}
            autoComplete="off"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={data => setVoucherCode(data)}></TextInput>
        </View>
      </View>

      {/* Payment Method */}

      <View style={{width: '92%', height: 170, position: 'relative', top: 40}}>
        <Text
          style={{fontFamily: 'Montserrat-Bold', color: 'black', fontSize: 20}}>
          Payment Method
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            borderWidth: 1,
            borderColor: '#797979',
            width: '60%',
            height: 45,
            marginTop: 20,
            alignSelf: 'center',
            borderRadius: 20,
            backgroundColor: Colors.primary,
            justifyContent: 'center',
          }}
          onPress={() => bottomSheetRef1.current.open()}>
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              color: 'black',
              fontSize: 16,
              alignSelf: 'center',
            }}>
            Credit\Debit Card
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            borderWidth: 1,
            borderColor: '#797979',
            width: '60%',
            height: 45,
            marginTop: 20,
            alignSelf: 'center',
            borderRadius: 20,
            backgroundColor: Colors.primary,
            justifyContent: 'center',
          }}
          onPress={() => bottomSheetRef2.current.open()}>
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              color: 'black',
              fontSize: 16,
              alignSelf: 'center',
            }}>
            Easy Paisa
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            borderWidth: 1,
            borderColor: '#797979',
            width: '60%',
            height: 45,
            marginTop: 20,
            alignSelf: 'center',
            borderRadius: 20,
            backgroundColor: Colors.primary,
            justifyContent: 'center',
          }}
          onPress={handlePlaceOrder}>
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              color: 'black',
              fontSize: 16,
              alignSelf: 'center',
            }}>
            {status === STATUSES.LOADING ? (
              <ActivityIndicator color="black" size="large" />
            ) : (
              'Cash'
            )}
          </Text>
        </TouchableOpacity>
      </View>

      {/* credit card Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef1}
        customStyles={{
          container: {
            height: 380,
            borderTopStartRadius: 10,
            borderTopEndRadius: 10,
            borderTopColor: 'black',
            borderTopWidth: 1,
            borderStartColor: 'black',
            borderStartWidth: 1,
            borderEndColor: 'black',
            borderEndWidth: 1,
          },
        }}
        closeOnDragDown={true}>
        <View style={styles.bottomDrawer}>
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              color: 'black',
              fontSize: 20,
              marginBottom: 20,
            }}>
            Credit/Debit Card Detials
          </Text>

          <View style={styles.inputField}>
            <TextInput
              style={styles.inputArea}
              placeholder="Card Number"
              placeholderTextColor={'grey'}
              autoComplete="off"
              autoCorrect={false}
              autoCapitalize="none"
              value={cardNumber}
              onChangeText={data => {
                setCardNumber(data);
                checkFormCompletion();
              }}></TextInput>
          </View>

          <View
            style={{
              width: 310,
              height: 45,
              flexDirection: 'row',
              marginTop: 15,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: 140,
                height: 41,
                borderWidth: 1,
                borderColor: 'black',
              }}>
              <TextInput
                style={styles.inputArea}
                placeholder="MM/YY"
                placeholderTextColor={'grey'}
                autoComplete="off"
                autoCorrect={false}
                autoCapitalize="none"
                value={date}
                onChangeText={data => {
                  setDate(data);
                  checkFormCompletion();
                }}></TextInput>
            </View>

            <View
              style={{
                width: 140,
                height: 41,
                borderWidth: 1,
                borderColor: 'black',
              }}>
              <TextInput
                style={styles.inputArea}
                placeholder="CVC"
                placeholderTextColor={'grey'}
                autoComplete="off"
                autoCorrect={false}
                autoCapitalize="none"
                value={cvc}
                onChangeText={data => {
                  setCvc(data);
                  checkFormCompletion();
                }}></TextInput>
            </View>
          </View>

          <View style={[styles.inputField, {marginTop: 15}]}>
            <TextInput
              style={styles.inputArea}
              placeholder="Name of card holder"
              placeholderTextColor={'grey'}
              autoComplete="off"
              autoCorrect={false}
              autoCapitalize="none"
              value={name}
              onChangeText={data => {
                setName(data);
                checkFormCompletion();
              }}></TextInput>
          </View>

          {/* Privacy checkbox */}

          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <CheckBox
              value={agree1}
              onValueChange={() => {
                setAgree1(!agree1);
                checkFormCompletion();
              }}
            />

            <Text style={{color: 'black', fontSize: 15}}>
              Save this card for faster checkout next time
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            width: 130,
            height: 35,
            backgroundColor: isFormComplete ? Colors.primary : '#C0C0C0',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderRadius: 15,
            borderColor: '#797979',
            alignSelf: 'center',
            marginTop: 50,
          }}
          activeOpacity={0.6}
          disabled={!isFormComplete}
          onPress={() => navigation.navigate('Tracking')}>
          <Text style={{fontSize: 20, color: 'black'}}>Pay</Text>
        </TouchableOpacity>

        <View
          style={{width: '100%', height: 70, position: 'absolute', top: 323}}>
          <Navbar navigation={navigation}></Navbar>
        </View>
      </BottomSheet>

      {/* easy paisa Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef2}
        customStyles={{
          container: {
            height: 360,
            borderTopStartRadius: 10,
            borderTopEndRadius: 10,
            borderTopColor: 'black',
            borderTopWidth: 1,
            borderStartColor: 'black',
            borderStartWidth: 1,
            borderEndColor: 'black',
            borderEndWidth: 1,
          },
        }}
        closeOnDragDown={true}>
        <View style={styles.bottomDrawer}>
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              color: 'black',
              fontSize: 20,
              marginBottom: 20,
            }}>
            Easypaisa
          </Text>

          <View style={styles.inputField}>
            <TextInput
              style={styles.inputArea}
              placeholder="User Name"
              placeholderTextColor={'grey'}
              autoComplete="off"
              autoCorrect={false}
              autoCapitalize="none"
              value={userName}
              onChangeText={data => {
                setUserName(data);
                checkFormCompletion();
              }}></TextInput>
          </View>

          <View style={[styles.inputField, {marginTop: 15}]}>
            <TextInput
              style={styles.inputArea}
              placeholder="Mobile Number"
              placeholderTextColor={'grey'}
              autoComplete="off"
              autoCorrect={false}
              autoCapitalize="none"
              value={mobileNumber}
              onChangeText={data => {
                setMobileNumber(data);
                checkFormCompletion();
              }}></TextInput>
          </View>

          {/* Privacy checkbox */}

          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <CheckBox
              value={agree2}
              onValueChange={() => {
                setAgree2(!agree2);
                checkFormCompletion();
              }}
            />

            <Text style={{color: 'black', fontSize: 15}}>
              Save this number for faster checkout next time
            </Text>
          </View>
        </View>
        <View style={styles.bottomDrawer}>
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              color: 'black',
              fontSize: 20,
              marginBottom: 20,
            }}>
            Easypaisa
          </Text>

          <View style={styles.inputField}>
            <TextInput
              style={styles.inputArea}
              placeholder="User Name"
              placeholderTextColor={'grey'}
              autoComplete="off"
              autoCorrect={false}
              autoCapitalize="none"
              value={userName}
              onChangeText={data => {
                setUserName(data);
                checkFormCompletion();
              }}></TextInput>
          </View>

          <View style={[styles.inputField, {marginTop: 15}]}>
            <TextInput
              style={styles.inputArea}
              placeholder="Mobile Number"
              placeholderTextColor={'grey'}
              autoComplete="off"
              autoCorrect={false}
              autoCapitalize="none"
              value={mobileNumber}
              onChangeText={data => {
                setMobileNumber(data);
                checkFormCompletion();
              }}></TextInput>
          </View>

          {/* Privacy checkbox */}

          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <CheckBox
              value={agree2}
              onValueChange={() => {
                setAgree2(!agree2);
                checkFormCompletion();
              }}
            />

            <Text style={{color: 'black', fontSize: 15}}>
              Save this number for faster checkout next time
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            width: 130,
            height: 35,
            backgroundColor: isFormComplete2 ? Colors.primary : '#C0C0C0',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderRadius: 15,
            borderColor: '#797979',
            alignSelf: 'center',
            marginTop: 10,
          }}
          activeOpacity={0.6}
          disabled={!isFormComplete2}
          onPress={() => navigation.navigate('Tracking')}>
          <Text style={{fontSize: 20, color: 'black'}}>Pay</Text>
        </TouchableOpacity>

        <View
          style={{width: '100%', height: 70, position: 'absolute', top: 303}}>
          <Navbar navigation={navigation}></Navbar>
        </View>
      </BottomSheet>

      {/*  Bottom navigation bar */}
      <View style={{width: '100%', height: 70, position: 'absolute', top: 666}}>
        <Navbar navigation={navigation}></Navbar>
      </View>
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
  input: {
    height: 40,
    padding: 10,
  },
  bottomDrawer: {
    width: '100%',
    height: 200,
    alignItems: 'center',
  },

  inputField: {
    width: 310,
    height: 41,
    borderWidth: 1,
    borderColor: 'black',
  },

  inputArea: {
    marginLeft: 6,
    fontSize: 18,
    textDecorationLine: 'none',
    color: 'black',
  },
});
