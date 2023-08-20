import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {Colors} from '../../constants';
import Downbar from '../../components/Downbar';
import SidebarAdminSide from '../../components/SidebarAdminSide';
import {Picker} from '@react-native-picker/picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import {
  STATUSES,
  addMenuItem,
  getRestaurantMenu,
} from '../../redux/reducers/menuSlice';
import ImgToBase64 from 'react-native-image-base64';
import {useDispatch, useSelector} from 'react-redux';

export default function MenuReservationAddItems({navigation}) {
  const [cousineName, setCousineName] = useState('');
  const [dishName, setDishName] = useState('');
  const [servingPerPerson, setServingPerPerson] = useState('1');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const {status, error} = useSelector(state => state.menu);
  const {restaurantState} = useSelector(state => state.restaurant);

  const selectImage = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      multiple: false,
    })
      .then(response => {
        const source = {uri: response.path};
        console.log(source['uri']);
        ImgToBase64.getBase64String(source['uri'])
          .then(base64String => setSelectedImage(base64String))
          .catch(err => console.log(err));
      })
      .catch(error => {
        console.log('ImagePicker Error: ', error);
      });
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

  function handleAddItem() {
    if (dishName == '') {
      Alert.alert('Please fill the required fields');
    } else if (quantity == '') {
      Alert.alert('Please fill the required fields');
    } else if (price == '') {
      Alert.alert('Please fill the required fields');
    } else if (servingPerPerson == '') {
      Alert.alert('Please fill the required fields');
    } else if (cousineName == '') {
      Alert.alert('Please fill the required fields');
    } else if (selectedImage == '') {
      Alert.alert('Please fill the required fields');
    } else {
      const itemData = {
        restaurantId: restaurantState.RestaurantsId,
        menuName: dishName,
        menuQty: parseInt(quantity),
        menuImage: selectedImage,
        servingPerson: parseInt(servingPerPerson),
        price: parseInt(price),
      };
      console.log(restaurantState.RestaurantsId);
      // console.log(itemData);
      dispatch(addMenuItem(itemData))
        .unwrap()
        .then(data => {
          // console.log(data);
          // setCousineName('');
          // setDishName('');
          // setServingPerPerson(1);
          // setPrice('');
          // setQuantity('');
          // setSelectedImage('');
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Menu Item Added!',
          });
          dispatch(getRestaurantMenu(restaurantState.RestaurantsId));
        })
        .catch(error => {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: error,
          });
        });
    }
  }

  return (
    <ScrollView
      contentContainerStyle={[
        styles.scrollContentContainer,
        {paddingBottom: 100, backgroundColor: '#fff'},
      ]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.mainContainer}>
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

        {/* Restaurant Detail section */}

        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            height: 120,
            position: 'absolute',
            top: 70,
          }}>
          <View
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
          </View>

          <View style={{width: 225, height: 120}}>
            <Text
              style={{
                fontSize: 24,
                color: 'black',
                fontFamily: 'Montserrat-Bold',
                marginTop: 15,
              }}>
              {restaurantState?.RestaurantsName}
            </Text>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => navigation.navigate('Information')}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#5fb3f6',
                  textDecorationLine: 'underline',
                  marginLeft: 20,
                  marginTop: 10,
                }}>
                View More
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* top navigation bar */}

        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            height: 40,
            position: 'absolute',
            top: 210,
          }}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.topNavbar, {width: '40%'}]}
            onPress={() => navigation.navigate('MenuReservationSeats')}>
            <Text style={styles.topnavbarText}>Pre-booking</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.topNavbar}
            activeOpacity={0.6}
            onPress={() => navigation.navigate('MenuReservationMenu')}>
            <Text style={styles.topnavbarText}>Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '30%',
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 2.5,
              borderBottomColor: Colors.primary,
            }}
            activeOpacity={0.6}>
            <Text style={styles.topnavbarText}>Add Items</Text>
          </TouchableOpacity>
        </View>

        {/*Input fields */}

        <View style={[styles.inputField, {top: 270}]}>
          <TextInput
            style={styles.inputArea}
            placeholder="Enter Cousine"
            placeholderTextColor={'black'}
            autoComplete="off"
            autoCorrect={false}
            autoCapitalize="none"
            value={cousineName}
            onChangeText={data => setCousineName(data)}></TextInput>
        </View>

        <View style={[styles.inputField, {top: 325}]}>
          <TextInput
            style={styles.inputArea}
            placeholder="Enter Dish Name"
            placeholderTextColor={'black'}
            autoComplete="off"
            autoCorrect={false}
            autoCapitalize="none"
            value={dishName}
            onChangeText={data => setDishName(data)}></TextInput>
        </View>

        <View
          style={[
            styles.inputField,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              top: 380,
            },
          ]}>
          <TextInput
            style={{width: 200, height: '100%'}}
            placeholder="Serving per-person"
            fontSize={22}
            textAlign="center"
            placeholderTextColor={'black'}
            autoComplete="off"
            autoCorrect={false}
            autoCapitalize="none"
            editable={false}
          />

          <View
            style={{
              width: 80,
              height: 30,
              borderWidth: 1,
              borderColor: '#d3c5c7',
              borderRadius: 7,
              backgroundColor: '#f7ecec',
              justifyContent: 'center',
              marginLeft: 8,
            }}>
            <Picker
              selectedValue={servingPerPerson}
              style={{
                height: 50,
                width: 90,
              }}
              onValueChange={(itemValue, itemIndex) =>
                setServingPerPerson(itemValue)
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

        <View
          style={[
            styles.inputField,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              top: 435,
            },
          ]}>
          <TextInput
            style={{width: 100, height: '100%'}}
            placeholder="Price"
            fontSize={22}
            textAlign="center"
            placeholderTextColor={'black'}
            autoComplete="off"
            autoCorrect={false}
            autoCapitalize="none"
            editable={false}
          />

          <TextInput
            style={{
              borderWidth: 1,
              width: 150,
              height: 35,
              borderRadius: 5,
              backgroundColor: '#f7ecec',
              borderColor: '#d3c5c7',
            }}
            placeholderTextColor={'black'}
            autoComplete="off"
            autoCorrect={false}
            autoCapitalize="none"
            value={price}
            onChangeText={data => setPrice(data)}
          />
        </View>

        <View
          style={[
            styles.inputField,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              top: 490,
            },
          ]}>
          <TextInput
            style={{width: 100, height: '100%'}}
            placeholder="Quantity"
            fontSize={22}
            textAlign="center"
            placeholderTextColor={'black'}
            editable={false}
          />

          <TextInput
            style={{
              borderWidth: 1,
              width: 150,
              height: 35,
              borderRadius: 5,
              backgroundColor: '#f7ecec',
              borderColor: '#d3c5c7',
            }}
            placeholderTextColor={'black'}
            fontSize={14}
            autoComplete="off"
            autoCorrect={false}
            autoCapitalize="none"
            value={quantity}
            onChangeText={data => setQuantity(data)}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.6}
          style={[
            styles.inputField,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              top: 545,
            },
          ]}
          onPress={selectImage}>
          <TextInput
            style={{width: 150, height: '100%'}}
            placeholder="Insert Image"
            fontSize={22}
            textAlign="center"
            placeholderTextColor={'black'}
            editable={false}
          />

          <Image
            style={{
              width: 40,
              height: 40,
            }}
            source={require('../../assets/images/icons/Image-icon.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handleAddItem();
          }}
          style={styles.Button}
          activeOpacity={0.6}>
          <Text style={{fontSize: 20, color: 'black'}}>
            {status === STATUSES.LOADING ? (
              <ActivityIndicator color="black" size="large" />
            ) : (
              'Add Item'
            )}
          </Text>
        </TouchableOpacity>

        {/*  Bottom navigation bar */}

        <View
          style={{width: '100%', height: 70, position: 'absolute', top: 665}}>
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
                  source={require('../../assets/images/icons/homepage-icon.png')}
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
                  source={require('../../assets/images/icons/nav-icon2.png')}
                />
              </TouchableOpacity>
            </View>

            <Downbar></Downbar>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
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
  scrollContentContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },

  topNavbar: {
    width: '30%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2.5,
  },

  topnavbarText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
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
  inputField: {
    width: 310,
    height: 45,
    position: 'absolute',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#797979',
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },

  inputArea: {
    marginLeft: 6,
    fontSize: 22,
    textDecorationLine: 'none',
  },
  Button: {
    width: 140,
    height: 40,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#797979',
    position: 'absolute',
    top: 610,
  },
});
