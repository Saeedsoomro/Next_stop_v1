import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../src/constants';
import Downbar from '../components/Downbar';

export default function Navbar({navigation}) {
  return (
    <View style={{width: '100%', height: 56, backgroundColor: Colors.primary}}>
      {/* bottom navigation bar */}
      <View style={{flex: 1, flexDirection: 'row', width: '100%', height: 55}}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={{
            position: 'relative',
            width: '20%',
            height: 45,
            alignItems: 'center',
          }}>
          <Image
            style={{width: 48, height: 55, position: 'absolute', top: -9}}
            source={require('../assets/images/icons/homepage-icon.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navbar}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('OrderHistory')}>
          <Image
            style={{width: 35, height: 35, position: 'absolute', top: 3}}
            source={require('../assets/images/icons/order-history-icon.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navbar}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('Favourites')}>
          <Image
            style={{width: 23, height: 30, position: 'absolute', top: 6}}
            source={require('../assets/images/icons/favorites-icon.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navbar}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('ReviewTimeline')}>
          <Image
            style={{width: 62, height: 55, position: 'absolute', top: -4}}
            source={require('../assets/images/icons/timeline-icon.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navbar}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('DealsAndDiscount')}>
          <Image
            style={{width: 34, height: 44, position: 'absolute', top: 0}}
            source={require('../assets/images/icons/discount-icon.png')}
          />
        </TouchableOpacity>
      </View>

      <Downbar></Downbar>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
