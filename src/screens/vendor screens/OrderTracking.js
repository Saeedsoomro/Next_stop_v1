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
import SidebarAdminSide from '../../components/SidebarAdminSide';
import {useDispatch, useSelector} from 'react-redux';

export default function OrderTracking({navigation}) {
  const newOrder = 12;
  {
    /* Side menu  */
  }
  const {restaurantState} = useSelector(state => state.restaurant);
  const dispatch = useDispatch();
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
          style={styles.topNavbar}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('OrderTrackingPrevious')}>
          <Text style={styles.topnavbarText}>previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.topNavbar,
            {width: '40%', borderBottomColor: Colors.primary},
          ]}
          activeOpacity={0.6}>
          <Text style={styles.topnavbarText}>Order Tracking</Text>
        </TouchableOpacity>
      </View>

      {/* INPUT FIELDS */}

      <View
        style={[
          styles.inputField,
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            top: 300,
          },
        ]}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'Arimo-Bold',
            marginLeft: 10,
            marginRight: 50,
            color: 'black',
          }}>
          New Orders
        </Text>
        <View
          style={{
            borderWidth: 1,
            width: 110,
            height: 35,
            borderRadius: 5,
            backgroundColor: '#f7ecec',
            borderColor: '#d3c5c7',
            marginRight: 10,
            alignItems: 'center',
          }}>
          <Text
            style={{fontSize: 20, fontFamily: 'Arimo-Bold', color: 'black'}}>
            2
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.inputField,
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            top: 370,
          },
        ]}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'Arimo-Bold',
            marginLeft: 10,
            marginRight: 30,
            color: 'black',
          }}>
          Orders Served
        </Text>
        <View
          style={{
            borderWidth: 1,
            width: 110,
            height: 35,
            borderRadius: 5,
            backgroundColor: '#f7ecec',
            borderColor: '#d3c5c7',
            marginRight: 10,
            alignItems: 'center',
          }}>
          <Text
            style={{fontSize: 20, fontFamily: 'Arimo-Bold', color: 'black'}}>
            2
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.inputField,
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            top: 440,
          },
        ]}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'Arimo-Bold',
            marginLeft: 10,
            color: 'black',
          }}>
          Orders Cancelled
        </Text>
        <View
          style={{
            borderWidth: 1,
            width: 110,
            height: 35,
            borderRadius: 5,
            backgroundColor: '#f7ecec',
            borderColor: '#d3c5c7',
            marginRight: 10,
            alignItems: 'center',
          }}>
          <Text
            style={{fontSize: 20, fontFamily: 'Arimo-Bold', color: 'black'}}>
            5
          </Text>
        </View>
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

  modalContainer1: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  inputField: {
    width: 310,
    height: 45,
    position: 'absolute',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#797979',
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
});
