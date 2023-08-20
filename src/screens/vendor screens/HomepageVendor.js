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
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors} from '../../constants';
import VendorsNavbar from '../../components/VendorsNavbar';
import SidebarAdminSide from '../../components/SidebarAdminSide';
import {Picker} from '@react-ative-picker/picker';
import numWords from 'num-words';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getAcceptedOrders,
  getDeclinedOrders,
  getNewOrders,
} from '../../redux/reducers/orderSlice';
import {
  getRestaurantById,
  updateRestaurant,
} from '../../redux/reducers/restaurantSlice';

const acceptedOrders = [
  {
    orderId: 1,
    orderItem: ['1x Three Milk cake'],
    subtotal: 1599,
    gst: 107,
    sst: 0,
    total: 1079,
    seatReserved: 0,
    timing: '05:00 pm',
  },
  {
    orderId: 2,
    orderItem: ['1x Three Milk cake', 'cake'],
    subtotal: 1599,
    gst: 107,
    sst: 0,
    total: 1079,
    seatReserved: 3,
    timing: '08:00 pm',
  },
];

const declinedOrders = [
  {
    orderId: 1,
    orderItem: ['1x Three Milk cake'],
    subtotal: 1599,
    gst: 107,
    sst: 0,
    total: 1079,
    seatReserved: 0,
  },
  {
    orderId: 2,
    orderItem: ['1x Three Milk cake', 'cake'],
    subtotal: 1599,
    gst: 107,
    sst: 0,
    total: 1079,
    seatReserved: 3,
  },
];

export default function HomepageVendor({navigation, route}) {
  const selectedValue1 = route.params?.selectedValue1;

  {
    /* open and close  */
  }
  const [isOpenNow, setIsOpenNow] = useState(false);
  const dispatch = useDispatch();
  const {status, newOrders, acceptedOrders, declinedOrders} = useSelector(
    state => state.order,
  );
  const {restaurantState} = useSelector(state => state.restaurant);
  const [selectedValue, setSelectedValue] = useState(
    restaurantState?.IsOpen ? 'Open' : 'Closed',
  );
  const toggleModal = () => {
    setIsOpenNow(!isOpenNow);
  };

  const handleOptionSelect = optionValue => {
    setSelectedValue(optionValue);
    console.log(restaurantState.RestaurantsId);
    const restaurnatData = {
      restaurantsId: restaurantState.RestaurantsId,
      restaurantsName: restaurantState.RestaurantsName,
      contactNo: restaurantState.ContactNo,
      about: restaurantState.About,
      address: restaurantState.Address,
      restaurantLogo: restaurantState.RestaurantLogo,
      cityId: restaurantState.CityId,
      locationId: restaurantState.LocationId,
      IsOpen: 1,
    };
    dispatch(updateRestaurant(restaurnatData));
    setIsOpenNow(false);
  };
  const getRestaurant = async () => {
    const customerId = await AsyncStorage.getItem('customerId');
    dispatch(getRestaurantById(customerId))
      .unwrap()
      .then(data => {
        dispatch(getNewOrders(data?.RestaurantsId));
        dispatch(getAcceptedOrders(data?.RestaurantsId));
        dispatch(getDeclinedOrders(data?.RestaurantsId));
      })
      .catch(error => {
        navigation.navigate('Login');
      });
  };

  useEffect(() => {
    getRestaurant();
    if (restaurantState === null) {
      navigation.replace('Login');
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSelectedValue(selectedValue1 || 'Open');
    });

    return unsubscribe;
  }, [navigation, selectedValue1]);

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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsModalVisible(false);
    });

    return unsubscribe;
  }, [navigation]);

  const newCount = newOrders.length;
  const upcomingCount = 0;
  const acceptedCount = acceptedOrders.length;
  const declinedCount = declinedOrders.length;

  //new orders

  const firstOrder = newOrders.filter((order, index) => index === 0)[0]; // Filter the newOrders array and get the first order
  const firstOrderId = firstOrder ? firstOrder.RestaurantOrderId : null; // Get the orderId of the first order, or null if there are no orders

  // accepted orders

  const acceptedFirstOrder = acceptedOrders.filter(
    (order, index) => index === 0,
  )[0]; // Filter the newOrders array and get the first order
  const acceptedFirstOrderId = acceptedFirstOrder
    ? acceptedFirstOrder.orderId
    : null; // Get the orderId of the first order, or null if there are no orders
  const acceptedFirstOrderTiming = acceptedFirstOrder
    ? acceptedFirstOrder.timing
    : null; // Get the timing of the first order, or null if there are no orders

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

      <View
        style={{
          width: '95%',
          height: 120,
          position: 'absolute',
          top: 110,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {/* New order */}

        <View style={{width: '50%'}}>
          <View style={styles.textContainer}>
            <Text style={styles.boldText}>New</Text>
            <Text style={styles.countText}>({newCount})</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.orderDetailBox}
            onPress={() =>
              navigation.navigate('HomepageNew', {
                newOrders,
                selectedValue1: selectedValue,
              })
            }>
            <Text style={styles.orderDetailBoxText}>
              Order ID: {firstOrderId}
            </Text>
          </TouchableOpacity>
        </View>

        {/* upcoming order */}

        <View style={{width: '50%', marginLeft: 15}}>
          <View style={styles.textContainer}>
            <Text style={styles.boldText}>Upcoming</Text>
            <Text style={styles.countText}>({upcomingCount})</Text>
          </View>

          <TouchableOpacity activeOpacity={0.6} style={styles.orderDetailBox}>
            {upcomingCount > 0 ? (
              <Text style={{fontSize: 14, color: 'grey'}}>upcoming orders</Text>
            ) : (
              <Text style={{fontSize: 14, color: 'grey'}}>
                No upcoming orders
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Accepted order */}

      <View
        style={{
          width: '95%',
          height: 160,
          position: 'absolute',
          top: 250,
          justifyContent: 'space-between',
        }}>
        <View style={styles.textContainer}>
          <Text style={styles.boldText}>Accepted</Text>
          <Text style={styles.countText}>({acceptedCount})</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.6}
          style={[
            styles.orderDetailBox,
            {width: '100%', height: 110, paddingLeft: 0},
          ]}
          onPress={() =>
            navigation.navigate('HomepageAccepted', {
              acceptedOrders,
              newOrders,
              selectedValue1: selectedValue,
            })
          }>
          <View
            style={{
              width: '100%',
              height: 70,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: 6,
                height: 60,
                backgroundColor: Colors.primary,
                marginLeft: 10,
                marginRight: 10,
              }}></View>

            <View style={{width: 170, height: 70}}>
              <Text style={[styles.orderDetailBoxText, {marginTop: 5}]}>
                Order ID: {acceptedFirstOrderId}
              </Text>
              <View
                style={{
                  fontSize: 12,
                  marginTop: 5,
                  width: 80,
                  height: 18,
                  backgroundColor: Colors.primary,
                  borderRadius: 20,
                  alignItems: 'center',
                }}>
                <Text style={{color: 'black', fontSize: 12}}>
                  Order Details
                </Text>
              </View>
            </View>

            <View style={{width: 140, height: 70, justifyContent: 'center'}}>
              <Text style={{fontSize: 12, color: 'grey'}}>
                Order timings: {acceptedFirstOrderTiming}
              </Text>
            </View>
          </View>
          <Image
            style={{
              width: 25,
              height: 25,
              alignSelf: 'center',
            }}
            source={require('../../assets/images/icons/dot1.png')}
          />
        </TouchableOpacity>
      </View>

      {/* Declined order */}

      <View
        style={{
          width: '95%',
          height: 150,
          position: 'absolute',
          top: 430,
          justifyContent: 'space-between',
        }}>
        <View style={styles.textContainer}>
          <Text style={styles.boldText}>Declined</Text>
          <Text style={styles.countText}>({declinedCount})</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.6}
          style={[styles.orderDetailBox, {width: '100%', height: 110}]}
          onPress={() =>
            navigation.navigate('HomepageDeclined', {
              declinedOrders,
              newOrders,
              selectedValue1: selectedValue,
            })
          }>
          <Text
            style={{
              fontSize: 14,
              marginTop: 5,
              textTransform: 'capitalize',
              color: 'grey',
            }}>
            {numWords(declinedCount)} order declined due to missing items
          </Text>
          <View
            style={{
              marginTop: 5,
              width: 80,
              height: 18,
              backgroundColor: Colors.primary,
              borderRadius: 20,
              alignItems: 'center',
              position: 'absolute',
              right: 10,
              top: 40,
            }}>
            <Text style={{color: 'black', fontSize: 12}}>View Items</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/*  open and close*/}
      <Modal visible={isOpenNow} transparent animationType="fade">
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
    fontSize: 24,
    marginBottom: 8,
  },
  countText: {
    color: Colors.primary,
    fontSize: 16,
    marginLeft: 8,
    marginBottom: 8,
  },
  orderDetailBox: {
    width: '90%',
    height: 75,
    backgroundColor: '#dedede',
    borderRadius: 10,
    paddingTop: 10,
    paddingLeft: 10,
  },
  orderDetailBoxText: {
    color: 'black',
    fontSize: 14,
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
    color: 'gray',
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
});

{
  /*
 side drawer 

 <Modal
 visible={isModalVisible}
 transparent={true}
 animationType='fade'
 onRequestClose={hideModal}
>
 <View style={styles.modalContainer1}>
   <View style={styles.modalContent1}>
     <View style={styles.drawerHeader1}>

       <TouchableOpacity style={styles.modalButton1} onPress={hideModal}>
         <Text style={styles.modalButtonText1}>X</Text>
       </TouchableOpacity>

       <View style={{ width: 'auto', height: 50, position: 'absolute', top: 30, justifyContent: 'center', marginLeft: 10 }}>

         <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'Montserrat-Bold', }}>{RestaurantName}</Text>
         <TouchableOpacity activeOpacity={0.6}>
           <Text style={{ color: '#5fb3f6', textDecorationLine: 'underline', fontSize: 13, alignSelf: 'center' }}>View Profile</Text>
         </TouchableOpacity>
       </View>

       <View style={{ width: 100, height: 100, borderRadius: 50, position: 'absolute', right: 15, top: 50, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center' }}>
         <Text style={{ fontSize: 60, fontFamily: 'Arimo-Bold', color: 'white' }}>{firstLetter}</Text>
       </View>

     </View>

    // Setting Items 

     <View style={styles.drawerContent}>

       <View style={{ width: 200, height: 40, flexDirection: 'row', alignItems: 'center', position: 'absolute', top: 100, left: 20 }}>
         <Image style={{ width: 50, height: 40, }} source={require('../../assets/images/icons/right.png')} />
         <TouchableOpacity style={{ marginLeft: 10 }} activeOpacity={0.7}>
           <Text style={{ color: 'black', fontSize: 16, fontFamily: 'Montserrat-Bold', }}>Home</Text>
         </TouchableOpacity>
       </View>

       <View style={{ width: 250, height: 40, flexDirection: 'row', alignItems: 'center', position: 'absolute', top: 150, left: 20 }}>
         <Image style={{ width: 50, height: 40, }} source={require('../../assets/images/icons/right.png')} />
         <TouchableOpacity style={{ marginLeft: 10 }} activeOpacity={0.7}>
           <Text style={{ color: 'black', fontSize: 16, fontFamily: 'Montserrat-Bold', }}>Order History</Text>
         </TouchableOpacity>
       </View>


       <View style={{ width: 200, height: 40, flexDirection: 'row', alignItems: 'center', position: 'absolute', top: 200, left: 20 }}>
         <Image style={{ width: 50, height: 40, }} source={require('../../assets/images/icons/right.png')} />
         <TouchableOpacity style={{ marginLeft: 10 }} activeOpacity={0.7}>
           <Text style={{ color: 'black', fontSize: 16, fontFamily: 'Montserrat-Bold', }}>Contact Us</Text>
         </TouchableOpacity>
       </View>

       <View style={{ width: 200, height: 40, flexDirection: 'row', alignItems: 'center', position: 'absolute', top: 250, left: 20 }}>
         <Image style={{ width: 50, height: 40, }} source={require('../../assets/images/icons/right.png')} />
         <TouchableOpacity style={{ marginLeft: 10 }} activeOpacity={0.7}>
           <Text style={{ color: 'red', fontSize: 16, fontFamily: 'Montserrat-Bold', }}>Logout</Text>
         </TouchableOpacity>
       </View>

       <TouchableOpacity style={{ position: 'absolute', top: 480, left: 20 }} activeOpacity={0.7}>
         <Text style={{ color: 'black', textDecorationLine: 'underline', fontSize: 14 }}>Settings</Text>
       </TouchableOpacity>

       <TouchableOpacity style={{ position: 'absolute', top: 500, left: 20 }} activeOpacity={0.7}>
         <Text style={{ color: 'black', textDecorationLine: 'underline', fontSize: 14 }}>Terms & Conditions</Text>
       </TouchableOpacity>

       <TouchableOpacity style={{ position: 'absolute', top: 520, left: 20 }} activeOpacity={0.7}>
         <Text style={{ color: 'black', textDecorationLine: 'underline', fontSize: 14 }}>Privacy Policies</Text>
       </TouchableOpacity>

     </View>






   </View>
 </View>
</Modal>

*/
}
