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
import {Colors} from '../constants';
import Navbar from '../components/Navbar';
import {Linking} from 'react-native';
import BottomSheet from 'react-native-raw-bottom-sheet';
import Downbar from '../components/Downbar';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import {updateCustomer} from '../redux/reducers/auth';

export default function Profile({navigation}) {
  const {userState, status} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const userData = {name: 'John Doe', profileImage: null};

  const [fullName, setFullName] = useState(userState.CustomerName);

  const [mobileNumber, setMobileNumber] = useState(userState.ContactNo);

  const [isEditableNameField, setIsEditableNameField] = useState(false);

  const [isEditableNumberField, setIsEditableNumberField] = useState(false);

  const handleNameEditability = () => {
    setIsEditableNameField(!isEditableNameField);
  };

  const handleNumberEditability = () => {
    setIsEditableNumberField(!isEditableNumberField);
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const selectImage = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      multiple: false,
    })
      .then(response => {
        const source = {uri: response.path};
        setSelectedImage(source);
      })
      .catch(error => {
        console.log('ImagePicker Error: ', error);
      });
  };

  const handleChangeName = data => {
    setFullName(data);
    const userData = {
      CustomerId: userState.CustomerId,
      LocationId: userState.LocationId,
      CustomerName: data,
      ContactNo: userState.ContactNo,
      Email: userState.Email,
      Address: userState.Address,
    };
    dispatch(updateCustomer(userData));
  };
  const handleChangePhone = data => {
    setMobileNumber(data);
    const userData = {
      CustomerId: userState.CustomerId,
      LocationId: userState.LocationId,
      CustomerName: userState.CustomerName,
      ContactNo: data,
      Email: userState.Email,
      Address: userState.Address,
    };
    dispatch(updateCustomer(userData));
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
          backgroundColor: '#fff',
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
          onPress={() => navigation.navigate('Homepage')}>
          <Image
            style={{width: 35, height: 25}}
            source={require('../assets/images/icons/back-arrow2.png')}></Image>
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
          onPress={() => navigation.navigate('Settings')}>
          <Image
            style={{width: 35, height: 35}}
            source={require('../assets/images/icons/setting-icon.png')}></Image>
        </TouchableOpacity>
      </View>

      {/* Profile Picture */}

      {userData.profileImage ? (
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
            source={userData.profileImage}
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
            {userState?.CustomerName.substring(0, 1)}
          </Text>
        </View>
      )}

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
            onChangeText={data => {
              handleChangeName(data);
            }}
            editable={isEditableNameField}></TextInput>
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={handleNameEditability}>
          <Image
            style={{width: 30, height: 30}}
            source={require('../assets/images/icons/edit-icon.png')}
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
            onChangeText={data => {
              handleChangePhone(data);
            }}
            editable={isEditableNumberField}></TextInput>
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={handleNumberEditability}>
          <Image
            style={{width: 30, height: 30}}
            source={require('../assets/images/icons/edit-icon.png')}
          />
        </TouchableOpacity>
      </View>

      {/* Profile Picture */}
      <View style={[styles.profileField, {position: 'absolute', top: 400}]}>
        <View style={styles.container}>
          <Text style={styles.fieldName}>Change Profile Picture</Text>
        </View>

        <TouchableOpacity style={styles.editButton} onPress={selectImage}>
          <Image
            style={{width: 30, height: 30}}
            source={require('../assets/images/icons/edit-icon.png')}
          />
        </TouchableOpacity>
      </View>

      {/* order */}
      <View style={[styles.profileField, {position: 'absolute', top: 500}]}>
        <View style={styles.container}>
          <Text style={styles.fieldName}>Order History</Text>
        </View>

        <TouchableOpacity style={styles.editButton}>
          <Image
            style={{width: 40, height: 40}}
            source={require('../assets/images/icons/clock-icon.png')}
          />
        </TouchableOpacity>
      </View>

      {/*  Bottom navigation bar */}
      <View style={{width: '100%', height: 70, position: 'absolute', top: 666}}>
        <Navbar navigation={navigation}></Navbar>
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
