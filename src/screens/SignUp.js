import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import Toast from 'react-native-toast-message';
import {Colors} from '../../src/constants';
import Downbar from '../components/Downbar';
import CheckBox from '@react-native-community/checkbox';
import {useDispatch, useSelector} from 'react-redux';
import {STATUSES, registerUser} from '../redux/reducers/auth';

export default function SignUp({navigation}) {
  const [name, setName] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [agree, setAgree] = useState(false);

  const {status} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const currentUser = 'user';

  const submit = () => {
    if (name == '') {
      Alert.alert('Please fill the required fields');
    } else if (phoneNumber == '') {
      Alert.alert('Please fill the required fields');
    } else if (email == '') {
      Alert.alert('Please fill the required fields');
    } else if (password == '') {
      Alert.alert('Please fill the required fields');
    } else if (!agree) {
      Alert.alert('Please accept the privacy policies');
    } else {
      if (currentUser === 'user') {
        const userData = {
          customerName: name,
          contactNo: phoneNumber,
          email: email,
          password: password,
          locationId: 0,
        };
        dispatch(registerUser(userData))
          .unwrap()
          .then(data => {
            setName('');
            setPhoneNumber('');
            setEmail('');
            setPassword('');
            setAgree(false);
            Toast.show({
              type: 'success',
              text1: 'Success',
              text2: 'Sing Up successful !',
            });
            navigation.navigate('Login');
          })
          .catch(error => {
            Toast.show({
              type: 'error',
              text1: 'toast',
              text2: error,
            });
          });
      }
    }
  };

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
            borderRadius: 25,
            borderColor: '#797979',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('Login')}>
          <Image
            style={{width: 35, height: 30}}
            source={require('../assets/images/icons/back-arrow.png')}></Image>
        </TouchableOpacity>

        <Text style={styles.heading1}>Create</Text>
        <Text style={styles.heading2}>An Account</Text>
        <Image
          style={styles.accountIcon}
          source={require('../assets/images/icons/account-logo.png')}></Image>

        {/* input fields */}

        <View style={styles.inputField1}>
          <TextInput
            style={styles.inputArea}
            placeholder="Full Name"
            placeholderTextColor={'grey'}
            autoComplete="off"
            autoCorrect={false}
            autoCapitalize="none"
            value={name}
            onChangeText={data => setName(data)}></TextInput>
        </View>

        <View style={styles.inputField2}>
          <TextInput
            style={styles.inputArea}
            placeholder="Phone Number"
            placeholderTextColor={'grey'}
            autoComplete="off"
            autoCorrect={false}
            autoCapitalize="none"
            value={phoneNumber}
            onChangeText={data => setPhoneNumber(data)}></TextInput>
        </View>

        <View style={styles.inputField3}>
          <TextInput
            style={styles.inputArea}
            placeholder="Email Address"
            placeholderTextColor={'grey'}
            autoComplete="off"
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={data => setEmail(data)}></TextInput>
        </View>

        <View style={styles.inputField4}>
          <TextInput
            style={styles.inputArea}
            placeholder="Password"
            placeholderTextColor={'grey'}
            autoComplete="off"
            autoCorrect={false}
            autoCapitalize="none"
            value={password}
            onChangeText={data => setPassword(data)}></TextInput>
        </View>

        {/* Privacy checkbox */}

        <View
          style={{
            position: 'absolute',
            top: 530,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <CheckBox value={agree} onValueChange={() => setAgree(!agree)} />

          <Text style={{color: 'black', fontSize: 16}}>
            I accept all the privacy policies
          </Text>
        </View>

        {/* Signup button */}

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            submit();
          }}>
          <Text style={{fontSize: 20, color: 'black'}}>
            {status === STATUSES.LOADING ? (
              <ActivityIndicator color="black" size="large" />
            ) : (
              'Sign up'
            )}
          </Text>
        </TouchableOpacity>

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
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    position: 'relative',
  },
  scrollContentContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },

  heading1: {
    fontSize: 30,
    fontFamily: 'Montserrat-Bold',
    color: '#000000',
    position: 'absolute',
    top: 80,
  },
  heading2: {
    fontSize: 30,
    fontFamily: 'Montserrat-Bold',
    color: '#000000',
    position: 'absolute',
    top: 120,
  },
  accountIcon: {
    width: 50,
    height: 45,
    position: 'absolute',
    top: 170,
  },

  inputField1: {
    width: 300,
    height: 50,
    position: 'absolute',
    top: 250,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#797979',
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  inputField2: {
    width: 300,
    height: 50,
    position: 'absolute',
    top: 320,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#797979',
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  inputField3: {
    width: 300,
    height: 50,
    position: 'absolute',
    top: 390,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#797979',
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  inputField4: {
    width: 300,
    height: 50,
    position: 'absolute',
    top: 460,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#797979',
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },

  inputArea: {
    marginLeft: 6,
    fontSize: 16,
    textDecorationLine: 'none',
  },

  button: {
    width: 150,
    height: 45,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#797979',
    position: 'absolute',
    top: 600,
  },
});
