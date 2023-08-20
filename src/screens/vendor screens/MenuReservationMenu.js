import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {Colors} from '../../constants';
import Downbar from '../../components/Downbar';
import {ScrollView} from 'react-native-gesture-handler';
import menu from '../../constants/data';
import MenuDetailBottomsheet from '../../components/MenuDetailBottomsheet';
import SidebarAdminSide from '../../components/SidebarAdminSide';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {STATUSES, getRestaurantMenu} from '../../redux/reducers/menuSlice';
import {getDealsByRestaurant} from '../../redux/reducers/dealSlice';

export default function MenuReservationMenu({navigation}) {
  {
    /* Side menu  */
  }
  const dispatch = useDispatch();
  const {status, restaurantsMenu} = useSelector(state => state.menu);
  const {restaurantState} = useSelector(state => state.restaurant);
  const {restaurantsDeals} = useSelector(state => state.deals);

  useEffect(() => {
    dispatch(getRestaurantMenu(restaurantState?.RestaurantsId));
    dispatch(getDealsByRestaurant(restaurantState?.RestaurantsId));
  }, []);

  const RestaurantName = 'Hobnob';

  const firstLetter = RestaurantName.substring(0, 1);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  // bottomsheet component

  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const [selectedItem, setSelectedItem] = useState([]);

  // Function to handle item selection to bottomsheet
  const handleItemPress = item => {
    setSelectedItem(item);
    setBottomSheetVisible(true);
  };

  const menu1 = [
    {
      index: 1,
      name: 'Lotus Three Milk Cake',
      size: 2,
      price: 1800,
      discountprice: 1599,
      orderCount: '12',
      imgsrc: require('../../assets/images/food-images/cake1.jpg'),
    },
    {
      index: 2,
      name: 'Lotus Three Milk Cake',
      size: 2,
      price: 1800,
      discountprice: 1599,
      orderCount: '20',
      imgsrc: require('../../assets/images/food-images/cake1.jpg'),
    },
  ];

  const menu2 = [
    {
      index: 1,
      name: 'Lotus Three Milk Cake',
      size: 2,
      price: 1800,
      orderCount: '12',
      discountprice: '12',
      imgsrc: require('../../assets/images/food-images/cake1.jpg'),
    },
    {
      index: 2,
      name: 'Lotus Three Milk Cake',
      size: 2,
      price: 1800,
      orderCount: '20',
      discountprice: '12',
      imgsrc: require('../../assets/images/food-images/cake1.jpg'),
    },
  ];

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
            source={require('../../assets/images/icons/menu-icon.png')}
          />
        </TouchableOpacity>

        {isModalVisible && (
          <SidebarAdminSide onClose={hideModal} navigation={navigation} />
        )}

        <Image
          style={{
            width: 45,
            height: 45,
          }}
          source={require('../../assets/images/icons/logo1.png')}
        />

        <Text
          style={{
            fontSize: 30,
            fontFamily: 'Montserrat-Bold',
            color: 'black',
            marginLeft: 10,
            marginTop: 10,
            marginRight: 13,
          }}>
          NextStop
        </Text>

        <TouchableOpacity
          activeOpacity={0.6}
          style={{height: 60}}
          onPress={() => navigation.navigate('HomepageProfile')}>
          <Image
            style={{
              width: 40,
              height: 40,
              marginLeft: 18,
              marginRight: 15,
              marginTop: 10,
            }}
            source={require('../../assets/images/icons/account-logo.png')}
          />
        </TouchableOpacity>
      </View>

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
              uri: `data:image/png;base64,${restaurantState?.RestaurantLogo}`,
            }}
          />
        </View>

        <View style={{width: 225, height: 120}}>
          <Text
            style={{
              fontSize: 24,
              color: 'black',
              fontFamily: 'Montserrat-Bold',
              marginTop: 15,
            }}>
            {restaurantState?.RestaurantsName}
          </Text>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate('Information')}>
            <Text
              style={{
                fontSize: 15,
                color: '#5fb3f6',
                textDecorationLine: 'underline',
                marginLeft: 20,
                marginTop: 10,
              }}>
              View More
            </Text>
          </TouchableOpacity>
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
          style={[styles.topNavbar, {width: '40%'}]}
          onPress={() => navigation.navigate('MenuReservationSeats')}>
          <Text style={styles.topnavbarText}>Pre-booking</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '30%',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 2.5,
            borderBottomColor: Colors.primary,
          }}
          activeOpacity={0.6}>
          <Text style={styles.topnavbarText}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.topNavbar}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('MenuReservationAddItems')}>
          <Text style={styles.topnavbarText}>Add Items</Text>
        </TouchableOpacity>
      </View>

      {/* Scroll items*/}

      <View
        style={{
          marginTop: 230,
          width: '100%',
          height: 400,
          position: 'absolute',
          top: 40,
        }}>
        <ScrollView style={{marginBottom: 5}}>
          {/* Discount and Deals*/}

          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: 'black',
              fontFamily: 'Montserrat-Bo0ld',
              marginBottom: 10,
              marginLeft: 15,
            }}>
            Discounts & Deals
          </Text>

          {restaurantsDeals?.map(item => (
            <View key={item.RestaurantDealId}>
              <TouchableOpacity
                key={item.RestaurantDealId}
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: '#797979',
                  width: 340,
                  height: 85,
                  borderRadius: 18,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  alignItems: 'center',
                  backgroundColor: '#ffe979',
                  marginBottom: 10,
                }}
                onPress={() => handleItemPress(item)}>
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
                      uri: `data:image/png;base64,${item.DealIcon}`,
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
                    {item.RestaurantDealName}
                  </Text>
                  <Text style={{fontSize: 14, marginBottom: 5, color: 'grey'}}>
                    {item.size} Pounds
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
                      Rs. {item.Price}
                    </Text>
                    <Text
                      style={{
                        textDecorationLine: 'line-through',
                        fontSize: 13,
                        color: 'grey',
                      }}>
                      Rs. {item.Price + (item.Price * 15) / 100}
                    </Text>
                  </View>
                </View>
                {/* order count 

                <View style={{ width: 35, height: 35, borderRadius: 20, backgroundColor: 'black', position: 'absolute', top: -14, right: -6, marginTop: 5, borderWidth: 1, borderColor: '#797979', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: 'white', fontSize: 15 }}>1</Text>
                </View>

                */}
              </TouchableOpacity>
            </View>
          ))}

          {/* food item*/}

          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: 'black',
              fontFamily: 'Montserrat-Bo0ld',
              marginBottom: 10,
              marginLeft: 15,
            }}>
            Cakes
          </Text>

          {status === STATUSES.LOADING ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            restaurantsMenu.map(item => (
              <View
                key={item.RestaurantsMenuId}
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: '#797979',
                  width: 340,
                  height: 85,
                  borderRadius: 18,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  alignItems: 'center',
                  backgroundColor: '#ffe979',
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
                      uri: `data:image/png;base64,${item.MenuImage}`,
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
                    {item.MenuName}
                  </Text>
                  <Text style={{fontSize: 14, marginBottom: 5, color: 'grey'}}>
                    {item.size} Pounds
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
                      Rs. {item.Price}
                    </Text>
                  </View>

                  {/* order count */}

                  <View
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: 20,
                      backgroundColor: 'black',
                      position: 'absolute',
                      top: -20,
                      right: -45,
                      marginTop: 5,
                      borderWidth: 1,
                      borderColor: '#797979',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{color: 'white', fontSize: 15}}>
                      {item.MenuQty}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={{
                      width: 80,
                      height: 25,
                      position: 'absolute',
                      top: 40,
                      right: -18,
                      backgroundColor: Colors.primary,
                      borderColor: '#797979',
                      borderWidth: 1,
                      borderRadius: 6,
                      justifyContent: 'center',
                    }}
                    onPress={() => handleItemPress(item)}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 15,
                        alignSelf: 'center',
                      }}>
                      Details
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>

      {/*  Bottom navigation bar */}

      <View style={{width: '100%', height: 70, position: 'absolute', top: 665}}>
        <View
          style={{width: '100%', height: 56, backgroundColor: Colors.primary}}>
          <View
            style={{flex: 1, flexDirection: 'row', width: '100%', height: 55}}>
            <TouchableOpacity
              style={styles.navbar}
              activeOpacity={0.6}
              onPress={() => navigation.navigate('HomepageVendor')}>
              <Image
                style={{
                  width: 48,
                  height: 55,
                  position: 'absolute',
                  top: -9,
                }}
                source={require('../../assets/images/icons/homepage-icon.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.6}
              style={{
                position: 'relative',
                width: '20%',
                height: 45,
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: 35,
                  height: 35,
                  position: 'absolute',
                  top: 3,
                }}
                source={require('../../assets/images/icons/order-history-icon.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navbar}
              activeOpacity={0.6}
              onPress={() => navigation.navigate('OrderTrackingToday')}>
              <Image
                style={{
                  width: 37,
                  height: 37,
                  position: 'absolute',
                  top: 2,
                }}
                source={require('../../assets/images/icons/nav-icon1.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navbar}
              activeOpacity={0.6}
              onPress={() => navigation.navigate('ReviewTimelineVendors')}>
              <Image
                style={{
                  width: 40,
                  height: 40,
                  position: 'absolute',
                  top: 2,
                }}
                source={require('../../assets/images/icons/clock-icon.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navbar}
              activeOpacity={0.6}
              onPress={() => navigation.navigate('Information')}>
              <Image
                style={{
                  width: 34,
                  height: 34,
                  position: 'absolute',
                  top: 5,
                }}
                source={require('../../assets/images/icons/nav-icon2.png')}
              />
            </TouchableOpacity>
          </View>

          <Downbar></Downbar>
        </View>
      </View>

      {/* Bottom Sheet */}

      <MenuDetailBottomsheet
        isVisible={isBottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        selectedItem={selectedItem}
        navigation={navigation}
      />
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

  topNavbar: {
    width: '30%',
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
  },
  line2: {
    width: 125,
    backgroundColor: '#797979',
    borderWidth: 0.3,
    borderColor: '#797979',
    position: 'absolute',
    top: 90,
    right: 35,
  },

  modalContainer1: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent1: {
    width: '80%',
    height: '100%',
    borderColor: '#797979',
    backgroundColor: '#fff',
    borderTopEndRadius: 20,
  },

  modalButton1: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 30,
    height: 30,
    position: 'absolute',
    right: -2,
    top: 10,
  },
  modalButtonText1: {
    color: 'white',
    fontSize: 16,
  },
  drawerHeader1: {
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
  bottomsheetButton: {
    width: 100,
    height: 32,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 70,
  },
});
