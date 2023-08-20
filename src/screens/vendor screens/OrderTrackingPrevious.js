import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {Colors} from '../../constants';
import Downbar from '../../components/Downbar';
import OrderTrackingPreviousBottomsheet from '../../components/OrderTrackingPreviousBottomsheet';
import SidebarAdminSide from '../../components/SidebarAdminSide';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {getPreviousOrders} from '../../redux/reducers/orderSlice';

export default function OrderTrackingPrevious({navigation}) {
  // bottomsheet component

  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const {restaurantState} = useSelector(state => state.restaurant);
  const {previousOrders} = useSelector(state => state.order);
  const dispatch = useDispatch();

  // Function to handle item selection to bottomsheet
  const handleItemPress = item => {
    setSelectedItem(item);
    setBottomSheetVisible(true);
  };
  useEffect(() => {
    dispatch(getPreviousOrders(restaurantState?.RestaurantsId));
  }, [restaurantState]);

  const data = [
    {
      index: 1,
      orderItemList: ['1x Three Milk Cake', '1x Three Milk Cake'],
      total: 1706,
      seats: 0,
      subtotal: 1599,
      gst: 107,
      sst: 0,
      customerName: 'Khadija Noor',
      status: 'Completed',
      timePeriod: 'Yesterday',
    },

    {
      index: 2,
      orderItemList: ['1x Three Milk Cake'],
      total: 150,
      seats: 1,
      customerName: 'salman',
      status: 'Completed',
      timePeriod: '12/17/2022',
    },
    {
      index: 3,
      orderItemList: ['1x Three Milk Cake', '1x Three Milk Cake'],
      total: 1706,
      seats: 0,
      subtotal: 1599,
      gst: 107,
      sst: 0,
      customerName: 'habiba',
      status: 'Completed',
      timePeriod: '12/17/2022',
    },
  ];

  const orderItemList1 = ['1x Three Milk Cake', 'brost', 'cake'];

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
        <View
          activeOpacity={0.6}
          style={{width: 110, height: 120, marginLeft: 12, marginRight: 8}}>
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
          style={styles.topNavbar}
          onPress={() => navigation.navigate('OrderTrackingToday')}>
          <Text style={styles.topnavbarText}>Today</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.topNavbar, {borderBottomColor: Colors.primary}]}
          activeOpacity={0.6}>
          <Text style={styles.topnavbarText}>previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.topNavbar, {width: '40%'}]}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('OrderTracking')}>
          <Text style={styles.topnavbarText}>Order Tracking</Text>
        </TouchableOpacity>
      </View>

      {/* Scroll items */}

      <View
        style={{
          width: '95%',
          height: 400,
          position: 'absolute',
          top: 260,
          justifyContent: 'space-between',
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {previousOrders.map((item, index) => (
            <View key={item.RestaurantOrderId + index}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Montserrat-Bold',
                  fontSize: 20,
                  marginBottom: 8,
                  marginLeft: 5,
                }}></Text>

              <View style={styles.orderDetailBox}>
                <View
                  style={{
                    width: '100%',
                    height: 'auto',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      width: 6,
                      height: 'auto',
                      backgroundColor: Colors.primary,
                      marginLeft: 10,
                      marginRight: 10,
                    }}></View>

                  <View style={{width: 300, height: 'auto', marginBottom: 10}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.orderDetailBoxText}>Order ID:</Text>
                      <Text style={styles.orderDetailBoxText}>
                        {item.RestaurantOrderId}
                      </Text>
                      {/* <Text
                        style={[
                          styles.orderDetailBoxText,
                          {color: 'green', fontSize: 16, marginRight: 5},
                        ]}>
                        Completed
                      </Text> */}
                    </View>

                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: 17, color: 'black'}}>
                        Order Summary:{' '}
                      </Text>
                      <View>
                        <Text style={{fontSize: 17, color: 'black'}}>
                          ItemName: {item.MenuName}
                        </Text>
                        <Text style={{fontSize: 17, color: 'black'}}>
                          Item Quantity:{item.RestaurantOrderQty}
                        </Text>
                      </View>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: 17, color: 'grey'}}>
                        Customer Id:
                      </Text>
                      <Text style={{fontSize: 17, color: 'grey'}}>
                        {item.CustomerId}
                      </Text>
                    </View>
                  </View>
                </View>

                <Text
                  style={{
                    alignSelf: 'flex-end',
                    marginRight: 15,
                    fontSize: 15,
                    marginTop: 5,
                    color: 'grey',
                  }}>
                  Total: {item.RestaurantOrderPrice + 70} PKR
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginBottom: 10,
                    marginTop: 10,
                  }}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleItemPress(item)}>
                    <Text style={styles.buttonText}>Order Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/*  Bottom navigation bar */}

      <View style={{width: '100%', height: 70, position: 'absolute', top: 665}}>
        <View
          style={{width: '100%', height: 56, backgroundColor: Colors.primary}}>
          {/* bottom navigation bar */}
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
              style={styles.navbar}
              onPress={() => navigation.navigate('MenuReservationSeats')}>
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
              activeOpacity={0.6}
              style={{
                position: 'relative',
                width: '20%',
                height: 45,
                alignItems: 'center',
              }}>
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

      {/* bottom sheet order tracling detail*/}

      <OrderTrackingPreviousBottomsheet
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
  orderDetailBox: {
    width: '100%',
    height: 'auto',
    paddingLeft: 0,
    backgroundColor: '#dedede',
    borderRadius: 10,
    paddingTop: 10,
    paddingLeft: 10,
    marginBottom: 10,
  },
  orderDetailBoxText: {
    fontSize: 15,
    marginTop: 5,
    paddingBottom: 5,
    color: 'grey',
  },
  button: {
    marginTop: 5,
    width: 110,
    height: 26,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Arimo-Bold',
  },

  cartTotalBox: {
    width: '60%',
    height: 110,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
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
    fontSize: 15,
    marginBottom: 10,
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
