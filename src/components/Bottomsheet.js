import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { IconButton, Portal } from "react-native-paper";

export default function BottomSheet(show, onDismiss, children)
{
    const bottomSheetHeight= Dimensions.get("window").height * 0.5;
    const deviceWidth= Dimensions.get("window").width;
    const [open, setOpen]= useState(show)
    const bottom = useRef(new Animated.Value(-bottomSheetHeight)).current;

    useEffect(()=>{
        if(show){
            setOpen(show);
            Animated.timing(bottom,{
                toValue:0,
                duration:500,
                useNativeDriver:false
            }).start();
        }else{
            Animated.timing(bottom,{
                toValue:-bottomSheetHeight,
                duration:500,
                useNativeDriver:false
        }).start(()=>{
            setOpen(false)
        });
    }
    },[show]);


    if(!open){
        return null
    }
  

    const onGesture= (event)=>{
        if(event.nativeEvent.translationY >0){
            bottom.setValue(-event.nativeEvent.translationY)
        }
    }

    const onGestureEnd= (event)=>{
        
    }
    
      return (
        <Portal>
        <Animated.View  style={[styles.mainContainer, {height:bottomSheetHeight, bottom:bottom, shadowOffset:{ height:-3}}, styles.common]}>

<PanGestureHandler onGestureEvent={onGesture} onEnded={onGestureEnd}>
        <View style={[styles.header,{shadowOffset:{ height:3}}, styles.common]}>

            <View style={{
                width:50,
                height:3,
                borderRadius:1.5,
                position:'absolute',
                top:8,
                left:(deviceWidth - 40 ) / 2,
                zIndex:10,
                backgroundColor:'#ccc'

            }}/>

            

        </View>

        </PanGestureHandler>
       {children}
        </Animated.View>

      </Portal>
      )
  
}

const styles = StyleSheet.create({
    mainContainer: {
    position:'absolute',
    left:0,
    right:0,
    zIndex: 100,
    backgroundColor:"#fff",
    borderTopLeftRadius:16,
    borderTopRightRadius:16, 
    overflow:'hidden',
   shadowColor:"#000",
   shadowOffset:{
    height:-3,
    width:0,
 },
 overflow:'hidden',
    shadowOpacity:1,
    shadowRadius:4,
    elevation:3
    },

    header:{
        height:50,
        backgroundColor:"#fff"
    },

    common:{
        shadowColor:"#000",
        shadowOffset:{
         width:0,
      },
         shadowOpacity:0.24,
         shadowRadius:4,
         elevation:3
    },

    closeIcon:{
        position:'absolute',
        right:0,
        top:0,
        zIndex:10,
    
    }
})  