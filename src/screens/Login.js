import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useMemo} from 'react';
import Downbar from '../components/Downbar';
import {Colors} from '../../src/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {STATUSES, loginUser} from '../redux/reducers/auth';
import {useEffect} from 'react';

export default function Login({navigation}) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const dispatch = useDispatch();
  const {status, userState} = useSelector(state => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = () => {
    if (email == '') {
      Alert.alert('Please fill the required field');
    } else if (password == '') {
      Alert.alert('Please fill the required field');
    } else if (password.length < 8) {
      Alert.alert('Password should consist of eight character');
    } else {
      const userData = {
        email,
        password,
      };
      dispatch(loginUser(userData))
        .unwrap()
        .then(async data => {
          await AsyncStorage.setItem('customerId', data.UsersId);

          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Login successful !',
          });
          if (data.UserType === 1) {
            navigation.navigate('Homepage');
          } else {
            navigation.navigate('HomepageVendor');
          }
        })
        .catch(error => {
          Toast.show({
            type: 'error',
            text1: 'Incorrect credentials!',
            text2: error,
          });
        });
    }
  };

  // useEffect(() => {
  //   if (userState) {
  //     navigation.replace('Homepage');
  //   }
  // }, []);

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#fffefe"
      />
      <Text style={styles.heading}>Login</Text>

      <View style={[styles.inputField, {top: 200}]}>
        <Image
          style={styles.loginIcon}
          source={require('../assets/images/icons/mail.png')}></Image>
        <TextInput
          style={styles.inputArea}
          placeholder="Email Address"
          placeholderTextColor={'grey'}
          value={email}
          onChangeText={data => setEmail(data)}></TextInput>
      </View>
      {/* password */}

      <View style={[styles.inputField, {top: 290}]}>
        <Image
          style={styles.loginIcon2}
          source={require('../assets/images/icons/password.png')}></Image>
        <TextInput
          style={styles.inputArea}
          placeholder="Password"
          placeholderTextColor={'grey'}
          value={password}
          onChangeText={data => setPassword(data)}></TextInput>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          submit();
        }}>
        <Text style={{fontSize: 20, color: 'black'}}>
          {status === STATUSES.LOADING ? (
            <ActivityIndicator color="black" size="large" />
          ) : (
            'LOGIN'
          )}
        </Text>
      </TouchableOpacity>

      <View style={styles.line1}></View>
      <Text
        style={{
          fontSize: 18,
          color: '#333333',
          position: 'absolute',
          top: 480,
        }}>
        or
      </Text>
      <View style={styles.line2}></View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{position: 'absolute', top: 580}}
        onPress={() => navigation.navigate('AdminSignup')}>
        <Text
          style={{fontSize: 19, color: '#333333', fontFamily: 'Arimo-Bold'}}>
          Create Restaurant Account
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          position: 'absolute',
          top: 550,
          fontSize: 18,
          fontFamily: 'Arimo-Italic',
          color: 'grey',
        }}>
        Don't have an account?
      </Text>

      <TouchableOpacity
        activeOpacity={0.8}
        style={{position: 'absolute', top: 620}}
        onPress={() => navigation.navigate('Signup')}>
        <Text
          style={{fontSize: 19, color: '#333333', fontFamily: 'Arimo-Bold'}}>
          Create an Customer account
        </Text>
      </TouchableOpacity>

      <View
        style={{
          width: 173,
          backgroundColor: '#797979',
          borderWidth: 0.3,
          borderColor: '#797979',
          position: 'absolute',
          top: 610,
        }}></View>

      <View
        style={{
          width: '100%',
          height: 50,
          position: 'relative',
          top: 670,
          paddingTop: 36,
        }}>
        <Downbar></Downbar>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    position: 'relative',
  },

  heading: {
    fontSize: 35,
    fontFamily: 'Montserrat-Bold',
    color: '#000000',
    position: 'absolute',
    top: 100,
  },

  inputField: {
    width: 300,
    height: 50,
    position: 'absolute',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#797979',
    backgroundColor: Colors.primary,
    flex: 1,
    flexDirection: 'row',
  },

  loginIcon: {
    width: 30,
    height: 25,
    marginLeft: 15,
    alignSelf: 'center',
  },
  loginIcon2: {
    width: 30,
    height: 30,
    marginLeft: 15,
    alignSelf: 'center',
  },

  inputArea: {
    marginLeft: 6,
    fontSize: 15,
    textDecorationLine: 'none',
    width: '75%',
    color: 'black',
  },

  button: {
    width: 150,
    height: 40,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#797979',
    position: 'absolute',
    top: 390,
  },

  line1: {
    width: 125,
    backgroundColor: '#797979',
    borderWidth: 0.3,
    borderColor: '#797979',
    position: 'absolute',
    left: 38,
    top: 495,
    color: 'grey',
  },
  line2: {
    width: 125,
    backgroundColor: '#797979',
    borderWidth: 0.3,
    borderColor: '#797979',
    position: 'absolute',
    right: 38,
    top: 495,
    color: 'grey',
  },
});
