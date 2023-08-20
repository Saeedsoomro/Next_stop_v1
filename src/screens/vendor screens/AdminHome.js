import {View, Text, StyleSheet, Image, StatusBar} from 'react-native';
import React from 'react';
import Downbar from '../../components/Downbar';
import {Colors} from '../../constants';

export default function AdminHome({navigation}) {
  setTimeout(() => {
    navigation.replace('AdminSignup');
  }, 4000);

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={Colors.primary}
      />
      <Image
        style={styles.logoImage}
        source={require('../../assets/images/icons/logo.png')}
      />

      <View
        style={{
          width: '100%',
          height: 50,
          position: 'relative',
          top: 263,
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    boxSizing: 'border-box',
  },

  logoImage: {
    height: 112,
    width: 245,
    marginBottom: 30,
  },
});
