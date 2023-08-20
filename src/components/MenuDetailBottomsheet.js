import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {Colors} from '../constants';
import Downbar from './Downbar';
import {Picker} from '@react-native-picker/picker';

const MenuDetailBottomsheet = ({
  isVisible,
  onClose,
  selectedItem,
  navigation,
}) => {
  console.log(selectedItem);

  const [selectedValue, setSelectedValue] = useState('');
  {
    /* serving per person logic */
  }

  const persons = [];
  for (let i = 0; i < selectedItem.ServingPerson; i++) {
    persons.push(
      <Image
        key={i}
        source={require('../assets/images/icons/person-icon.png')}
        style={{width: 21, height: 20}}
      />,
    );
  }

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
                marginBottom: 5,
              }}>
              Details
            </Text>

            <View
              activeOpacity={0.7}
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: '#797979',
                width: 340,
                height: 170,
                borderRadius: 18,
                marginLeft: 'auto',
                marginRight: 'auto',
                backgroundColor: '#ffe979',
                marginBottom: 10,
                paddingTop: 15,
              }}>
              <View
                style={{width: 80, height: 75, marginLeft: 9, marginRight: 9}}>
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 20,
                  }}
                  resizeMode="contain"
                  source={{
                    uri: `data:image/png;base64,${selectedItem.MenuImage}`,
                  }}
                />
              </View>

              <View style={{width: 200, height: 60}}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Bold',
                    color: 'black',
                    fontSize: 15,
                    marginBottom: 5,
                  }}>
                  {selectedItem && selectedItem.MenuName}
                </Text>
                <Text style={{fontSize: 14, marginBottom: 5, color: 'grey'}}>
                  2 Pounds
                </Text>
                <View
                  style={{
                    width: 120,
                    height: 20,
                    marginTop: -5,
                    flexDirection: 'row',
                  }}>
                  <Text style={{color: 'black', marginRight: 10, fontSize: 13}}>
                    Rs. {selectedItem && selectedItem.Price}
                  </Text>
                  {selectedItem.discountprice ? (
                    <Text
                      style={{
                        textDecorationLine: 'line-through',
                        fontSize: 13,
                        color: 'grey',
                      }}>
                      Rs. {selectedItem && selectedItem.discountprice}
                    </Text>
                  ) : null}
                </View>
                <View
                  style={{
                    width: 125,
                    height: 20,
                    position: 'absolute',
                    top: 53,
                    right: -40,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  {persons}
                </View>
              </View>

              {/*quantity */}

              <View
                style={{
                  backgroundColor: Colors.primary,
                  width: 200,
                  height: 45,
                  borderWidth: 1,
                  borderColor: 'black',
                  borderRadius: 20,
                  position: 'absolute',
                  top: 110,
                  left: 70,
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
                  Quantity
                </Text>

                <View
                  style={{
                    width: 85,
                    height: 30,
                    borderWidth: 1,
                    borderColor: '#d3c5c7',
                    borderRadius: 7,
                    backgroundColor: '#f7ecec',
                    justifyContent: 'center',
                    marginLeft: 8,
                  }}>
                  <Picker
                    selectedValue={selectedItem?.orderCount}
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
            </View>

            <TouchableOpacity
              style={styles.bottomsheetButton}
              activeOpacity={0.6}
              onPress={onClose}>
              <Text style={{fontSize: 20, color: 'black'}}>Close</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom sheet nav bar */}

          <View
            style={{width: '100%', height: 70, position: 'absolute', top: 303}}>
            <View
              style={{
                width: '100%',
                height: 56,
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
                    source={require('../assets/images/icons/order-history-icon.png')}
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
    minHeight: '40%',
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
    height: 330,
  },

  option: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
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

export default MenuDetailBottomsheet;
