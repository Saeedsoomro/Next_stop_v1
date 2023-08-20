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
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors} from '../../constants';
import Downbar from '../../components/Downbar';
import SidebarAdminSide from '../../components/SidebarAdminSide';
import {useDispatch, useSelector} from 'react-redux';
import {
  getRestaurantsTimings,
  updateRestaurant,
  updateRestaurantsTimings,
} from '../../redux/reducers/restaurantSlice';

export default function Information({navigation}) {
  {
    /* open and close  */
  }
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const {status, restaurantsTimings, restaurantState} = useSelector(
    state => state.restaurant,
  );
  const [selectedValue, setSelectedValue] = useState(
    restaurantState?.IsOpen ? 'Open' : 'Closed',
  );

  const [about, setAbout] = useState('');
  const [contact, setContact] = useState('');
  const [inputValues, setInputValues] = useState(restaurantsTimings);

  useEffect(() => {
    dispatch(getRestaurantsTimings(restaurantState?.RestaurantsId));
    setAbout(restaurantState?.About);
    setContact(restaurantState?.ContactNo);
  }, [dispatch]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const aboutHandler = data => {
    setAbout(data);
  };

  const handleOptionSelect = optionValue => {
    setSelectedValue(optionValue);
    const restaurnatData = {
      restaurantsId: restaurantState.RestaurantsId,
      restaurantsName: restaurantState.RestaurantsName,
      contactNo: restaurantState.ContactNo,
      about: restaurantState.About,
      address: restaurantState.Address,
      restaurantLogo: restaurantState.RestaurantLogo,
      cityId: restaurantState.CityId,
      locationId: restaurantState.LocationId,
      isOpen: isOpen ? 1 : 0,
    };
    dispatch(updateRestaurant(restaurnatData));
    setIsOpen(false);
  };

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

  const isOpen1 = 'Open Now';

  {
    /* star rating logic */
  }
  const rating = 5;
  const stars = [];
  for (let i = 0; i < Math.round(restaurantState.Rating || 3); i++) {
    stars.push(
      <Image
        key={i}
        source={require('../../assets/images/icons/star.png')}
        style={styles.reviewStar}
      />,
    );
  }

  {
    /* edit button logic */
  }

  const [isEditableField, setIsEditableField] = useState(false);
  const handleEditability = () => {
    if (isEditableField) {
      const restaurnatData = {
        restaurantId: restaurantState.RestaurantId,
        restaurantsName: restaurantState.RestaurantsName,
        contactNo: contact,
        about: about,
        address: restaurantState.Address,
        restaurantLogo: restaurantState.RestaurantLogo,
        cityId: restaurantState.CityId,
        locationId: restaurantState.LocationId,
        isOpen: restaurantState.isOpen,
      };
      dispatch(updateRestaurant(restaurnatData));
      setIsEditableField(false);
    } else {
      setIsEditableField(true);
    }
  };

  const handleTimeChange = (data, timings, index) => {
    const timingsData = {
      restaurantsTimingId: timings.RestaurantsTimingId,
      restaurantsId: timings.RestaurantsId,
      restaurantOpenDays: timings.RestaurantOpenDays,
      RestaurantsOpenTiming: data,
    };

    dispatch(updateRestaurantsTimings(timingsData));
    dispatch(getRestaurantsTimings(timings.RestaurantsId));
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#fffefe"
      />

      <View style={{flex: 1, flexDirection: 'row', marginLeft: 0}}>
        <TouchableOpacity onPress={showModal}>
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

      {/*Restaurant detail */}
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 120,
          position: 'absolute',
          top: 110,
        }}>
        <TouchableOpacity
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
        </TouchableOpacity>

        <View style={{width: 225, height: 120}}>
          <Text
            style={{
              fontSize: 24,
              color: 'black',
              fontFamily: 'Montserrat-Bold',
            }}>
            {restaurantState?.RestaurantsName}
          </Text>

          <View style={{flexDirection: 'row', width: 220, height: 90}}>
            <View style={{width: 160, height: 90}}>
              <View
                style={{
                  flexDirection: 'row',
                  maxWidth: 160,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                {stars}
              </View>
              <Text style={{fontSize: 13, color: 'grey'}}>30+ Reviews</Text>
              <Text
                style={
                  restaurantState.IsOpen === 1
                    ? styles.openText
                    : styles.closedText
                }>
                {restaurantState.IsOpen === 1 ? 'Open Now' : 'Closed'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView
        style={{
          width: '95%',
          height: 420,
          position: 'absolute',
          top: 240,
          paddingTop: 10,
        }}>
        {/* About */}

        <View style={{width: '100%', height: 'auto'}}>
          <Text style={styles.headingText}>About</Text>
          <TextInput
            style={[
              {
                width: '97%',
                height: 'auto',
                borderRadius: 5,
                alignSelf: 'center',
                paddingTop: 2,
                color: '#797979',
              },
              isEditableField && styles.enabledTextInput,
            ]}
            onChangeText={data => aboutHandler(data)}
            textAlignVertical="top"
            value={about}
            multiline={true}
            editable={isEditableField}></TextInput>
        </View>

        {/* Address */}

        {/* Contact Details */}

        <View style={{width: '90%', height: 'auto', marginTop: 8}}>
          <Text style={styles.headingText}>Contact Details</Text>
          <TextInput
            style={[
              {
                marginLeft: 25,
                width: 200,
                color: '#797979',
                borderRadius: 5,
                paddingTop: 3,
                paddingBottom: 3,
              },
              isEditableField && styles.enabledTextInput,
            ]}
            value={contact}
            onChangeText={data => setContact(data)}
            editable={isEditableField}></TextInput>
        </View>

        {/* Open Hours */}

        <View style={{width: '90%', height: 'auto', marginTop: 8}}>
          <Text style={styles.headingText}>Open Hours</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditability}>
            <Image
              style={{width: 25, height: 25}}
              source={require('../../assets/images/icons/edit-icon.png')}
            />
          </TouchableOpacity>
          {}
          {restaurantsTimings.map((timings, index) => (
            <View
              key={timings.RestaurantsTimingId}
              style={{
                width: '80%',
                height: 'auto',
                flexDirection: 'row',
                alignSelf: 'center',
              }}>
              <View style={{width: '40%'}}>
                <Text style={{padding: 7, color: 'grey'}}>
                  {timings.RestaurantOpenDays}
                </Text>
              </View>

              <View style={{width: '60%'}}>
                <View style={styles.timingContainer}>
                  <Image
                    style={styles.clockImage}
                    source={require('../../assets/images/icons/clock-icon.png')}
                  />
                  <TextInput
                    style={[
                      styles.timingText,
                      isEditableField && styles.enabledTextInput,
                    ]}
                    value={timings.RestaurantsOpenTiming}
                    onChangeText={data =>
                      handleTimeChange(data, timings, index)
                    }
                    editable={isEditableField}></TextInput>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/*  open and close*/}
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
              style={styles.navbar}
              onPress={() => navigation.navigate('MenuReservationSeats')}>
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
              style={{
                position: 'relative',
                width: '20%',
                height: 45,
                alignItems: 'center',
              }}
              activeOpacity={0.6}>
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

  searchInputArea: {
    marginLeft: 20,
    fontSize: 18,
    textDecorationLine: 'none',
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
    marginRight: 10,
  },
  openText: {
    color: 'green',
    fontSize: 17,
  },
  closedText: {
    color: 'red',
    fontSize: 17,
  },
  headingText: {
    fontSize: 15,
    marginBottom: 3,
    fontFamily: 'Montserrat-Bold',
    color: 'black',
  },
  editButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: -15,
    top: -15,
  },
  timingContainer: {
    padding: 5,
    flexDirection: 'row',
    width: '100%',
    marginBottom: 5,
  },

  timingText: {
    width: 150,
    padding: 0,
    position: 'absolute',
    left: 30,
    paddingLeft: 3,
    borderRadius: 5,
    color: '#797979',
  },
  clockImage: {
    width: 20,
    height: 20,
    marginRight: 3,
  },
  enabledTextInput: {
    color: 'black',
    borderWidth: 1,
    borderColor: '#797979',
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
});
