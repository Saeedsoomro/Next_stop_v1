import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {Colors} from '../constants';
import Navbar from '../components/Navbar';
import BottomSheet from 'react-native-raw-bottom-sheet';
import {Picker} from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useDispatch, useSelector} from 'react-redux';
import {STATUSES, addPreBooking} from '../redux/reducers/menuSlice';
import Toast from 'react-native-toast-message';
import {addFavoriteRestaurants} from '../redux/reducers/restaurantSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getReviewsByRestaurants} from '../redux/reducers/reviewSlice';

export default function PreBookingPage({navigation, route}) {
  const {item} = route.params;
  const {
    Rating,
    distance,
    IsOpen,
    RestaurantsName,
    RestaurantsId,
    RestaurantLogo,
  } = item;
  const dispatch = useDispatch();
  const {status} = useSelector(state => state.menu);
  const {favoriteRestaurants} = useSelector(state => state.restaurant);
  const {userState} = useSelector(state => state.auth);
  const {restaurantsReviews} = useSelector(state => state.review);
  const [cartItems, setCartItems] = useState([]);
  const [cartLength, setCartLength] = useState(0);
  const [totalReview, setTotalReview] = useState(restaurantsReviews.length);

  const handleSearch = () => {
    // Perform search logic here and update the searchedItem state
    navigation.navigate('MenuPage', {item, cartItems, cartLength});
  };

  const [selectedValue, setSelectedValue] = useState('1');
  const [selectedValue1, setSelectedValue1] = useState('11:00am-12:00pm');

  {
    /* Date input box */
  }
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const dateConfirm = date => {
    const dt = new Date(date);
    const x = dt.toISOString().split('T');
    const x1 = x[0].split('-');
    setSelectedDate(x1[0] + '-' + x1[1] + '-' + x1[2]);
    hideDatePicker();
  };

  {
    /* star rating logic */
  }
  //const rating = navigation.getParam("rating");
  const stars = [];
  for (let i = 0; i < Math.round(Rating || 3); i++) {
    stars.push(
      <Image
        key={i}
        source={require('../assets/images/icons/star.png')}
        style={styles.reviewStar}
      />,
    );
  }

  const bottomSheetRef = useRef(null);

  const handleAddPreBooking = () => {
    if (selectedDate == null) {
      Alert.alert('please select date');
    } else {
      const preBookingData = {
        restaurantId: RestaurantsId,
        customerId: userState.CustomerId,
        numberOfSeats: selectedValue,
        bookingDate: selectedDate,
        bookingTime: '11:00',
        isConfirmed: 0,
      };
      console.log(preBookingData);
      dispatch(addPreBooking(preBookingData))
        .unwrap()
        .then(data => {
          Toast.show({
            type: 'success',
            text1: 'success',
            text2: 'Thanks for booking',
          });
          setSelectedValue('');
          setSelectedDate('');
          setSelectedValue1('');
        })
        .catch(error => {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: error,
          });
        });
    }
  };

  const isFavorite = favoriteRestaurants.some(
    favItem => favItem.RestaurantsId === RestaurantsId,
  );

  const handleAddFavourite = () => {
    dispatch(addFavoriteRestaurants(item));
  };

  const getCartItems = async () => {
    try {
      const storedCartItems = await AsyncStorage.getItem(RestaurantsId);
      if (storedCartItems) {
        const cartItems = JSON.parse(storedCartItems);
        setCartItems(cartItems);
        setCartLength(cartItems.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartItems();
    dispatch(getReviewsByRestaurants(RestaurantsId));
    console.log(item);
  }, []);

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
        onPress={() => navigation.navigate('Homepage')}>
        <Image
          style={{width: 35, height: 25}}
          source={require('../assets/images/icons/back-arrow2.png')}></Image>
      </TouchableOpacity>

      {/* search bar */}

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: Colors.primary,
          borderWidth: 1,
          borderColor: '#797979',
          width: 240,
          height: 40,
          borderRadius: 18,
          position: 'absolute',
          left: 66,
          top: 13,
        }}>
        <Image
          style={{
            width: 45,
            height: 30,
            marginTop: 8,
            alignSelf: 'center',
          }}
          source={require('../assets/images/icons/search-icon.png')}
        />

        <TouchableWithoutFeedback onPress={handleSearch}>
          <Text style={{color: 'black', fontSize: 18, marginTop: 5}}>
            Search food
          </Text>
        </TouchableWithoutFeedback>
      </View>
      {/* bag icon */}
      <TouchableOpacity
        style={{position: 'absolute', top: 10, right: 5, width: 40, height: 40}}
        onPress={() => navigation.navigate('Cart', {cartItems, item})}>
        <Image
          style={{width: 40, height: 40}}
          source={require('../assets/images/icons/bag-icon.png')}
        />
        {/* cart count */}

        {cartLength >= 1 ? (
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 20,
              backgroundColor: '#fff',
              position: 'absolute',
              top: 20,
              right: 0,
              marginTop: 5,
              borderWidth: 1,
              borderColor: 'black',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'black', fontSize: 12}}>{cartLength}</Text>
          </View>
        ) : null}
      </TouchableOpacity>

      {/* Restaurant Detail section */}

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 120,
          position: 'absolute',
          top: 70,
        }}>
        <View style={{width: 110, height: 120, marginLeft: 12, marginRight: 8}}>
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

        <View style={{width: 225, height: 120}}>
          <Text
            style={{
              fontSize: 24,
              color: 'black',
              fontFamily: 'Montserrat-Bold',
            }}>
            {RestaurantsName}
          </Text>

          <View style={{flexDirection: 'row', width: 220, height: 90}}>
            <View style={{width: 160, height: 90}}>
              <View
                style={{
                  flexDirection: 'row',
                  maxWidth: 160,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                {stars}
              </View>
              <Text style={{fontSize: 13, color: 'grey'}}>
                {distance} away | {totalReview > 30 ? '30+' : totalReview}{' '}
                Reviews
              </Text>
              <Text style={IsOpen === 1 ? styles.openText : styles.closedText}>
                {IsOpen === 1 ? 'Open Now' : 'Closed'}
              </Text>
            </View>
            <View
              style={{
                width: 60,
                height: 90,
                justifyContent: 'center',
                paddingLeft: 19,
              }}>
              <TouchableOpacity onPress={handleAddFavourite}>
                <Image
                  style={{
                    width: 40,
                    height: 40,
                  }}
                  source={
                    isFavorite
                      ? require('../assets/images/icons/heart.png')
                      : require('../assets/images/icons/whiteHeart.png')
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* top navigation bar */}

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 40,
          position: 'absolute',
          top: 210,
        }}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={{
            width: '33%',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 2.5,
            borderBottomColor: Colors.primary,
          }}>
          <Text style={styles.topnavbarText}>Pre-booking</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.topNavbar}
          activeOpacity={0.6}
          onPress={() =>
            navigation.navigate('MenuPage', {item, cartItems, cartLength})
          }>
          <Text style={styles.topnavbarText}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.topNavbar}
          activeOpacity={0.6}
          onPress={() =>
            navigation.navigate('ReviewPage', {item, cartItems, cartLength})
          }>
          <Text style={styles.topnavbarText}>Review</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.topNavbar}
          activeOpacity={0.6}
          onPress={() =>
            navigation.navigate('About', {item, cartItems, cartLength})
          }>
          <Text style={styles.topnavbarText}>About</Text>
        </TouchableOpacity>
      </View>

      {/* seat selection  */}

      <View
        style={{
          backgroundColor: Colors.primary,
          width: 250,
          height: 45,
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 20,
          position: 'absolute',
          top: 300,
          marginLeft: 'auto',
          marginRight: 'auto',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 16, color: 'black', fontFamily: 'Arimo-Bold'}}>
          Number of Seats
        </Text>

        <View
          style={{
            width: 90,
            height: 30,
            borderWidth: 1,
            borderColor: '#d3c5c7',
            borderRadius: 7,
            backgroundColor: '#f7ecec',
            justifyContent: 'center',
            marginLeft: 8,
          }}>
          <Picker
            selectedValue={selectedValue}
            style={{
              height: 50,
              width: 100,
            }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }>
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
            <Picker.Item label="7" value="7" />
            <Picker.Item label="8" value="8" />
            <Picker.Item label="9" value="9" />
            <Picker.Item label="10" value="10" />
            <Picker.Item label="11" value="11" />
            <Picker.Item label="12" value="12" />
            <Picker.Item label="13" value="13" />
            <Picker.Item label="14" value="14" />
            <Picker.Item label="15" value="15" />
            <Picker.Item label="16" value="16" />
            <Picker.Item label="17" value="17" />
            <Picker.Item label="18" value="18" />
            <Picker.Item label="19" value="19" />
            <Picker.Item label="20" value="20" />
          </Picker>
        </View>
      </View>

      {/* date selection  */}

      <View
        style={{
          backgroundColor: Colors.primary,
          width: 250,
          height: 45,
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 20,
          position: 'absolute',
          top: 385,
          marginLeft: 'auto',
          marginRight: 'auto',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 16, color: 'black', fontFamily: 'Arimo-Bold'}}>
          Date
        </Text>

        <View
          style={{
            width: 180,
            height: 30,
            borderWidth: 1,
            borderColor: '#d3c5c7',
            borderRadius: 7,
            backgroundColor: '#f7ecec',
            justifyContent: 'center',
            marginLeft: 8,
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: 190,
              height: 28,
              alignItems: 'center',
            }}>
            <View style={{width: 150}}>
              <Text style={{color: 'black', fontSize: 16, marginLeft: 15}}>
                {selectedDate}
              </Text>
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
                source={require('../assets/images/icons/calender-icon.png')}
              />
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={dateConfirm}
              onCancel={hideDatePicker}
            />
          </View>
        </View>
      </View>

      {/* time selection  */}

      <View
        style={{
          backgroundColor: Colors.primary,
          width: 250,
          height: 45,
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 20,
          position: 'absolute',
          top: 470,
          marginLeft: 'auto',
          marginRight: 'auto',
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 15,
        }}>
        <Text style={{fontSize: 16, color: 'black', fontFamily: 'Arimo-Bold'}}>
          Time
        </Text>

        <View
          style={{
            width: 180,
            height: 30,
            borderWidth: 1,
            borderColor: '#d3c5c7',
            borderRadius: 7,
            backgroundColor: '#f7ecec',
            justifyContent: 'center',
            marginLeft: 8,
          }}>
          <Picker
            selectedValue={selectedValue1}
            style={{
              height: 50,
              width: 190,
            }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue1(itemValue)
            }>
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
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: Colors.primary,
          width: 160,
          height: 40,
          borderWidth: 1,
          borderColor: '#d3c5c7',
          borderRadius: 15,
          position: 'absolute',
          top: 560,
          marginLeft: 'auto',
          marginRight: 'auto',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        activeOpacity={0.6}
        onPress={() => bottomSheetRef.current.open()}>
        <Text style={{fontSize: 18, color: 'black'}}>Book</Text>
      </TouchableOpacity>

      {/* Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        customStyles={{
          container: {
            height: 300,
            borderTopStartRadius: 10,
            borderStartColor: 'black',
            borderStartWidth: 1,
            borderEndColor: 'black',
            borderEndWidth: 1,
            borderTopEndRadius: 10,
            borderTopColor: 'black',
            borderTopWidth: 1,
          },
        }}
        closeOnDragDown={true}>
        <View style={styles.bottomDrawer}>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.primary,
              width: 190,
              height: 40,
              borderWidth: 1,
              borderColor: '#d3c5c7',
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}
            onPress={handleAddPreBooking}
            activeOpacity={0.6}>
            <Text style={{fontSize: 18, color: 'black'}}>
              {status === STATUSES.LOADING ? (
                <ActivityIndicator color="black" size="large" />
              ) : (
                'Book'
              )}
            </Text>
          </TouchableOpacity>

          <View style={styles.line1}></View>
          <Text
            style={{
              fontSize: 18,
              color: '#333333',
              position: 'absolute',
              top: 78,
              color: 'grey',
            }}>
            or
          </Text>
          <View style={styles.line2}></View>

          <TouchableOpacity
            style={{
              backgroundColor: Colors.primary,
              width: 190,
              height: 40,
              borderWidth: 1,
              borderColor: '#d3c5c7',
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 60,
            }}
            activeOpacity={0.6}
            onPress={() =>
              navigation.navigate('MenuPage', {item, cartItems, cartLength})
            }>
            <Text style={{fontSize: 18, color: 'black'}}>
              Order with booking
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{width: '100%', height: 70, position: 'absolute', top: 243}}>
          <Navbar navigation={navigation}></Navbar>
        </View>
      </BottomSheet>

      {/*  Bottom navigation bar */}

      <View style={{width: '100%', height: 70, position: 'absolute', top: 665}}>
        <Navbar navigation={navigation}></Navbar>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    position: 'relative',
    backgroundColor: '#fff',
  },

  openText: {
    color: 'green',
    fontSize: 17,
  },
  closedText: {
    color: 'red',
    fontSize: 17,
  },

  topNavbar: {
    width: '23%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2.5,
  },

  topnavbarText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: 'black',
  },

  navbar: {
    position: 'relative',
    borderTopWidth: 2.5,
    width: '20%',
    height: 45,
    alignItems: 'center',
  },

  navbarImage: {
    width: 50,
    height: 60,
    position: 'absolute',
    top: -9,
  },

  reviewStar: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  bottomDrawer: {
    width: '100%',
    height: 200,
    alignItems: 'center',
  },
  line1: {
    width: 125,
    backgroundColor: '#797979',
    borderWidth: 0.3,
    borderColor: '#797979',
    position: 'absolute',
    top: 90,
    left: 35,
    color: 'grey',
  },
  line2: {
    width: 125,
    backgroundColor: '#797979',
    borderWidth: 0.3,
    borderColor: '#797979',
    position: 'absolute',
    top: 90,
    right: 35,
    color: 'grey',
  },
});
