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
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {Colors} from '../../constants';
import Downbar from '../../components/Downbar';
import SidebarAdminSide from '../../components/SidebarAdminSide';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {
  STATUSES,
  getReviewsByRestaurants,
} from '../../redux/reducers/reviewSlice';

export default function ReviewTimeline({navigation}) {
  {
    /* Side menu  */
  }

  const [isModalVisible, setIsModalVisible] = useState(false);
  const disptach = useDispatch();
  const {status, restaurantsReviews} = useSelector(state => state.review);
  const {restaurantState} = useSelector(state => state.restaurant);
  useEffect(() => {
    disptach(getReviewsByRestaurants(restaurantState?.RestaurantId));
  }, [disptach]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const firstLetters = userName => {
    return userName[0];
  };

  const data = [
    {
      index: 1,
      userName: 'Farhan',
      timePeriod: '12 minutes',
      comment: 'This order staisfied my cravings',
      profileImage: null,
    },
    {
      index: 2,
      userName: 'Khadija',
      timePeriod: '12 minutes',
      comment: 'This order staisfied my cravings',
      profileImage: null,
    },
    {
      index: 3,
      userName: 'Sami',
      timePeriod: '12 minutes',
      comment: 'This order staisfied my cravings',
      profileImage: null,
    },
    {
      index: 4,
      userName: 'Ali',
      timePeriod: '12 minutes',
      comment: 'This order staisfied my cravings',
      profileImage: null,
    },
    {
      index: 5,
      userName: 'Sami',
      timePeriod: '12 minutes',
      comment: 'This order staisfied my cravings',
      profileImage: null,
    },
    {
      index: 6,
      userName: 'Ali',
      timePeriod: '12 minutes',
      comment: 'This order staisfied my cravings',
      profileImage: null,
    },
  ];

  {
    /*review timeline dot screen */
  }
  const [isModalVisible1, setIsModalVisible1] = useState(false);

  const showModal1 = () => {
    setIsModalVisible1(true);
  };

  const hideModal1 = () => {
    setIsModalVisible1(false);
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

      {/* comment List*/}

      <View style={{width: '100%', height: 600, position: 'absolute', top: 70}}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: 'black',
            alignSelf: 'center',
            fontFamily: 'Montserrat-Bold',
            marginBottom: 5,
          }}>
          Timeline
        </Text>

        <ScrollView style={{marginBottom: 5}}>
          {/* reviews */}

          {status === STATUSES.LOADING ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            restaurantsReviews.map(item => (
              <View
                key={item.RestaurantReviewsId}
                style={{
                  borderWidth: 1,
                  borderColor: '#797979',
                  width: 340,
                  height: 'auto',
                  borderRadius: 15,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  backgroundColor: '#ffe979',
                  marginBottom: 15,
                }}>
                <View style={{flexDirection: 'row'}}>
                  {item.profileImage ? (
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 10,
                      }}>
                      <Image
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 50,
                        }}
                        resizeMode="contain"
                        source={item.profileImage}
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
                        {firstLetters(item.CustomerName)}
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
                      {item.CustomerName}
                    </Text>
                    <Text style={{fontSize: 13, color: 'grey'}}>
                      {item.timePeriod} ago
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={{width: 25, height: 40, marginTop: 10}}
                    activeOpacity={0.6}
                    onPress={showModal1}>
                    <Image
                      style={{
                        width: 25,
                        height: 25,
                        alignSelf: 'center',
                      }}
                      source={require('../../assets/images/icons/dot-icon.png')}
                    />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    width: 290,
                    height: 'auto',
                    marginTop: 5,
                    marginLeft: 20,
                    marginBottom: 10,
                  }}>
                  <Text style={{fontSize: 14, color: 'grey'}}>
                    {item.Reviews}
                  </Text>
                </View>
              </View>
            ))
          )}
        </ScrollView>
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
                style={{width: 48, height: 55, position: 'absolute', top: -9}}
                source={require('../../assets/images/icons/homepage-icon.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.navbar}
              onPress={() => navigation.navigate('MenuReservationSeats')}>
              <Image
                style={{width: 35, height: 35, position: 'absolute', top: 3}}
                source={require('../../assets/images/icons/order-history-icon.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.navbar}
              onPress={() => navigation.navigate('MenuReservationSeats')}>
              <Image
                style={{width: 37, height: 37, position: 'absolute', top: 2}}
                source={require('../../assets/images/icons/nav-icon1.png')}
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
                style={{width: 40, height: 40, position: 'absolute', top: 2}}
                source={require('../../assets/images/icons/clock-icon.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navbar}
              activeOpacity={0.6}
              onPress={() => navigation.navigate('Information')}>
              <Image
                style={{width: 34, height: 34, position: 'absolute', top: 5}}
                source={require('../../assets/images/icons/nav-icon2.png')}
              />
            </TouchableOpacity>
          </View>

          <Downbar></Downbar>
        </View>
      </View>

      {/* review timeline dot model*/}

      <Modal
        visible={isModalVisible1}
        transparent={true}
        animationType="fade"
        onRequestClose={hideModal1}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalButton} onPress={hideModal1}>
              <Text style={styles.modalButtonText}>X</Text>
            </TouchableOpacity>

            <View
              style={{
                width: 150,
                height: 70,
                marginLeft: 'auto',
                marginRight: 'auto',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity activeOpacity={0.6}>
                <Text style={{color: '#333333', fontSize: 18}}>
                  Report Message
                </Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.6}>
                <Text style={{color: '#333333', fontSize: 18}}>
                  Report User
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    width: '80%',
    borderColor: '#797979',
    borderWidth: 1,
  },

  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },

  modalButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 30,
    height: 30,
    position: 'absolute',
    right: -2,
  },
  modalButtonText: {
    color: 'black',
    fontSize: 16,
  },
});
