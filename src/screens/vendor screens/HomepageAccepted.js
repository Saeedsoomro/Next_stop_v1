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
import React, {useState, useRef} from 'react';
import {Colors} from '../../constants';
import VendorsNavbar from '../../components/VendorsNavbar';
import BottomSheet from 'react-native-raw-bottom-sheet';
import HomepageAcceptedBottomsheet from '../../components/HomepageAcceptedBottomsheet';

export default function HomepageAccepted({navigation, route}) {
  const {acceptedOrders, newOrders, selectedValue1} = route.params;
  const acceptCount = acceptedOrders.length;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(selectedValue1);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = optionValue => {
    setSelectedValue(optionValue);
    setIsOpen(false);
  };

  // bottomsheet component

  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  // Function to handle item selection to bottomsheet
  const handleItemPress = item => {
    setSelectedItem(item);
    setBottomSheetVisible(true);
  };

  const data = [
    {
      index: 1,
      orderItemList: ['1x Three Milk Cake', '1x Three Milk Cake'],
      subtotal: 1599,
      gst: 107,
      sst: 0,
      total: 1706,
      seats: 0,
    },
    {
      index: 2,
      orderItemList: ['1x Three Milk Cake'],
      subtotal: 1599,
      gst: 107,
      sst: 0,
      total: 150,
      seats: 1,
    },
    {
      index: 3,
      orderItemList: ['1x Three Milk Cake', '1x Three Milk Cake'],
      subtotal: 1599,
      gst: 107,
      sst: 0,
      total: 1706,
      seats: 0,
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

      {/* Accepted order */}

      <View
        style={{
          width: '95%',
          height: 530,
          position: 'absolute',
          top: 120,
          justifyContent: 'space-between',
        }}>
        <View style={styles.textContainer}>
          <Text style={styles.boldText}>Accepted</Text>
          <Text style={styles.countText}>({acceptCount})</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {acceptedOrders.map((item, index) => (
            <View
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
                      Order Summary:{' '}
                    </Text>
                    <View>
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
          ))}

          {/* add button*/}
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              backgroundColor: Colors.primary,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}
            activeOpacity={0.6}
            onPress={() =>
              navigation.navigate('HomepageNew', {
                newOrders,
                selectedValue1: selectedValue,
              })
            }>
            <Image
              style={{width: 32, height: 32}}
              source={require('../../assets/images/icons/add.png')}></Image>
          </TouchableOpacity>
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

      {/* bottom sheet accepted order details*/}

      <HomepageAcceptedBottomsheet
        isVisible={isBottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        selectedItem={selectedItem}
        navigation={navigation}
      />

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

{
  /*
<BottomSheet ref={bottomSheetRef1} customStyles={{
                container: {
                    height: 'auto', borderTopStartRadius: 10, borderTopEndRadius: 10, borderTopColor: 'black', borderTopWidth: 1, borderStartColor: 'black', borderStartWidth: 1, borderEndColor: 'black', borderEndWidth: 1,
                },
            }}
                closeOnDragDown={true} >

                <Text style={{ fontSize: 24, fontFamily: 'Montserrat-Bold', color: 'black', alignSelf: 'center' }}>Order Details</Text>

                <View style={{ flexDirection: 'row', }}>
                    <Text style={{ fontSize: 17, color: 'black', marginLeft: 10 }}>Order Summary: </Text>
                    <View>
                        {orderItemList1.map((item3, id1) => (
                            <Text key={id1} style={{ fontSize: 17, color: 'black', marginLeft: 10 }}>{item3}</Text>
                        ))}

                    </View>
                </View>


                <View style={styles.cartTotalBox}>

                    <View style={styles.cartTotalBoxTextContainer}>
                        <Text style={styles.cartTotalBoxText}>Subtotal</Text>
                        <Text style={styles.cartTotalBoxText}>GST</Text>
                        <Text style={styles.cartTotalBoxText}>SST</Text>
                        <Text style={styles.cartTotalBoxText}>Total</Text>
                    </View>

                    <View style={[styles.cartTotalBoxTextContaine, { marginLeft: 7 }]}>
                        <Text style={styles.cartTotalBoxText}>Rs. 1599.00</Text>
                        <Text style={styles.cartTotalBoxText}>Rs. 107.00</Text>
                        <Text style={styles.cartTotalBoxText}>Rs. 00.00</Text>
                        <Text style={styles.cartTotalBoxText}>Rs. 1706.00</Text>
                    </View>

                </View>

                <Text style={{ fontSize: 17, color: 'black', marginLeft: 10, marginTop: 15 }}>Payment Method</Text>
                <Text style={{ fontSize: 15, marginTop: 5, alignSelf: 'center' }}>credit card: XXXXXXXXXXXXX</Text>

                <Text style={{ fontSize: 17, color: 'black', marginLeft: 10, marginTop: 15 }}>Reservations</Text>
                <Text style={{ fontSize: 15, marginTop: 5, alignSelf: 'center', }}>zero reservations</Text>

                <TouchableOpacity style={styles.bottomsheetButton} activeOpacity={0.6} onPress={() => bottomSheetRef1.current.close()}>
                    <Text style={{ fontSize: 20, color: 'black' }}>Close</Text>
                </TouchableOpacity>

                <View style={{ width: "100%", height: 70, position: 'absolute', bottom: -15, }}>
                    <VendorsNavbar></VendorsNavbar>
                </View>
            </BottomSheet>
 */
}
