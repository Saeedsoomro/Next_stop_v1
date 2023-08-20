import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import {Colors} from '../constants';
import Navbar from '../components/Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cart({route, navigation}) {
  const {cartItems, cartLength, item} = route.params;
  const {
    Rating,
    distance,
    IsOpen,
    RestaurantsName,
    RestaurantsId,
    RestaurantLogo,
  } = item;
  const [subtotal, setSubtotal] = useState(0);
  const gst = 107; // Fixed GST value

  useEffect(() => {
    let total = 0;
    for (const cartItem of cartItems) {
      const itemPrice = cartItem.item.Price * cartItem.quantity;
      total += itemPrice;
    }
    setSubtotal(total);
  }, [cartItems]);

  const total = subtotal + gst;

  const removeCartItem = async itemId => {
    const updatedCartItems = cartItems.filter(
      cartItem => cartItem.item.RestaurantsMenuId !== itemId,
    );
    const updatedCartLength = updatedCartItems.length;
    await AsyncStorage.setItem(RestaurantsId, JSON.stringify(updatedCartItems));
    navigation.setParams({
      cartItems: updatedCartItems,
      cartLength: updatedCartLength,
    });
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#fffefe"
      />

      <View style={{flexDirection: 'row'}}>
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
          onPress={() => navigation.navigate('Homepage')}>
          <Image
            style={{width: 35, height: 25}}
            source={require('../assets/images/icons/back-arrow2.png')}></Image>
        </TouchableOpacity>

        <Text
          style={{
            position: 'absolute',
            left: 150,
            top: 15,
            color: 'black',
            fontFamily: 'Montserrat-Bold',
            fontSize: 26,
          }}>
          Cart
        </Text>
      </View>

      <View
        style={{
          width: '91%',
          height: 50,
          marginLeft: 'auto',
          marginRight: 'auto',
          flexDirection: 'row',
          justifyContent: 'space-between',
          position: 'relative',
          top: 80,
        }}>
        <Text
          style={{color: 'black', fontSize: 17, fontFamily: 'Montserrat-Bold'}}>
          Your Order
        </Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() =>
            navigation.navigate('MenuPage', {item, cartItems, cartLength, item})
          }>
          <Text style={{color: 'red', fontSize: 15}}>+Add Item(s)</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 70, width: '100%', height: 530}}>
        <ScrollView style={{marginBottom: 5}}>
          {/* restaurant detail */}

          <View style={{flexDirection: 'row', width: '91%', height: 100}}>
            <View
              activeOpacity={0.6}
              style={{width: 80, height: 80, marginLeft: 12, marginRight: 8}}>
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 20,
                }}
                resizeMode="contain"
                source={{
                  uri: `data:image/png;base64,${RestaurantLogo}`,
                }}
              />
            </View>

            <View>
              <Text
                style={{
                  fontSize: 20,
                  color: 'black',
                  fontFamily: 'Montserrat-Bold',
                  marginTop: 15,
                }}>
                {RestaurantsName}
              </Text>
              <View
                style={{
                  width: 120,
                  height: 20,
                  flexDirection: 'row',
                  marginTop: 8,
                }}>
                <Text style={{color: 'black', fontSize: 13}}>
                  {Math.round(Rating)}
                </Text>
                <Image
                  style={{
                    width: 13,
                    height: 13,
                    marginTop: 2,
                  }}
                  source={require('../assets/images/icons/black-star.png')}
                />
              </View>
            </View>
          </View>

          {/* cart items */}

          {cartItems?.map(cartItem => (
            <View
              key={
                cartItem.item.RestaurantsMenuId
                  ? cartItem.item.RestaurantsMenuId
                  : cartItem.item.RestaurantDealId
              }>
              <View
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: '#797979',
                  width: 340,
                  height: 100,
                  borderRadius: 18,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  alignItems: 'center',
                  backgroundColor: Colors.primary,
                  marginBottom: 10,
                }}>
                <View
                  style={{
                    width: 80,
                    height: 75,
                    marginLeft: 9,
                    marginRight: 9,
                  }}>
                  <Image
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 20,
                    }}
                    resizeMode="contain"
                    source={{
                      uri: `data:image/png;base64,${
                        cartItem.item.MenuImage || cartItem.item.DealIcon
                      }`,
                    }}
                  />
                </View>

                <View style={{width: 200, height: 60, marginTop: -8}}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Bold',
                      color: 'black',
                      fontSize: 15,
                      marginBottom: 5,
                    }}>
                    {cartItem.item.MenuName
                      ? cartItem.item.MenuName
                      : cartItem.item.RestaurantDealName}
                  </Text>
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      top: -6,
                      right: -35,
                      width: 30,
                      alignItems: 'center',
                    }}
                    onPress={() =>
                      removeCartItem(cartItem.item.RestaurantsMenuId)
                    }>
                    <Text
                      style={{fontFamily: 'Montserrat-Bold', color: 'black'}}>
                      X
                    </Text>
                  </TouchableOpacity>

                  <Text style={{fontSize: 14, marginBottom: 5, color: 'grey'}}>
                    {cartItem.item.size} Pounds
                  </Text>
                  <View
                    style={{
                      width: 120,
                      height: 20,
                      marginTop: -5,
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{color: 'black', marginRight: 10, fontSize: 13}}>
                      Rs. {cartItem.item.Price}
                    </Text>
                    {cartItem.item.discountprice ? (
                      <Text
                        style={{
                          textDecorationLine: 'line-through',
                          fontSize: 13,
                          color: 'grey',
                        }}>
                        Rs. {cartItem.item.discountprice}
                      </Text>
                    ) : null}
                  </View>
                  <View
                    style={{
                      width: 120,
                      height: 20,
                      marginTop: -5,
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{color: 'black', marginRight: 8, fontSize: 13}}>
                      Quantity :
                    </Text>
                    <Text style={{fontSize: 13, color: 'black'}}>
                      {cartItem.quantity}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 90,
                      height: 20,
                      position: 'absolute',
                      top: 50,
                      right: -18,
                      flexDirection: 'row',
                    }}>
                    <Image
                      style={styles.imageStyle}
                      source={require('../assets/images/icons/person-icon.png')}
                    />
                    <Image
                      style={styles.imageStyle}
                      source={require('../assets/images/icons/person-icon.png')}
                    />
                    <Image
                      style={styles.imageStyle}
                      source={require('../assets/images/icons/person-icon.png')}
                    />
                    <Image
                      style={styles.imageStyle}
                      source={require('../assets/images/icons/person-icon.png')}
                    />
                  </View>
                </View>
              </View>
            </View>
          ))}

          {/* cart total */}

          {cartItems.length > 0 ? (
            <View style={styles.cartTotalBox}>
              <View style={styles.cartTotalBoxTextContainer}>
                <Text style={styles.cartTotalBoxText}>Subtotal</Text>
                <Text style={styles.cartTotalBoxText}>GST</Text>
                <Text style={styles.cartTotalBoxText}>SST</Text>
                <Text style={styles.cartTotalBoxText}>Total</Text>
              </View>

              <View style={[styles.cartTotalBoxTextContainer, {marginLeft: 7}]}>
                <Text style={styles.cartTotalBoxText}>
                  Rs. {subtotal.toFixed(2)}
                </Text>
                <Text style={styles.cartTotalBoxText}>
                  Rs. {gst.toFixed(2)}
                </Text>
                <Text style={styles.cartTotalBoxText}>Rs. 00.00</Text>
                <Text style={styles.cartTotalBoxText}>
                  Rs. {total.toFixed(2)}
                </Text>
              </View>
            </View>
          ) : (
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 18,
                color: 'gray',
                marginTop: 120,
              }}>
              No items in cart
            </Text>
          )}

          {cartItems.length > 0 && (
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate('Payment', {
                  item,
                  cartItems,
                  cartLength,
                  item,
                  total,
                })
              }>
              <Text style={{fontSize: 20, color: 'black'}}>Let's Pay</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>

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
    backgroundColor: '#fff',
  },
  imageStyle: {
    width: 25,
    height: 20,
  },

  cartTotalBox: {
    width: '80%',
    height: 200,
    borderWidth: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderColor: '#797979',
    backgroundColor: '#fff', // set the background color of the view
    borderRadius: 10, // set the border radius to create rounded corners
    shadowColor: 'rgba(0, 0, 0, 0.8)', // set the shadow color
    shadowOffset: {width: 0, height: 2}, // set the shadow offset
    shadowOpacity: 0.5, // set the shadow opacity
    shadowRadius: 4, // set the shadow radius
    elevation: 5, // set the elevation to achieve the same effect on Android
    marginTop: 20,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cartTotalBoxTextContainer: {
    width: '50%',
    height: 45,
    flexDirection: 'column',
    textAlign: 'left',
  },
  cartTotalBoxText: {
    color: 'black',
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    width: 140,
    height: 40,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#797979',
    alignSelf: 'center',
    marginTop: 30,
  },
});
