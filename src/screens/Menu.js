import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Image } from 'react-native';
import { Colors } from '../constants';
import { Animated } from 'react-native';


export default function Menu() {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const userName = "Maria Pasha"

  const [overlayOpacity, setOverlayOpacity] = useState(new Animated.Value(0));


  const firstLetter = userName.substring(0, 1);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    if (isDrawerOpen) {
      Animated.timing(overlayOpacity, {
        toValue: 0.5,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isDrawerOpen]);


  return (

    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor='#fffefe' />

      <Animated.View
        style={[styles.overlay, { opacity: overlayOpacity }]}
      />

      <TouchableOpacity style={styles.button} onPress={toggleDrawer}>
        <Text style={styles.buttonText}>Open Drawer</Text>
      </TouchableOpacity>

      {/* side drawer */}
      {isDrawerOpen && <View style={styles.drawerContainer}>
        <View style={styles.drawerHeader}>
          <TouchableOpacity style={{ width: 40, height: 40, position: 'absolute', right: 5, top: 5, alignItems: "center" }} onPress={() => {
            toggleDrawer();
            setIsDrawerOpen(false);
          }}>
            <Text style={{ fontSize: 22, color: 'white' }}>x</Text>
          </TouchableOpacity>
          <Text style={styles.drawerHeaderText}>{userName}</Text>
          <TouchableOpacity activeOpacity={0.6}>
            <Text style={{ color: '#5fb3f6', textDecorationLine: 'underline', fontSize: 13, marginLeft: 23 }}>View Profile</Text>
          </TouchableOpacity>

          <View style={{ width: 100, height: 100, borderRadius: 50, position: 'absolute', right: 15, top: 50, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 60, fontFamily: 'Arimo-Bold', color: 'white' }}>{firstLetter}</Text>
          </View>
        </View>
        <View style={styles.drawerContent}>

          <View style={{ width: 200, height: 40, flexDirection: 'row', alignItems: 'center', position: 'absolute', top: 100, left: 20 }}>
            <Image style={{ width: 50, height: 40, }} source={require('../assets/images/icons/right.png')} />
            <TouchableOpacity style={{ marginLeft: 10 }} activeOpacity={0.7}>
              <Text style={{ color: 'black', fontSize: 16, fontFamily: 'Montserrat-Bold', }}>Home</Text>
            </TouchableOpacity>
          </View>

          <View style={{ width: 250, height: 40, flexDirection: 'row', alignItems: 'center', position: 'absolute', top: 150, left: 20 }}>
            <Image style={{ width: 50, height: 40, }} source={require('../assets/images/icons/right.png')} />
            <TouchableOpacity style={{ marginLeft: 10 }} activeOpacity={0.7}>
              <Text style={{ color: 'black', fontSize: 16, fontFamily: 'Montserrat-Bold', }}>Orders & Reordering</Text>
            </TouchableOpacity>
          </View>

          <View style={{ width: 200, height: 40, flexDirection: 'row', alignItems: 'center', position: 'absolute', top: 200, left: 20 }}>
            <Image style={{ width: 50, height: 40, }} source={require('../assets/images/icons/right.png')} />
            <TouchableOpacity style={{ marginLeft: 10 }} activeOpacity={0.7}>
              <Text style={{ color: 'black', fontSize: 16, fontFamily: 'Montserrat-Bold', }}>Payment Methods</Text>
            </TouchableOpacity>
          </View>

          <View style={{ width: 200, height: 40, flexDirection: 'row', alignItems: 'center', position: 'absolute', top: 250, left: 20 }}>
            <Image style={{ width: 50, height: 40, }} source={require('../assets/images/icons/right.png')} />
            <TouchableOpacity style={{ marginLeft: 10 }} activeOpacity={0.7}>
              <Text style={{ color: 'black', fontSize: 16, fontFamily: 'Montserrat-Bold', }}>Contact Us</Text>
            </TouchableOpacity>
          </View>

          <View style={{ width: 200, height: 40, flexDirection: 'row', alignItems: 'center', position: 'absolute', top: 300, left: 20 }}>
            <Image style={{ width: 50, height: 40, }} source={require('../assets/images/icons/right.png')} />
            <TouchableOpacity style={{ marginLeft: 10 }} activeOpacity={0.7}>
              <Text style={{ color: 'red', fontSize: 16, fontFamily: 'Montserrat-Bold', }}>Logout</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={{ position: 'absolute', top: 480, left: 20 }} activeOpacity={0.7}>
            <Text style={{ color: 'black', textDecorationLine: 'underline', fontSize: 14 }}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ position: 'absolute', top: 500, left: 20 }} activeOpacity={0.7}>
            <Text style={{ color: 'black', textDecorationLine: 'underline', fontSize: 14 }}>Terms & Conditions</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ position: 'absolute', top: 520, left: 20 }} activeOpacity={0.7}>
            <Text style={{ color: 'black', textDecorationLine: 'underline', fontSize: 14 }}>Privacy Policies</Text>
          </TouchableOpacity>

        </View>
      </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: "100%",
    width: 280,
    borderTopEndRadius: 20

  },
  drawerHeader: {
    height: 110,
    backgroundColor: Colors.primary,
    borderTopEndRadius: 20
  },
  drawerHeaderText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    marginTop: 50,
    marginLeft: 6
  },
  drawerContent: {
    flex: 1,
    padding: 10,

  },
  drawerText: {
    fontSize: 16,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    blurRadius: 5,
  },
});
