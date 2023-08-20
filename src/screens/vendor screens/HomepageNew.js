import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors} from '../../constants';
import VendorsNavbar from '../../components/VendorsNavbar';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import {
  acceptNewOrders,
  declineNewOrders,
  getNewOrders,
} from '../../redux/reducers/orderSlice';

export default function HomepageNew({navigation, route}) {
  const {selectedValue1} = route.params;
  const {newOrders} = useSelector(state => state.order);
  const {restaurantState} = useSelector(state => state.restaurant);

  const [newCount, setNewCount] = useState(newOrders.length);

  const dispatch = useDispatch();
  //accept press button

  const handleAcceptOrder = orderId => {
    dispatch(acceptNewOrders(orderId));
    dispatch(getNewOrders(restaurantState.RestaurantsId));
    // const updatedOrders = newOrders.filter(order => order.orderId !== orderId);
    // setNewOrders(updatedOrders);
    // setNewCount(newCount - 1);
  };

  //reject press button

  const handleRejectOrder = orderId => {
    dispatch(declineNewOrders(orderId));
    dispatch(getNewOrders(restaurantState.RestaurantsId));
    // const updatedOrders = newOrders.filter(order => order.orderId !== orderId);
    // setNewOrders(updatedOrders);
    // setNewCount(newCount - 1);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(selectedValue1);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = optionValue => {
    setSelectedValue(optionValue);
    setIsOpen(false);
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#fffefe"
      />

      <View style={{flex: 1, flexDirection: 'row', marginLeft: 0}}>
        {/* back button */}

        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            width: 45,
            height: 45,
            borderWidth: 1,
            borderRadius: 30,
            borderColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 6,
            marginRight: 20,
          }}
          onPress={() =>
            navigation.navigate('HomepageVendor', {
              selectedValue1: selectedValue,
            })
          }>
          <Image
            style={{width: 35, height: 25}}
            source={require('../../assets/images/icons/back-arrow2.png')}></Image>
        </TouchableOpacity>

        <Image
          style={{
            width: 45,
            height: 45,
            marginLeft: 5,
          }}
          source={require('../../assets/images/icons/logo1.png')}
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
          onPress={() => navigation.navigate('HomepageProfile')}>
          <Image
            style={{
              width: 40,
              height: 40,
              marginLeft: 18,
              marginTop: 10,
            }}
            source={require('../../assets/images/icons/account-logo.png')}
          />
        </TouchableOpacity>
      </View>

      {/* location bar and open status*/}

      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: 'row',
          borderWidth: 1,
          borderColor: '#797979',
          width: 230,
          height: 37,
          position: 'absolute',
          top: 60,
          left: 10,
          borderRadius: 5,
        }}>
        <Image
          style={{
            width: 25,
            height: 25,
            marginTop: 5,
            marginLeft: 5,
          }}
          source={require('../../assets/images/icons/location-icon.png')}
        />

        <View activeOpacity={0.6} style={{alignSelf: 'center'}}>
          <Text
            style={{
              color: 'darkgray',
              fontSize: 16,
              marginLeft: 6,
              fontFamily: 'Arimo-Regular',
            }}>
            Change pin location
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          borderRadius: 5,
          borderWidth: 1,
          borderColor: '#797979',
          width: 90,
          height: 37,
          position: 'absolute',
          top: 60,
          right: 10,
          justifyContent: 'center',
        }}
        onPress={toggleModal}>
        <Text style={{fontSize: 18, alignSelf: 'center', color: 'darkgray'}}>
          {selectedValue}
        </Text>
      </TouchableOpacity>

      {/* New order */}

      <View
        style={{
          width: '95%',
          height: 530,
          position: 'absolute',
          top: 120,
          justifyContent: 'space-between',
        }}>
        <View style={styles.textContainer}>
          <Text style={styles.boldText}>New</Text>
          <Text style={styles.countText}>({newCount})</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {newOrders?.map((item, index) => (
            <TouchableOpacity
              activeOpacity={0.6}
              key={item.RestaurantOrderId + index}
              style={styles.orderDetailBox}>
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
                  <Text style={styles.orderDetailBoxText}>
                    Order ID: {item.RestaurantOrderId}
                  </Text>

                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 17, color: 'black'}}>
                      Order Summary:{}
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
                Total: {item.RestaurantOrderPrice} PKR
              </Text>

              <View style={{marginTop: 15, marginLeft: 20}}>
                <Text style={{fontSize: 16, color: 'grey'}}>
                  Reservation: {item.seatReserved} seats
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginBottom: 10,
                  marginTop: 10,
                }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleAcceptOrder(item.RestaurantOrderId)}>
                  <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, {backgroundColor: '#ff5139'}]}
                  onPress={() => handleRejectOrder(item.RestaurantOrderId)}>
                  <Text style={styles.buttonText}>Reject</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Modal visible={isOpen} transparent animationType="fade">
        <TouchableOpacity
          onPress={toggleModal}
          style={styles.modalContainer}
          activeOpacity={1}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => handleOptionSelect('Open')}
              style={styles.option}>
              <Text style={styles.optionText}>Open</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleOptionSelect('Closed')}
              style={styles.option}>
              <Text style={styles.optionText}>Closed</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/*  Bottom navigation bar */}
      <VendorsNavbar navigation={navigation} />
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

  searchInputArea: {
    marginLeft: 20,
    fontSize: 18,
    textDecorationLine: 'none',
    color: 'black',
  },

  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boldText: {
    color: 'black',
    fontFamily: 'Montserrat-Bold',
    fontSize: 36,
    marginBottom: 8,
  },
  countText: {
    color: Colors.primary,
    fontSize: 22,
    marginLeft: 8,
    marginBottom: 8,
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
    width: 90,
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    minWidth: 200,
  },
  option: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
  },
});
