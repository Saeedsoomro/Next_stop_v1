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
  Linking,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors} from '../constants';
import {useSelector} from 'react-redux';

const SidebarAdminSide = ({onClose, navigation}) => {
  const {restaurantState} = useSelector(state => state.restaurant);

  const firstLetter = restaurantState?.RestaurantsName.substring(0, 1);
  const [isSidebarVisible, setIsSiebarVisible] = useState(false);

  const closeSidebar = () => {
    setIsSiebarVisible(false);
    onClose(); // Call the onClose function passed from the Homepage component
  };

  const openWebsite = () => {
    const url = 'https://www.hobnob.pk/';
    Linking.openURL(url);
  };

  return (
    <View>
      <Modal
        // visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeSidebar}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.drawerHeader}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={closeSidebar}>
                <Text style={styles.modalButtonText}>X</Text>
              </TouchableOpacity>

              <View
                style={{
                  width: 'auto',
                  height: 50,
                  position: 'absolute',
                  top: 30,
                  justifyContent: 'center',
                  marginLeft: 10,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 18,
                    fontFamily: 'Montserrat-Bold',
                  }}>
                  {restaurantState?.RestaurantsName}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => navigation.navigate('HomepageProfile')}>
                  <Text
                    style={{
                      color: '#5fb3f6',
                      textDecorationLine: 'underline',
                      fontSize: 13,
                      alignSelf: 'center',
                    }}>
                    View Profile
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  position: 'absolute',
                  right: 15,
                  top: 50,
                  backgroundColor: Colors.primary,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 60,
                    fontFamily: 'Arimo-Bold',
                    color: 'white',
                  }}>
                  {firstLetter}
                </Text>
              </View>
            </View>

            {/* Setting Items */}

            <View style={styles.drawerContent}>
              <View
                style={{
                  width: 200,
                  height: 40,
                  flexDirection: 'row',
                  alignItems: 'center',
                  position: 'absolute',
                  top: 100,
                  left: 20,
                }}>
                <Image
                  style={{width: 50, height: 40}}
                  source={require('../assets/images/icons/right.png')}
                />
                <TouchableOpacity
                  style={{marginLeft: 10}}
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('HomepageVendor')}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 16,
                      fontFamily: 'Montserrat-Bold',
                    }}>
                    Home
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: 250,
                  height: 40,
                  flexDirection: 'row',
                  alignItems: 'center',
                  position: 'absolute',
                  top: 150,
                  left: 20,
                }}>
                <Image
                  style={{width: 50, height: 40}}
                  source={require('../assets/images/icons/right.png')}
                />
                <TouchableOpacity
                  style={{marginLeft: 10}}
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('OrderTrackingPrevious')}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 16,
                      fontFamily: 'Montserrat-Bold',
                    }}>
                    Order History
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: 200,
                  height: 40,
                  flexDirection: 'row',
                  alignItems: 'center',
                  position: 'absolute',
                  top: 200,
                  left: 20,
                }}>
                <Image
                  style={{width: 50, height: 40}}
                  source={require('../assets/images/icons/right.png')}
                />
                <TouchableOpacity
                  style={{marginLeft: 10}}
                  activeOpacity={0.7}
                  onPress={openWebsite}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 16,
                      fontFamily: 'Montserrat-Bold',
                    }}>
                    Contact Us
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: 200,
                  height: 40,
                  flexDirection: 'row',
                  alignItems: 'center',
                  position: 'absolute',
                  top: 250,
                  left: 20,
                }}>
                <Image
                  style={{width: 50, height: 40}}
                  source={require('../assets/images/icons/right.png')}
                />
                <TouchableOpacity
                  style={{marginLeft: 10}}
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('AdminLogin')}>
                  <Text
                    style={{
                      color: 'red',
                      fontSize: 16,
                      fontFamily: 'Montserrat-Bold',
                    }}>
                    Logout
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={{position: 'absolute', top: 480, left: 20}}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('HomepageSettings')}>
                <Text
                  style={{
                    color: 'black',
                    textDecorationLine: 'underline',
                    fontSize: 14,
                  }}>
                  Settings
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{position: 'absolute', top: 500, left: 20}}
                activeOpacity={0.7}>
                <Text
                  style={{
                    color: 'black',
                    textDecorationLine: 'underline',
                    fontSize: 14,
                  }}>
                  Terms & Conditions
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{position: 'absolute', top: 520, left: 20}}
                activeOpacity={0.7}>
                <Text
                  style={{
                    color: 'black',
                    textDecorationLine: 'underline',
                    fontSize: 14,
                  }}>
                  Privacy Policies
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SidebarAdminSide;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    width: '80%',
    height: '100%',
    borderColor: '#797979',
    backgroundColor: '#fff',
    borderTopEndRadius: 20,
  },

  modalButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 30,
    height: 30,
    position: 'absolute',
    right: -2,
    top: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  drawerHeader: {
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
