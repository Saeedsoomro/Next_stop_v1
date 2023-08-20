import { View, Text, StyleSheet, Image, StatusBar, TextInput, TouchableOpacity,FlatList } from "react-native";
import React, { useState } from "react";
import { Colors } from '../../src/constants';
import Downbar from "../components/Downbar";
import homepageData from "../constants/data";


export default function VendorsNavbar({navigation}) {

  return (


    <View style={{ width:"100%",height:56, backgroundColor: Colors.primary,}} >

{/* bottom navigation bar */}
<View style={{flex:1,flexDirection:'row', width:"100%",height:55,  }}>

  <TouchableOpacity 

  activeOpacity={0.6}
  style={{ 
    position: 'relative',
     width:"20%", 
     height:45, 
     alignItems:'center'}}>


  <Image
          style={{ width: 48, 
            height: 55,
            position:'absolute',
            top: -9 }}
          source={require('../assets/images/icons/homepage-icon.png')} />
  </TouchableOpacity>

  <TouchableOpacity style={styles.navbar} activeOpacity={0.6}
 onPress={() => navigation.navigate("MenuReservationSeats")}>
  
  <Image
          style={{ width: 35, 
            height: 35,
            position:'absolute',
            top: 3 }}
          source={require('../assets/images/icons/order-history-icon.png')} />
  </TouchableOpacity>

  <TouchableOpacity style={styles.navbar} activeOpacity={0.6}
   onPress={() => navigation.navigate("OrderTrackingToday")}>
  <Image
          style={{ width: 37, 
            height: 37,
            position:'absolute',
            top: 2 }}
          source={require('../assets/images/icons/nav-icon1.png')} />
  </TouchableOpacity>

  <TouchableOpacity style={styles.navbar} activeOpacity={0.6}
   onPress={() => navigation.navigate("ReviewTimelineVendors")}>
  <Image
          style={{ width: 40, 
            height: 40,
            position:'absolute',
            top: 2 }}
          source={require('../assets/images/icons/clock-icon.png')} />
  </TouchableOpacity>
  <TouchableOpacity style={styles.navbar} activeOpacity={0.6}
   onPress={() => navigation.navigate("Information")}>
  <Image
          style={{ width: 34, 
            height: 34,
            position:'absolute',
            top: 5}}
          source={require('../assets/images/icons/nav-icon2.png')} />
  </TouchableOpacity>
</View>

<Downbar></Downbar>

    </View>
  );
}



const styles = StyleSheet.create({

  navbar:{
    position: 'relative',
    borderTopWidth:2.5,
     width:"20%", 
     height:45, 
     alignItems:'center'
    
  },

  navbarImage:{
    width: 50, 
            height: 60,
            position:'absolute',
            top: -9   
  }


})


  
      