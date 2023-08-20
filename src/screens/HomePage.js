import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors} from '../../src/constants';
import homepageData from '../constants/data';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import {useDispatch, useSelector} from 'react-redux';
import {
  STATUSES,
  getRestaurantById,
  getRestaurants,
} from '../redux/reducers/restaurantSlice';
import {getAllDeals} from '../redux/reducers/dealSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCustomer} from '../redux/reducers/auth';

export default function Homepage({navigation}) {
  const [homeData, setHomeData] = useState(homepageData);
  const dispatch = useDispatch();
  const {status, restaurants} = useSelector(state => state.restaurant);
  const {userState} = useSelector(state => state.auth);
  const {deals} = useSelector(state => state.deals);
  const handleSearch = () => {
    navigation.navigate('ViewAll', {data: restaurants});
  };

  let restaurant = [];
  let burger = [];
  let pizza = [];

  useEffect(() => {
    getAllRestaurants();
    getAllDeal();
  }, [dispatch]);

  const getAllDeal = () => {
    dispatch(getAllDeals());
  };
  const getAllRestaurants = () => {
    dispatch(getRestaurants());
  };
  for (let x = 0; x < deals.length; x++) {
    if (x > 5) {
      if (burger.length < 3) {
        burger.push(deals[x]);
      }
    }
  }

  for (let x = 0; x < restaurants.length; x++) {
    if (restaurant.length < 3) {
      if (x == 1 || x == 2 || x == 6) {
        restaurant.push(restaurants[x]);
      }
    }
  }

  for (let x = 0; x < deals.length; x++) {
    if (pizza.length < 3 && x > 1) {
      pizza.push(deals[x]);
    }
  }

  const goToMenuPage = restaurantId => {
    dispatch(getRestaurantById(restaurantId))
      .unwrap()
      .then(item => {
        navigation.navigate('MenuPage', {item});
      })
      .catch(error => {
        console.log(error);
      });
  };

  {
    /* Side menu  */
  }

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const getUser = async () => {
    const customerId = await AsyncStorage.getItem('customerId');
    console.log(customerId);
    const userData = {
      CustomerId: customerId,
    };
    dispatch(getCustomer(userData));
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsModalVisible(false);
    });
    console.log(userState);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#fffefe"
      />

      <View style={{flex: 1, flexDirection: 'row', marginLeft: 0}}>
        <TouchableOpacity onPress={showModal} style={{height: 60}}>
          <Image
            style={{
              width: 60,
              height: 60,
              marginRight: 20,
              marginLeft: 8,
            }}
            source={require('../assets/images/icons/menu-icon.png')}
          />
        </TouchableOpacity>

        {isModalVisible && (
          <Sidebar onClose={hideModal} navigation={navigation} />
        )}

        <Image
          style={{
            width: 45,
            height: 45,
            marginLeft: 5,
          }}
          source={require('../assets/images/icons/logo1.png')}
        />

        <Text
          style={{
            fontSize: 30,
            fontFamily: 'Montserrat-Bold',
            color: 'black',
            marginLeft: 13,
            marginTop: 10,
          }}>
          NextStop
        </Text>

        <TouchableOpacity
          activeOpacity={0.6}
          style={{height: 60}}
          onPress={() => navigation.navigate('UserProfile')}>
          <Image
            style={{
              width: 40,
              height: 40,
              marginLeft: 18,
              marginRight: 15,
              marginTop: 10,
            }}
            source={require('../assets/images/icons/account-logo.png')}
          />
        </TouchableOpacity>
      </View>

      {/* location bar */}

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          borderWidth: 1,
          borderColor: '#797979',
          width: 320,
          height: 40,
          position: 'absolute',
          top: 60,
        }}>
        <Image
          style={{
            width: 30,
            height: 30,
            marginTop: 5,
          }}
          source={require('../assets/images/icons/location-icon.png')}
        />

        <TouchableOpacity activeOpacity={0.6} style={{alignSelf: 'center'}}>
          <Text
            style={{
              color: 'black',
              fontSize: 17,
              marginLeft: 10,
              fontFamily: 'Arimo-Regular',
            }}>
            Set your location using gps
          </Text>
        </TouchableOpacity>
      </View>

      {/* search bar */}
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: Colors.primary,
          borderWidth: 1,
          borderColor: '#797979',
          width: 340,
          height: 55,
          borderRadius: 18,
          position: 'absolute',
          top: 115,
        }}>
        <Image
          style={{
            width: 60,
            height: 40,
            marginTop: 8,
            alignSelf: 'center',
          }}
          source={require('../assets/images/icons/search-icon.png')}
        />

        <TouchableWithoutFeedback onPress={handleSearch}>
          <Text style={{color: 'black', fontSize: 18, marginTop: 13}}>
            Search restaurants
          </Text>
        </TouchableWithoutFeedback>
      </View>

      {/* retaurants row */}

      <View style={{width: 340, height: 150, position: 'absolute', top: 190}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            width: 340,
            height: 55,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              marginLeft: 13,
              color: 'black',
              fontSize: 23,
            }}>
            Your Restaurants
          </Text>
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={() => navigation.navigate('ViewAll', {data: restaurants})}>
            <Text style={{color: 'black', fontSize: 14, color: Colors.primary}}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: 340,
            height: 110,
            position: 'absolute',
            top: 38,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          {status == STATUSES.LOADING ? (
            <ActivityIndicator size="large" />
          ) : (
            restaurant?.map(item => (
              <TouchableOpacity
                key={item.RestaurantsId}
                activeOpacity={0.6}
                style={{width: 95, height: 100, marginLeft: 9, marginRight: 9}}
                onPress={() => navigation.navigate('PreBookingPage', {item})}>
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 20,
                  }}
                  resizeMode="contain"
                  source={{
                    uri: `data:image/png;base64,${item.RestaurantLogo}`,
                  }}
                />
              </TouchableOpacity>
            ))
          )}
        </View>
      </View>

      {/* Pizza row */}

      <View style={{width: 340, height: 150, position: 'absolute', top: 340}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            width: 340,
            height: 55,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              marginLeft: 13,
              color: 'black',
              fontSize: 23,
            }}>
            Pizza
          </Text>
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={() => navigation.navigate('DealsAndDiscount')}>
            <Text style={{color: 'black', fontSize: 14, color: Colors.primary}}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: 340,
            height: 110,
            position: 'absolute',
            top: 38,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          {pizza.map(item => (
            <TouchableOpacity
              key={item.RestaurantDealId}
              activeOpacity={0.6}
              style={{width: 95, height: 100, marginLeft: 9, marginRight: 9}}
              onPress={() => goToMenuPage(item.RestaurantId)}>
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 20,
                }}
                resizeMode="contain"
                source={{
                  uri: `data:image/png;base64,${item.DealIcon}`,
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* burger row */}

      <View style={{width: 340, height: 150, position: 'absolute', top: 490}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            width: 340,
            height: 55,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              marginLeft: 13,
              color: 'black',
              fontSize: 23,
            }}>
            Burger
          </Text>
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={() => navigation.navigate('DealsAndDiscount')}>
            <Text style={{color: 'black', fontSize: 14, color: Colors.primary}}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: 340,
            height: 110,
            position: 'absolute',
            top: 38,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          {burger.map(item => (
            <TouchableOpacity
              key={item.RestaurantDealId}
              activeOpacity={0.6}
              style={{width: 95, height: 100, marginLeft: 9, marginRight: 9}}
              onPress={() => goToMenuPage(item.RestaurantId)}>
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 20,
                }}
                resizeMode="contain"
                source={{
                  uri: `data:image/png;base64,${item.DealIcon}`,
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    position: 'relative',
    backgroundColor: '#fff',
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    width: '80%',
    height: '100%',
    borderColor: '#797979',
    backgroundColor: '#fff',
    borderTopEndRadius: 20,
  },

  modalButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 30,
    height: 30,
    position: 'absolute',
    right: -2,
    top: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  drawerHeader: {
    width: '100%',
    height: 110,
    backgroundColor: Colors.primary,
    borderTopEndRadius: 20,
  },
  drawerContent: {
    flex: 1,
    padding: 10,
  },
  drawerText: {
    fontSize: 16,
  },
});
