import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Keyboard,
  ScrollView,
} from 'react-native';
import {Colors} from '../constants';
import Downbar from './Downbar';

const OrderTrackingPreviousBottomsheet = ({
  isVisible,
  onClose,
  selectedItem,
  navigation,
}) => {
  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={[styles.bottomSheetContainer]}>
          <View style={styles.dragIndicator} />

          <View style={styles.bottomDrawer}>
            <Text
              style={{
                fontSize: 24,
                fontFamily: 'Montserrat-Bold',
                color: 'black',
                alignSelf: 'center',
              }}>
              Order Details
            </Text>

            <ScrollView
              contentContainerStyle={{flexGrow: 1}}
              showsVerticalScrollIndicator={false}>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <Text style={{fontSize: 17, color: 'black', marginLeft: 10}}>
                    Order Summary:
                  </Text>
                  <View>
                    <Text style={{fontSize: 17, color: 'black'}}>
                      ItemName: {selectedItem?.MenuName}
                    </Text>
                    <Text style={{fontSize: 17, color: 'black'}}>
                      Item Quantity:{selectedItem?.RestaurantOrderQty}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.cartTotalBox}>
                <View style={styles.cartTotalBoxTextContainer}>
                  <Text style={styles.cartTotalBoxText}>Subtotal</Text>
                  <Text style={styles.cartTotalBoxText}>GST</Text>
                  <Text style={styles.cartTotalBoxText}>SST</Text>
                  <Text style={styles.cartTotalBoxText}>Total</Text>
                </View>

                <View
                  style={[styles.cartTotalBoxTextContainer, {marginLeft: 7}]}>
                  <Text style={styles.cartTotalBoxText}>
                    Rs.{' '}
                    {selectedItem &&
                      selectedItem.RestaurantOrderPrice.toFixed(2)}
                  </Text>
                  <Text style={styles.cartTotalBoxText}>Rs. 50</Text>
                  <Text style={styles.cartTotalBoxText}>Rs. 20</Text>
                  <Text style={styles.cartTotalBoxText}>
                    Rs.{' '}
                    {selectedItem &&
                      (selectedItem.RestaurantOrderPrice + 20 + 50).toFixed(2)}
                  </Text>
                </View>
              </View>

              <Text
                style={{
                  fontSize: 17,
                  color: 'black',
                  marginLeft: 10,
                  marginTop: 15,
                }}>
                Payment Method
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  marginTop: 5,
                  alignSelf: 'center',
                  color: 'grey',
                }}>
                credit card: XXXXXXXXXXXXX
              </Text>

              <Text
                style={{
                  fontSize: 17,
                  color: 'black',
                  marginLeft: 10,
                  marginTop: 15,
                }}>
                Reservations
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  marginTop: 5,
                  alignSelf: 'center',
                  color: 'grey',
                }}>
                zero reservations
              </Text>

              <TouchableOpacity
                style={styles.bottomsheetButton}
                activeOpacity={0.6}
                onPress={onClose}>
                <Text style={{fontSize: 20, color: 'black'}}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Bottom sheet nav bar */}

          <View
            style={{
              width: '100%',
              height: 70,
              position: 'absolute',
              bottom: -15,
            }}>
            <View
              style={{
                width: '100%',
                height: 56,
                backgroundColor: Colors.primary,
              }}>
              {/* bottom navigation bar */}
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  width: '100%',
                  height: 55,
                }}>
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
                    source={require('../assets/images/icons/homepage-icon.png')}
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
                    source={require('../assets/images/icons/order-history-icon.png')}
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
                    source={require('../assets/images/icons/nav-icon1.png')}
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
                    source={require('../assets/images/icons/clock-icon.png')}
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
                    source={require('../assets/images/icons/nav-icon2.png')}
                  />
                </TouchableOpacity>
              </View>

              <Downbar></Downbar>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheetContainer: {
    backgroundColor: 'white',
    paddingTop: 15,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    display: 'flex',
    minHeight: '68%',
    alignItems: 'center',
  },

  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginBottom: 8,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  closeButton: {
    marginTop: 16,
    alignSelf: 'flex-end',
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'blue',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  bottomDrawer: {
    width: '95%',
    height: 390,
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
    color: 'grey',
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
});

export default OrderTrackingPreviousBottomsheet;
