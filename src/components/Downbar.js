import { View, Text, StyleSheet, Image, StatusBar ,TouchableOpacity} from "react-native";
import React from "react";
import { Colors } from '../../src/constants';




export default function Downbar() {


  return (
    

<View style={styles.smallBar}></View>

    
   


  );



}

const styles = StyleSheet.create({
  
  smallBar: {

    width: 180,
    height: 8,
    backgroundColor: '#d7d7d7',
    borderRadius: 10,
    marginBottom:5,
    //position: 'absolute',
    //top: 710,
   alignSelf:'center'


  }

})

