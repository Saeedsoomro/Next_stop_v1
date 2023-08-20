import React, { useState, useRef } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Colors } from '../../constants';
import VendorsNavbar from '../../components/VendorsNavbar';
import BottomSheet from 'react-native-raw-bottom-sheet';
import Downbar from '../../components/Downbar';
import ImageCropPicker from 'react-native-image-crop-picker';


  


export default function HomepageSettings({navigation}) {

  const bottomSheetRef1 = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);

  const selectImage = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      multiple: false,
    })
      .then((response) => {
        const source = { uri: response.path };
        setSelectedImage(source);
      })
      .catch((error) => {
        console.log('ImagePicker Error: ', error);
      });
  };

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
          onPress={() => navigation.navigate("HomepageProfile")}
        >

          <Image style={{ width: 35, height: 25, }} source={require('../../assets/images/icons/back-arrow2.png')}></Image>


        </TouchableOpacity>

        <Text style={{ position: 'absolute', left: 130, top: 15, color: 'black', fontFamily: 'Montserrat-Bold', fontSize: 26 }}>Settings</Text>

      </View>

      {/* Account Settings */}

      <View style={{ width: "90%", height: 250, position: 'absolute', top: 90, alignSelf: "center", }}>
        <Text style={{ color: 'black', fontFamily: 'Montserrat-Bold', fontSize: 20, marginLeft: 5, marginBottom: 10 }}>Account Settings</Text>

        {/* Profile Information */}

        <TouchableOpacity activeOpacity={0.7} style={{ width: '100%', height: 50, borderWidth: 1, borderRadius: 20, backgroundColor: '#ffe979', marginTop: 10, flexDirection: 'row', alignItems: "center" }}
        onPress={() => navigation.navigate("Information")}>
          <Image
            style={{
              width: 40,
              height: 40,
              marginRight: 12,
              marginLeft: 10,
            }}
            source={require('../../assets/images/icons/person-icon.png')} />

          <Text style={{ color: 'black', fontFamily: 'Montserrat-Bold', fontSize: 18, }}>Profile Information</Text>

          <Image
            style={{
              width: 45,
              height: 45,
              marginLeft: 35,
            }}
            source={require('../../assets/images/icons/right-arrow-head.png')} />
        </TouchableOpacity>

        {/* Address */}

        <TouchableOpacity activeOpacity={0.7} style={{ width: '100%', height: 50, borderWidth: 1, borderRadius: 20, backgroundColor: '#ffe979', marginTop: 15, flexDirection: 'row', alignItems: "center" }}>
          <Image
            style={{
              width: 35,
              height: 35,
              marginRight: 14,
              marginLeft: 10,
            }}
            source={require('../../assets/images/icons/location-icon.png')} />

          <Text style={{ color: 'black', fontFamily: 'Montserrat-Bold', fontSize: 18, }}>Address</Text>

          <Image
            style={{
              width: 45,
              height: 45,
              marginLeft: 140,
            }}
            source={require('../../assets/images/icons/right-arrow-head.png')} />

        </TouchableOpacity>

        {/*Change logo*/}

        <TouchableOpacity activeOpacity={0.7} style={{ width: '100%', height: 50, borderWidth: 1, borderRadius: 20, backgroundColor: '#ffe979', marginTop: 15, flexDirection: 'row', alignItems: "center" }}
        onPress={selectImage}>
          <Image
            style={{
              width: 40,
              height: 40,
              marginRight: 10,
              marginLeft: 10,
            }}
            source={require('../../assets/images/icons/changelogo-icon.png')} />

          <Text style={{ color: 'black', fontFamily: 'Montserrat-Bold', fontSize: 18, }}>Change Logo</Text>

          <Image
            style={{
              width: 45,
              height: 45,
              marginLeft: 87,
            }}
            source={require('../../assets/images/icons/right-arrow-head.png')} />

        </TouchableOpacity>
      </View>


      {/* Account Settings 2 */}

      <View style={{ width: "90%", height: 250, position: 'absolute', top: 350, alignSelf: "center", }}>
        <Text style={{ color: 'black', fontFamily: 'Montserrat-Bold', fontSize: 20, marginLeft: 5, marginBottom: 10 }}>Account Settings</Text>



        {/*Delete Account */}

        <TouchableOpacity activeOpacity={0.7} style={{ width: '100%', height: 50, borderWidth: 1, borderRadius: 20, backgroundColor: '#ffe979', marginTop: 15, flexDirection: 'row', alignItems: "center" }}
          onPress={() => bottomSheetRef1.current.open()}>
          <Image
            style={{
              width: 30,
              height: 30,
              marginRight: 16,
              marginLeft: 10,
            }}
            source={require('../../assets/images/icons/delete-icon.png')} />

          <Text style={{ color: 'black', fontFamily: 'Montserrat-Bold', fontSize: 18, }}>Delete Account</Text>

          <Image
            style={{
              width: 45,
              height: 45,
              marginLeft: 70,
            }}
            source={require('../../assets/images/icons/right-arrow-head.png')} />


          {/*delete Bottom Sheet */}

          <BottomSheet ref={bottomSheetRef1} customStyles={{
            container: {
              height: 170, borderTopStartRadius: 10, borderTopEndRadius: 10, borderTopColor: 'black', borderTopWidth: 1, borderStartColor: 'black', borderStartWidth: 1, borderEndColor: 'black', borderEndWidth: 1,
            },
          }}
            closeOnDragDown={true}>
            <View style={styles.bottomDrawer}>

              <TouchableOpacity style={{
                width: 170,
                height: 37,
                backgroundColor: '#ff3131',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderRadius: 15,
                borderColor: '#797979',
                alignSelf: 'center', marginTop: 10
              }} activeOpacity={0.7}
              onPress={() => navigation.navigate("Login")}>
                <Text style={{ fontSize: 18, color: 'white', fontFamily: 'Arimo-Regular' }}>Delete Account</Text>
              </TouchableOpacity>

            </View>

            <View style={{ width: "100%", height: 70, position: 'absolute', top: 113, }}>

              {/* bottom navigation bar */}
              <View style={{ width: "100%", height: 56, backgroundColor: Colors.primary, }} >

                {/* bottom navigation bar */}
                <View style={{ flex: 1, flexDirection: 'row', width: "100%", height: 55, }}>

                  <TouchableOpacity activeOpacity={0.6} style={styles.navbar}>
                    <Image
                      style={{
                        width: 48,
                        height: 55,
                        position: 'absolute',
                        top: -9
                      }}
                      source={require('../../assets/images/icons/homepage-icon.png')} />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.navbar} activeOpacity={0.6}>

                    <Image
                      style={{
                        width: 35,
                        height: 35,
                        position: 'absolute',
                        top: 3
                      }}
                      source={require('../../assets/images/icons/order-history-icon.png')} />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.navbar} activeOpacity={0.6}>
                    <Image
                      style={{
                        width: 37,
                        height: 37,
                        position: 'absolute',
                        top: 2
                      }}
                      source={require('../../assets/images/icons/nav-icon1.png')} />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.navbar} activeOpacity={0.6}>
                    <Image
                      style={{
                        width: 40,
                        height: 40,
                        position: 'absolute',
                        top: 2
                      }}
                      source={require('../../assets/images/icons/clock-icon.png')} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.navbar} activeOpacity={0.6}>
                    <Image
                      style={{
                        width: 34,
                        height: 34,
                        position: 'absolute',
                        top: 5
                      }}
                      source={require('../../assets/images/icons/nav-icon2.png')} />
                  </TouchableOpacity>
                </View>

                <Downbar></Downbar>

              </View>
            </View>
          </BottomSheet>

        </TouchableOpacity>

        {/*Logout*/}

        <TouchableOpacity activeOpacity={0.7} style={{ width: '100%', height: 50, borderWidth: 1, borderRadius: 20, backgroundColor: '#ffe979', marginTop: 15, flexDirection: 'row', alignItems: "center" }}
        onPress={() => navigation.navigate("Login")}>
          <Image
            style={{
              width: 40,
              height: 40,
              marginRight: 10,
              marginLeft: 10,
            }}
            source={require('../../assets/images/icons/logout-icon.png')} />

          <Text style={{ color: 'black', fontFamily: 'Montserrat-Bold', fontSize: 18, }}>Logout</Text>

          <Image
            style={{
              width: 45,
              height: 45,
              marginLeft: 140,
            }}
            source={require('../../assets/images/icons/right-arrow-head.png')} />

        </TouchableOpacity>
      </View>





      {/*  Bottom navigation bar */}
      <View style={{ width: "100%", height: 70, position: 'absolute', top: 666, }}>
        <VendorsNavbar navigation={navigation}/>
      </View>


    </View>

  )
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  bottomDrawer: {
    width: "100%",
    height: 200,
    alignItems: 'center'
  },
  container: {
    width: '90%',
    height: 30,
    flexDirection: 'row',
    marginBottom: 5,
    marginLeft: 30
  },
  bottomSheetText: {
    color: '#333333',
    fontSize: 18,
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



})


{/*

import React, { useState } from 'react';
import { View, Text, TouchableOpacity , StyleSheet,Image} from 'react-native';


export default function Demo() {

  const [defaultRating, setDefaultRating] = useState(2);

  const [maxRating, setMaxRating]= useState([1,2,3,4,5])

  const starImgFilled=require('../../assets/images/icons/star_filled.png')

  const starImgCorner=require('../../assets/images/icons/star_corner.png')


  
  
  
    return (
      <View style={styles.customRatingBarStyles}>
      {
        maxRating.map((item,key)=>{
          return(
            <TouchableOpacity
            activeOpacity={0.7}
            key={item}
            onPress={()=> setDefaultRating(item)}>

<Image style={styles.starImgStyle} source={ item <= defaultRating ? {starImgFilled} :  {starImgCorner}} />
            </TouchableOpacity>
          )
        }

        )
      }
      
    </View>
  );
};

const styles = StyleSheet.create({
 customRatingBarStyles: {
      justifyContent:"center",
      flexDirection:'row',
      marginTop:30, 
      width:200,
      height:100,
      borderWidth:1

  },

  starImgStyle:{
    width:40,
    height:40,
    resizeMode:'cover'
  }
})


*/}