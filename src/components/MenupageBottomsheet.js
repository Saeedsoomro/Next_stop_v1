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
} from 'react-native';
import {Colors} from '../constants';
import Navbar from './Navbar';

const MenupageBottomsheet = ({
  isVisible,
  onClose,
  selectedItem,
  onAddToCart,
  navigation,
}) => {
  const translateY = useRef(0);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleDrag = event => {
    translateY.current = event.nativeEvent.translationY;
  };

  const handleDragRelease = () => {
    if (translateY.current > 50) {
      onClose();
    }
    translateY.current = 0;
  };

  const [quantity, setQuantity] = useState(1);
  const [additionalRequirements, setAdditionalRequirements] = useState('');

  const minus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.modalContainer}
        onPress={onClose}>
        <View
          style={[
            styles.bottomSheetContainer,
            {transform: [{translateY: translateY.current}]},
            isKeyboardVisible && styles.bottomSheetContainerWithKeyboard,
          ]}>
          <View style={styles.dragIndicator} />

          {/* Render the content if selectedItem exists */}
          {selectedItem && (
            <View style={styles.bottomDrawer}>
              <View
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
                      uri: `data:image/png;base64,${
                        selectedItem.MenuImage
                          ? selectedItem.MenuImage
                          : selectedItem.DealIcon
                      }`,
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
                    {selectedItem.MenuName
                      ? selectedItem.MenuName
                      : selectedItem.RestaurantDealName}
                  </Text>
                  <Text style={{fontSize: 14, marginBottom: 5, color: 'grey'}}>
                    {selectedItem.size} Pounds
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
                      Rs. {selectedItem.Price}
                    </Text>
                    {selectedItem.discountprice ? (
                      <Text
                        style={{
                          textDecorationLine: 'line-through',
                          fontSize: 13,
                          color: 'grey',
                        }}>
                        Rs. {selectedItem.discountprice}
                      </Text>
                    ) : null}
                  </View>
                  <View
                    style={{
                      width: 90,
                      height: 20,
                      position: 'absolute',
                      top: 40,
                      right: -45,
                      flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={{
                        borderWidth: 1,
                        borderColor: 'black',
                        borderRadius: 20,
                        width: 22,
                        height: 22,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#d2d2d0',
                        marginRight: 5,
                        marginTop: 5,
                      }}
                      onPress={minus}>
                      <Image
                        style={{
                          width: 15,
                          height: 15,
                          borderRadius: 20,
                        }}
                        resizeMode="contain"
                        source={require('../assets/images/icons/minus.png')}
                      />
                    </TouchableOpacity>
                    <View style={{width: 20, height: 30, marginBottom: 20}}>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 24,
                          alignSelf: 'center',
                        }}>
                        {quantity}
                      </Text>
                    </View>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={{
                        borderWidth: 1,
                        borderColor: 'black',
                        borderRadius: 20,
                        width: 22,
                        height: 22,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 5,
                        marginTop: 5,
                      }}
                      onPress={() => {
                        setQuantity(quantity + 1);
                      }}>
                      <Image
                        style={{
                          width: 15,
                          height: 15,
                          borderRadius: 20,
                        }}
                        resizeMode="contain"
                        source={require('../assets/images/icons/plus.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Montserrat-Bold',
                  fontSize: 18,
                  marginLeft: 15,
                }}>
                Special instructions
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  marginLeft: 15,
                  marginRight: 15,
                  marginTop: 10,
                  color: 'grey',
                }}>
                Please let us know if you want any addition in your order or
                want to remove anything
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#797979',
                  width: 340,
                  height: 85,
                  borderRadius: 18,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: 10,
                  justifyContent: 'center',
                }}>
                <TextInput
                  style={{
                    width: '95%',
                    height: 80,
                    borderRadius: 18,
                    textAlignVertical: 'top',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                  placeholder="e.g. No lettuce"
                  placeholderTextColor={'grey'}
                  multiline={true}
                  onChangeText={additionalRequirements =>
                    setAdditionalRequirements(additionalRequirements)
                  }
                  value={additionalRequirements}
                />
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  onAddToCart(selectedItem, quantity, additionalRequirements);
                  onClose();
                }}>
                <Text style={{fontSize: 20, color: 'black'}}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Bottom sheet nav bar */}
          <View
            style={{width: '100%', height: 70, position: 'absolute', top: 393}}>
            <Navbar navigation={navigation}></Navbar>
          </View>

          {/* 
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          */}
        </View>
      </TouchableOpacity>
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
    borderWidth: 1,
    height: '62%',
  },
  bottomSheetContainerWithKeyboard: {
    height: '90%', // Adjust the value as needed to accommodate the content above the keyboard
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
    width: '100%',
    height: 200,
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
    marginTop: 30,
  },
});

export default MenupageBottomsheet;
