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
import {Picker} from '@react-native-picker/picker';
import SidebarAdminSide from '../../components/SidebarAdminSide';
import {useDispatch, useSelector} from 'react-redux';
import {upadatePreBooking} from '../../redux/reducers/menuSlice';
import {STATUSES} from '../../redux/reducers/restaurantSlice';
import Toast from 'react-native-toast-message';
export default function MenuReservationSeats({navigation}) {
  const [selectedValue, setSelectedValue] = useState('20');
  const [selectedValue1, setSelectedValue1] = useState('6');
  const {restaurantState} = useSelector(state => state.restaurant);
  const {status} = useSelector(state => state.menu);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const updateHandler = () => {
    const preBookingData = {
      restaurantsId: restaurantState.RestaurantsId,
      totalSeats: selectedValue,
      availableSeats: selectedValue1,
    };
    dispatch(upadatePreBooking(preBookingData))
      .unwrap()
      .then(data => {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'update successful !',
        });
      })
      .catch(error => {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'update successful !',
        });
      });
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
          style={{
            width: '40%',
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
          onPress={() => navigation.navigate('MenuReservationMenu')}>
          <Text style={styles.topnavbarText}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.topNavbar}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('MenuReservationAddItems')}>
          <Text style={styles.topnavbarText}>Add Items</Text>
        </TouchableOpacity>
      </View>

      {/* Total seat selection  */}

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
        <Text
          style={{
            fontSize: 16,
            color: 'black',
            fontFamily: 'Arimo-Bold',
            marginRight: 25,
          }}>
          Total Seats
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

      {/* Available seat selection  */}

      <View
        style={{
          backgroundColor: Colors.primary,
          width: 250,
          height: 45,
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 20,
          position: 'absolute',
          top: 380,
          marginLeft: 'auto',
          marginRight: 'auto',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 16, color: 'black', fontFamily: 'Arimo-Bold'}}>
          Available Seats
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
            selectedValue={selectedValue1}
            style={{
              height: 50,
              width: 100,
            }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue1(itemValue)
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

      <TouchableOpacity
        onPress={updateHandler}
        style={{
          backgroundColor: Colors.primary,
          width: 120,
          height: 40,
          borderWidth: 1,
          borderColor: '#d3c5c7',
          borderRadius: 15,
          position: 'absolute',
          top: 480,
          marginLeft: 'auto',
          marginRight: 'auto',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        activeOpacity={0.6}>
        <Text style={{fontSize: 18, color: 'black'}}>
          {' '}
          {status === STATUSES.LOADING ? (
            <ActivityIndicator color="black" size="large" />
          ) : (
            'UPDATE'
          )}
        </Text>
      </TouchableOpacity>

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
});
