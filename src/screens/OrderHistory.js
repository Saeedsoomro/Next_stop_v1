import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Image, ScrollView } from 'react-native';
import { Colors } from '../constants';
import Downbar from '../components/Downbar';



export default function OrderHistory({navigation}) {



  return (

    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor='#fffefe' />

      <View style={{ flexDirection: 'row' }}>

        {/* back button */}

        <TouchableOpacity activeOpacity={0.5}
          style={{
            width: 45,
            height: 45,
            position: 'absolute',
            left: 10,
            top: 10,
            borderWidth: 1,
            borderRadius: 30,
            borderColor: "black",
            alignItems: "center",
            justifyContent: "center"
          }}

          onPress={() => navigation.navigate("Homepage")}
        >

          <Image style={{ width: 35, height: 25, }} source={require('../assets/images/icons/back-arrow2.png')}></Image>


        </TouchableOpacity>

        <Text style={{ position: 'absolute', left: 100, top: 15, color: 'black', fontFamily: 'Montserrat-Bold', fontSize: 26 }}>Order History</Text>

      </View>

      <View style={{ position: 'absolute', top: 160, width: '90%', height: 400, marginLeft: 18, alignItems: 'center' }}>
        <Image
          style={{
            width: 150,
            height: 150,

          }}

          resizeMode="contain"
          source={require('../assets/images/icons/order-icon.png')} />

        <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 20, color: 'black', marginTop: 10 }}>No Orders</Text>

        <Text style={{ fontSize: 15, marginTop: 10 , color:'grey'}}>You can see your previous orders here</Text>


        <TouchableOpacity style={styles.button}
        onPress={() => navigation.navigate("Homepage")}>
          <Text style={{ fontSize: 20, color: 'black' }}>Go Back</Text>
        </TouchableOpacity>

      </View>

      {/* bottom navigation bar */}
      <View style={{ width: "100%", height: 56, backgroundColor: Colors.primary, position: 'absolute', top: 665 }} >

        <View style={{ flex: 1, flexDirection: 'row', width: "100%", height: 55, }}>

          <TouchableOpacity activeOpacity={0.6} style={styles.navbar} 
           onPress={() => navigation.navigate("Homepage")} >


            <Image
              style={{
                width: 48,
                height: 55,
                position: 'absolute',
                top: -9
              }}
              source={require('../assets/images/icons/homepage-icon.png')} />
          </TouchableOpacity>

          <TouchableOpacity style={{
            position: 'relative',
            width: "20%",
            height: 45,
            alignItems: 'center'
          }} activeOpacity={0.6}>

            <Image
              style={{
                width: 35,
                height: 35,
                position: 'absolute',
                top: 3
              }}
              source={require('../assets/images/icons/order-history-icon.png')} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navbar} activeOpacity={0.6}
           onPress={() => navigation.navigate("Favourites")}>
            <Image
              style={{
                width: 23,
                height: 30,
                position: 'absolute',
                top: 6
              }}
              source={require('../assets/images/icons/favorites-icon.png')} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navbar} activeOpacity={0.6}
           onPress={() => navigation.navigate("ReviewTimeline")}>
            <Image
              style={{
                width: 62,
                height: 55,
                position: 'absolute',
                top: -4
              }}
              source={require('../assets/images/icons/timeline-icon.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navbar} activeOpacity={0.6}
           onPress={() => navigation.navigate("DealsAndDiscount")}>
            <Image
              style={{
                width: 34,
                height: 44,
                position: 'absolute',
                top: 0
              }}
              source={require('../assets/images/icons/discount-icon.png')} />
          </TouchableOpacity>
        </View>

        <Downbar></Downbar>

      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  button: {
    width: 130,
    height: 40,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#797979',
    alignSelf: 'center',
    marginTop: 70

  },
  navbar: {
    position: 'relative',
    borderTopWidth: 2.5,
    width: "20%",
    height: 45,
    alignItems: 'center'

  },

  navbarImage: {
    width: 50,
    height: 60,
    position: 'absolute',
    top: -9
  }

});
