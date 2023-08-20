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
import Downbar from '../../components/Downbar';
import {Colors} from '../../constants';
import {STATUSES, loginAdmin} from '../../redux/reducers/restaurantSlice';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {status} = useSelector(state => state.restaurant);
  {
    /*
  const isFormValid = useMemo(() => {
    return email.length < 1;
  }, [email]);

*/
  }
  const submit = () => {
    if (email == '') {
      Alert.alert('Please fill the required field');
    } else if (password == '') {
      Alert.alert('Please fill the required field');
    } else if (password.length < 8) {
      Alert.alert('Password should consist of eight character');
    } else {
      const restaurantData = {
        email: email,
        password: password,
      };
      // dispatch(loginAdmin(restaurantData))
      //   .unwrap()
      //   .then(data => {
      //     Toast.show({
      //       type: 'success',
      //       text1: 'Success',
      //       text2: 'Login successful !',
      //     });
      //     navigation.navigate('HomepageVendor');
      //   })
      //   .catch(error => {
      //     Toast.show({
      //       type: 'error',
      //       text1: 'Incorrect credentials!',
      //       text2: error,
      //     });
      //     console.log(error);
      //   });
      navigation.navigate('HomepageVendor');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#fffefe"
      />
      <Text style={styles.heading}>Login</Text>

      {/* email */}
      <View style={[styles.inputField, {top: 200}]}>
        <Image
          style={styles.loginIcon}
          source={require('../../assets/images/icons/mail.png')}></Image>
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
          source={require('../../assets/images/icons/password.png')}></Image>
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
        style={{position: 'absolute', top: 580}}
        onPress={() => navigation.navigate('Login')}>
        <Text
          style={{fontSize: 19, color: '#333333', fontFamily: 'Arimo-Bold'}}>
          Login As Customer
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{position: 'absolute', top: 620}}
        onPress={() => navigation.navigate('AdminSignup')}>
        <Text
          style={{fontSize: 19, color: '#333333', fontFamily: 'Arimo-Bold'}}>
          Create an account
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
          color: 'grey',
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
