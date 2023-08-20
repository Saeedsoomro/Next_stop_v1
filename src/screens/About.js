import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {Colors} from '../constants';
import Downbar from '../components/Downbar';
import Navbar from '../components/Navbar';
import BottomSheet from 'react-native-raw-bottom-sheet';
import {Picker} from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useDispatch, useSelector} from 'react-redux';
import {
  addFavoriteRestaurants,
  getRestaurantById,
  getRestaurantsTimings,
} from '../redux/reducers/restaurantSlice';
import {useEffect} from 'react';
import {getReviewsByRestaurants} from '../redux/reducers/reviewSlice';
import {getCustomer} from '../redux/reducers/auth';

export default function About({navigation, route}) {
  const {item} = route.params;
  const {
    Rating,
    distance,
    IsOpen,
    RestaurantsName,
    RestaurantsId,
    RestaurantLogo,
  } = item;
  const {favoriteRestaurants, restaurantsTimings, restaurantState} =
    useSelector(state => state.restaurant);
  const {restaurantsReviews} = useSelector(state => state.review);
  const [totalReview, setTotalReview] = useState(restaurantsReviews.length);
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const dispatch = useDispatch();
  const {cartItems = [], cartLength} = route.params;

  const handleSearch = () => {
    // Perform search logic here and update the searchedItem state
    navigation.navigate('MenuPage', {item, cartItems, cartLength});
  };

  const isOpen = 'Open Now';

  {
    /* star rating logic */
  }
  //const rating = 5;
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

  const isFavorite = favoriteRestaurants.some(
    favItem => favItem.RestaurantsId === RestaurantsId,
  );
  const handleAddFavourite = () => {
    dispatch(addFavoriteRestaurants(item));
  };

  useEffect(() => {
    dispatch(getReviewsByRestaurants(RestaurantsId));
    dispatch(getRestaurantsTimings(RestaurantsId));
    getRestaurant();
  }, [dispatch]);

  const getRestaurant = () => {
    dispatch(getRestaurantById(RestaurantsId))
      .unwrap()
      .then(data => {
        setRestaurantDetails(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

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
        onPress={() =>
          navigation.navigate('Cart', {cartItems, cartLength, item})
        }>
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

      {/* bag icon */}
      <TouchableOpacity
        style={{position: 'absolute', top: 10, right: 5, width: 40, height: 40}}
        onPress={() =>
          navigation.navigate('Cart', {cartItems, cartLength, item})
        }>
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
          style={[styles.topNavbar, {width: '33%'}]}
          onPress={() =>
            navigation.navigate('PreBookingPage', {item, cartItems, cartLength})
          }>
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
          style={{
            width: '23%',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 2.5,
            borderBottomColor: Colors.primary,
          }}
          activeOpacity={0.6}>
          <Text style={styles.topnavbarText}>About</Text>
        </TouchableOpacity>
      </View>

      {/* About */}

      <View
        style={{width: '90%', height: 'auto', position: 'absolute', top: 270}}>
        <Text style={[styles.topnavbarText, {fontSize: 15, marginBottom: 3}]}>
          About
        </Text>
        <Text style={{color: 'grey'}}>{restaurantDetails.About}</Text>
      </View>

      {/* Address */}
      {/* Contact Details */}

      <View
        style={{width: '90%', height: 'auto', position: 'absolute', top: 340}}>
        <Text style={[styles.topnavbarText, {fontSize: 15, marginBottom: 3}]}>
          Contact Details
        </Text>
        <Text style={{marginLeft: 25, color: 'grey'}}>
          {restaurantDetails.ContactNo}
        </Text>
      </View>
      {/* Open Hours */}

      <View
        style={{width: '90%', height: 'auto', position: 'absolute', top: 390}}>
        <Text style={[styles.topnavbarText, {fontSize: 15, marginBottom: 5}]}>
          Open Hours
        </Text>
        {restaurantsTimings?.map(timings => (
          <View
            key={timings.RestaurantsTimingId}
            style={{
              width: '80%',
              height: 'auto',
              flexDirection: 'row',
              alignSelf: 'center',
            }}>
            <View style={{width: '40%'}}>
              <Text style={{padding: 5, color: 'grey'}}>
                {timings.RestaurantOpenDays}
              </Text>
            </View>

            <View style={{width: '60%'}}>
              <View style={{padding: 5, flexDirection: 'row', width: '100%'}}>
                <Image
                  style={{width: 20, height: 20, marginRight: 3}}
                  source={require('../assets/images/icons/clock-icon.png')}
                />
                <Text style={{color: 'grey'}}>
                  {timings.RestaurantsOpenTiming}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

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
});
