import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import ImgToBase64 from 'react-native-image-base64';
import VendorsNavbar from '../../components/VendorsNavbar';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import {updateRestaurant} from '../../redux/reducers/restaurantSlice';

export default function HomepageProfile({navigation}) {
  const {restaurantState} = useSelector(state => state.restaurant);
  const dispatch = useDispatch();
  const number = '02343467881';

  const [fullName, setFullName] = useState(restaurantState.RestaurantsName);

  const [mobileNumber, setMobileNumber] = useState(restaurantState.ContactNo);

  const [about, setAbout] = useState(restaurantState.About);

  const [isEditableNameField, setIsEditableNameField] = useState(false);

  const [isEditableNumberField, setIsEditableNumberField] = useState(false);

  const [isEditableAboutField, setIsEditableAboutField] = useState(false);

  const handleNameEditability = () => {
    if (isEditableNameField) {
      const restaurnatData = {
        restaurantsId: restaurantState.RestaurantsId,
        restaurantsName: fullName,
        contactNo: restaurantState.ContactNo,
        about: restaurantState.About,
        address: restaurantState.Address,
        restaurantLogo: restaurantState.RestaurantLogo,
        cityId: restaurantState.CityId,
        locationId: restaurantState.LocationId,
        isOpen: restaurantState.isOpen,
      };
      dispatch(updateRestaurant(restaurnatData));
      setIsEditableNameField(false);
    } else {
      setIsEditableNameField(true);
    }
  };

  const handleNumberEditability = () => {
    if (isEditableNumberField) {
      const restaurnatData = {
        restaurantsId: restaurantState.RestaurantsId,
        restaurantsName: restaurantState.RestaurantsName,
        contactNo: mobileNumber,
        about: restaurantState.About,
        address: restaurantState.Address,
        restaurantLogo: restaurantState.RestaurantLogo,
        cityId: restaurantState.CityId,
        locationId: restaurantState.LocationId,
        isOpen: restaurantState.isOpen,
      };
      dispatch(updateRestaurant(restaurnatData));
      setIsEditableNumberField(false);
    } else {
      setIsEditableNumberField(true);
    }
  };

  const handleAboutEditability = () => {
    if (isEditableAboutField) {
      const restaurnatData = {
        restaurantsId: restaurantState.RestaurantsId,
        restaurantsName: restaurantState.RestaurantsName,
        contactNo: restaurantState.ContactNo,
        about: about,
        address: restaurantState.Address,
        restaurantLogo: restaurantState.RestaurantLogo,
        cityId: restaurantState.CityId,
        locationId: restaurantState.LocationId,
        isOpen: restaurantState.isOpen,
      };
      dispatch(updateRestaurant(restaurnatData));
      setIsEditableAboutField(false);
    } else {
      setIsEditableAboutField(true);
    }
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const selectImage = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      multiple: false,
    })
      .then(response => {
        const source = {uri: response.path};
        ImgToBase64.getBase64String(source['uri'])
          .then(base64String => {
            const restaurnatData = {
              restaurantsId: restaurantState.RestaurantsId,
              restaurantsName: restaurantState.RestaurantsName,
              contactNo: restaurantState.ContactNo,
              about: restaurantState.About,
              address: restaurantState.Address,
              restaurantLogo: base64String,
              cityId: restaurantState.CityId,
              locationId: restaurantState.LocationId,
              isOpen: restaurantState.isOpen,
            };
            dispatch(updateRestaurant(restaurnatData));
          })
          .catch(err => console.log(err));
        setSelectedImage(source);
      })
      .catch(error => {
        console.log('ImagePicker Error: ', error);
      });
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#fffefe"
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* back button */}

        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            width: 45,
            height: 45,
            position: 'absolute',
            left: 10,
            top: 10,
            borderWidth: 1,
            borderRadius: 30,
            borderColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('HomepageVendor')}>
          <Image
            style={{width: 35, height: 25}}
            source={require('../../assets/images/icons/back-arrow2.png')}></Image>
        </TouchableOpacity>

        <Text
          style={{
            position: 'absolute',
            left: 130,
            top: 15,
            color: 'black',
            fontFamily: 'Montserrat-Bold',
            fontSize: 26,
          }}>
          Profile
        </Text>

        {/* back button */}

        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            width: 45,
            height: 45,
            position: 'absolute',
            right: 10,
            top: 15,
          }}
          onPress={() => navigation.navigate('HomepageSettings')}>
          <Image
            style={{width: 35, height: 35}}
            source={require('../../assets/images/icons/setting-icon.png')}></Image>
        </TouchableOpacity>
      </View>

      {/* Profile Picture */}

      {restaurantState.RestaurantLogo ? (
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            position: 'absolute',
            top: 80,
          }}>
          <Image
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 50,
            }}
            resizeMode="contain"
            source={{
              uri: `data:image/png;base64,${restaurantState.RestaurantLogo}`,
            }}
          />
        </View>
      ) : (
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: '#ffe979',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            position: 'absolute',
            top: 80,
          }}>
          <Text
            style={{fontSize: 60, fontFamily: 'Arimo-Bold', color: 'white'}}>
            {restaurantState.restaurantsName.substring(0, 1)}
          </Text>
        </View>
      )}

      {/* Restaurant's  Name */}
      {/* Full Name */}
      <View style={[styles.profileField, {position: 'absolute', top: 200}]}>
        <View style={styles.container}>
          <Text style={styles.fieldName}>Full Name</Text>
          <TextInput
            style={[
              styles.InputboxText,
              !isEditableNameField && styles.disabledTextInput,
              isEditableNameField && styles.enabledTextInput,
            ]}
            textAlignVertical="top"
            autoComplete="off"
            autoCorrect={false}
            autoCapitalize="none"
            value={fullName}
            onChangeText={data => setFullName(data)}
            editable={isEditableNameField}></TextInput>
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={handleNameEditability}>
          <Image
            style={{width: 30, height: 30}}
            source={require('../../assets/images/icons/edit-icon.png')}
          />
        </TouchableOpacity>
      </View>

      {/* Mobile Number */}
      <View style={[styles.profileField, {position: 'absolute', top: 300}]}>
        <View style={styles.container}>
          <Text style={styles.fieldName}>Mobile Number</Text>
          <TextInput
            style={[
              styles.InputboxText,
              !isEditableNumberField && styles.disabledTextInput,
              isEditableNumberField && styles.enabledTextInput,
            ]}
            textAlignVertical="top"
            autoComplete="off"
            autoCorrect={false}
            autoCapitalize="none"
            value={mobileNumber}
            onChangeText={data => setMobileNumber(data)}
            editable={isEditableNumberField}></TextInput>
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={handleNumberEditability}>
          <Image
            style={{width: 30, height: 30}}
            source={require('../../assets/images/icons/edit-icon.png')}
          />
        </TouchableOpacity>
      </View>

      {/* logo Picture */}
      <View style={[styles.profileField, {position: 'absolute', top: 400}]}>
        <View style={styles.container}>
          <Text style={styles.fieldName}>Change Logo Picture</Text>
        </View>

        <TouchableOpacity style={styles.editButton} onPress={selectImage}>
          <Image
            style={{width: 30, height: 30}}
            source={require('../../assets/images/icons/edit-icon.png')}
          />
        </TouchableOpacity>
      </View>

      {/* order */}

      <View style={[styles.profileField, {position: 'absolute', top: 500}]}>
        <View style={styles.container}>
          <Text style={styles.fieldName}>Edit About</Text>
          {isEditableAboutField && (
            <TextInput
              style={[
                styles.InputboxText,
                styles.enabledTextInput,
                {width: 220, height: '50%', fontSize: 14},
              ]}
              multiline={true}
              textAlignVertical="top"
              autoComplete="off"
              autoCorrect={false}
              autoCapitalize="none"
              value={about}
              onChangeText={data => setAbout(data)}
              editable={isEditableAboutField}
            />
          )}
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={handleAboutEditability}>
          <Image
            style={{width: 30, height: 30}}
            source={require('../../assets/images/icons/edit-icon.png')}
          />
        </TouchableOpacity>
      </View>

      {/*  Bottom navigation bar */}
      <View style={{width: '100%', height: 70, position: 'absolute', top: 666}}>
        <VendorsNavbar navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: {
    width: 270,
    height: 75,
    marginLeft: 10,
  },
  profileField: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#797979',
    width: 340,
    height: 75,
    borderRadius: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffe979',
    marginBottom: 15,
    alignSelf: 'center',
  },

  fieldName: {
    width: 220,
    height: '40%',
    color: 'black',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    paddingTop: 8,
  },
  InputboxText: {
    width: 220,
    height: '50%',
    fontSize: 16,
    marginLeft: 30,
    borderRadius: 5,
  },
  disabledTextInput: {
    color: '#797979', // custom text color for disabled TextInput
  },

  enabledTextInput: {
    color: 'black',
    borderWidth: 1,
    borderColor: '#797979',
  },
  editButton: {
    width: 40,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
