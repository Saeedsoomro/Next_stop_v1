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
import Navbar from './Navbar';
import Downbar from './Downbar';

const ReviewTimelineBottomsheet = ({
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
                fontFamily: 'Montserrat-Bold',
                color: 'black',
                fontSize: 20,
                marginBottom: 10,
                marginTop: 5,
                alignSelf: 'center',
              }}>
              Order Summary
            </Text>

            <ScrollView
              contentContainerStyle={{flexGrow: 1}}
              showsVerticalScrollIndicator={false}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#797979',
                  width: '95%',
                  height: 'auto',
                  borderRadius: 15,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  backgroundColor: '#ffe979',
                  marginBottom: 15,
                  paddingBottom: 30,
                }}>
                <View style={{flexDirection: 'row'}}>
                  {selectedItem && selectedItem.profileImage ? (
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 10,
                        marginTop: 10,
                      }}>
                      <Image
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 50,
                        }}
                        resizeMode="contain"
                        source={selectedItem.profileImage}
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 10,
                        marginTop: 10,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Montserrat-Bold',
                          fontSize: 25,
                          color: 'black',
                        }}>
                        {selectedItem &&
                          selectedItem.CustomerName.substring(0, 1)}
                      </Text>
                    </View>
                  )}
                  <View
                    style={{
                      width: 240,
                      height: 45,
                      marginTop: 12,
                      marginLeft: 10,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Bold',
                        fontSize: 16,
                        color: 'black',
                      }}>
                      {selectedItem && selectedItem.CustomerName}
                    </Text>
                    <Text style={{fontSize: 13, color: 'grey'}}>
                      {selectedItem && selectedItem.timePeriod} ago
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: 250,
                    height: 'auto',
                    marginLeft: 70,
                    flexDirection: 'row',
                    margin: 6,
                  }}>
                  <Text style={{color: 'black', fontSize: 17, marginRight: 30}}>
                    {selectedItem && selectedItem.RestaurantsName}
                  </Text>
                  {/* <Text style={{color: 'black', fontSize: 17}}>
                    Rs. {selectedItem && selectedItem.order.price}
                  </Text> */}
                </View>
              </View>

              <TouchableOpacity
                style={{
                  width: 110,
                  height: 30,
                  backgroundColor: Colors.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 15,
                  borderColor: '#797979',
                  alignSelf: 'center',
                  marginTop: 20,
                }}
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
              height: 60,
              position: 'absolute',
              top: 336,
              backgroundColor: Colors.primary,
            }}>
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
                onPress={() => navigation.navigate('Homepage')}>
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
                style={styles.navbar}
                activeOpacity={0.6}
                onPress={() => navigation.navigate('OrderHistory')}>
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
                style={styles.navbar}
                activeOpacity={0.6}
                onPress={() => navigation.navigate('Favourites')}>
                <Image
                  style={{
                    width: 23,
                    height: 30,
                    position: 'absolute',
                    top: 6,
                  }}
                  source={require('../assets/images/icons/favorites-icon.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  position: 'relative',
                  width: '20%',
                  height: 45,
                  alignItems: 'center',
                }}
                activeOpacity={0.6}>
                <Image
                  style={{
                    width: 62,
                    height: 55,
                    position: 'absolute',
                    top: -4,
                  }}
                  source={require('../assets/images/icons/timeline-icon.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.navbar}
                activeOpacity={0.6}
                onPress={() => navigation.navigate('DealsAndDiscount')}>
                <Image
                  style={{
                    width: 34,
                    height: 44,
                    position: 'absolute',
                    top: 0,
                  }}
                  source={require('../assets/images/icons/discount-icon.png')}
                />
              </TouchableOpacity>
            </View>

            <Downbar />
          </View>

          {/* 
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          */}
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
    minHeight: '55%',
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
    height: 300,
  },
  button: {
    width: 120,
    height: 40,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#797979',
    alignSelf: 'center',
    marginTop: 10,
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

export default ReviewTimelineBottomsheet;
