import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {Colors} from '../constants';
import Navbar from '../components/Navbar';
import {Linking} from 'react-native';
import BottomSheet from 'react-native-raw-bottom-sheet';
import Downbar from '../components/Downbar';
import {useSelector} from 'react-redux';

export default function Settings({navigation}) {
  const bottomSheetRef = useRef(null);

  const bottomSheetRef1 = useRef(null);

  const bottomSheetRef2 = useRef(null);

  const [rating, setRating] = useState(0);
  const {userState} = useSelector(state => state.auth);

  const handlePress = value => {
    if (value === rating) {
      setRating(0);
    } else {
      setRating(value);
    }
  };

  const getStarColor = index => {
    if (index <= rating) {
      return 'gold';
    }
    return 'gray';
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#fffefe"
      />
      <View style={{flexDirection: 'row'}}>
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
            borderRadius: 30,
            borderColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('UserProfile')}>
          <Image
            style={{width: 35, height: 25}}
            source={require('../assets/images/icons/back-arrow2.png')}></Image>
        </TouchableOpacity>

        <Text
          style={{
            position: 'absolute',
            left: 130,
            top: 15,
            color: 'black',
            fontFamily: 'Montserrat-Bold',
            fontSize: 26,
          }}>
          Settings
        </Text>
      </View>

      {/* Account Settings */}

      <View
        style={{
          width: '90%',
          height: 250,
          position: 'absolute',
          top: 90,
          alignSelf: 'center',
        }}>
        <Text
          style={{
            color: 'black',
            fontFamily: 'Montserrat-Bold',
            fontSize: 20,
            marginLeft: 5,
            marginBottom: 10,
          }}>
          Account Settings
        </Text>

        {/* Profile Information */}

        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            width: '100%',
            height: 50,
            borderWidth: 1,
            borderRadius: 20,
            backgroundColor: '#ffe979',
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => bottomSheetRef.current.open()}>
          <Image
            style={{
              width: 40,
              height: 40,
              marginRight: 12,
              marginLeft: 10,
            }}
            source={require('../assets/images/icons/person-icon.png')}
          />

          <Text
            style={{
              color: 'black',
              fontFamily: 'Montserrat-Bold',
              fontSize: 18,
            }}>
            Profile Information
          </Text>

          <Image
            style={{
              width: 45,
              height: 45,
              marginLeft: 35,
            }}
            source={require('../assets/images/icons/right-arrow-head.png')}
          />

          {/* Profile Bottom Sheet */}
          <BottomSheet
            ref={bottomSheetRef}
            customStyles={{
              container: {
                height: 360,
                borderTopStartRadius: 10,
                borderTopEndRadius: 10,
                borderTopColor: 'black',
                borderTopWidth: 1,
                borderStartColor: 'black',
                borderStartWidth: 1,
                borderEndColor: 'black',
                borderEndWidth: 1,
              },
            }}
            closeOnDragDown={true}>
            <View style={styles.bottomDrawer}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Bold',
                  color: 'black',
                  fontSize: 20,
                  marginBottom: 20,
                }}>
                Profile Information
              </Text>

              <View style={styles.container}>
                <Text style={styles.bottomSheetText}>
                  Name : {userState?.CustomerName}
                </Text>
              </View>

              <View style={styles.container}>
                <Text style={styles.bottomSheetText}>
                  Phone Number : {userState?.ContactNo}
                </Text>
              </View>

              <View style={styles.container}>
                <Text style={styles.bottomSheetText}>
                  CNIC : 43302 23023 23203
                </Text>
              </View>

              <View style={styles.container}>
                <Text style={styles.bottomSheetText}>Total Orders : 0</Text>
              </View>
            </View>

            <TouchableOpacity
              style={{
                width: 130,
                height: 35,
                backgroundColor: Colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderRadius: 15,
                borderColor: '#797979',
                alignSelf: 'center',
                marginTop: 10,
              }}
              activeOpacity={0.6}
              onPress={() => bottomSheetRef.current.close()}>
              <Text style={{fontSize: 20, color: 'black'}}>Close</Text>
            </TouchableOpacity>

            <View
              style={{
                width: '100%',
                height: 70,
                position: 'absolute',
                top: 303,
              }}>
              <View
                style={{
                  width: '100%',
                  height: 56,
                  backgroundColor: Colors.primary,
                }}>
                {/* bottom navigation bar */}
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    width: '100%',
                    height: 55,
                  }}>
                  <TouchableOpacity
                    style={styles.navbar}
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('Homepage')}>
                    <Image
                      style={{
                        width: 48,
                        height: 55,
                        position: 'absolute',
                        top: -9,
                      }}
                      source={require('../assets/images/icons/homepage-icon.png')}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.navbar}
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('OrderHistory')}>
                    <Image
                      style={{
                        width: 35,
                        height: 35,
                        position: 'absolute',
                        top: 3,
                      }}
                      source={require('../assets/images/icons/order-history-icon.png')}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.navbar}
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('Favourites')}>
                    <Image
                      style={{
                        width: 23,
                        height: 30,
                        position: 'absolute',
                        top: 6,
                      }}
                      source={require('../assets/images/icons/favorites-icon.png')}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.navbar}
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('ReviewTimeline')}>
                    <Image
                      style={{
                        width: 62,
                        height: 55,
                        position: 'absolute',
                        top: -4,
                      }}
                      source={require('../assets/images/icons/timeline-icon.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.navbar}
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('DealsAndDiscount')}>
                    <Image
                      style={{
                        width: 34,
                        height: 44,
                        position: 'absolute',
                        top: 0,
                      }}
                      source={require('../assets/images/icons/discount-icon.png')}
                    />
                  </TouchableOpacity>
                </View>

                <Downbar></Downbar>
              </View>
            </View>
          </BottomSheet>
        </TouchableOpacity>

        {/* Address */}

        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            width: '100%',
            height: 50,
            borderWidth: 1,
            borderRadius: 20,
            backgroundColor: '#ffe979',
            marginTop: 15,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: 35,
              height: 35,
              marginRight: 14,
              marginLeft: 10,
            }}
            source={require('../assets/images/icons/location-icon.png')}
          />

          <Text
            style={{
              color: 'black',
              fontFamily: 'Montserrat-Bold',
              fontSize: 18,
            }}>
            Address
          </Text>

          <Image
            style={{
              width: 45,
              height: 45,
              marginLeft: 140,
            }}
            source={require('../assets/images/icons/right-arrow-head.png')}
          />
        </TouchableOpacity>

        {/*Refer a friend*/}

        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            width: '100%',
            height: 50,
            borderWidth: 1,
            borderRadius: 20,
            backgroundColor: '#ffe979',
            marginTop: 15,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => {
            Linking.openURL(
              `whatsapp://send?text=Check out this cool app I found!`,
            );
          }}>
          <Image
            style={{
              width: 35,
              height: 35,
              marginRight: 10,
              marginLeft: 15,
            }}
            source={require('../assets/images/icons/whatsapp-icon.png')}
          />

          <Text
            style={{
              color: 'black',
              fontFamily: 'Montserrat-Bold',
              fontSize: 18,
            }}>
            Refer a friend
          </Text>

          <Image
            style={{
              width: 45,
              height: 45,
              marginLeft: 83,
            }}
            source={require('../assets/images/icons/right-arrow-head.png')}
          />
        </TouchableOpacity>
      </View>

      {/* Account Settings 2 */}

      <View
        style={{
          width: '90%',
          height: 250,
          position: 'absolute',
          top: 350,
          alignSelf: 'center',
        }}>
        <Text
          style={{
            color: 'black',
            fontFamily: 'Montserrat-Bold',
            fontSize: 20,
            marginLeft: 5,
            marginBottom: 10,
          }}>
          Account Settings
        </Text>

        {/* Rate us */}

        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            width: '100%',
            height: 50,
            borderWidth: 1,
            borderRadius: 20,
            backgroundColor: '#ffe979',
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => bottomSheetRef2.current.open()}>
          <Image
            style={{
              width: 35,
              height: 35,
              marginRight: 12,
              marginLeft: 10,
            }}
            source={require('../assets/images/icons/black-star.png')}
          />

          <Text
            style={{
              color: 'black',
              fontFamily: 'Montserrat-Bold',
              fontSize: 18,
            }}>
            Rate us
          </Text>

          <Image
            style={{
              width: 45,
              height: 45,
              marginLeft: 146,
            }}
            source={require('../assets/images/icons/right-arrow-head.png')}
          />

          {/*Rate us Bottom Sheet */}

          <BottomSheet
            ref={bottomSheetRef2}
            customStyles={{
              container: {
                height: 260,
                borderTopStartRadius: 10,
                borderTopEndRadius: 10,
                borderTopColor: 'black',
                borderTopWidth: 1,
                borderStartColor: 'black',
                borderStartWidth: 1,
                borderEndColor: 'black',
                borderEndWidth: 1,
              },
            }}
            closeOnDragDown={true}>
            <View style={styles.bottomDrawer}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 22,
                  marginTop: 10,
                  fontFamily: 'Arimo-Medium',
                }}>
                Rate Us
              </Text>

              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => handlePress(1)}>
                  <Text style={{fontSize: 50, color: getStarColor(1)}}>★</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress(2)}>
                  <Text style={{fontSize: 50, color: getStarColor(2)}}>★</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress(3)}>
                  <Text style={{fontSize: 50, color: getStarColor(3)}}>★</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress(4)}>
                  <Text style={{fontSize: 50, color: getStarColor(4)}}>★</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress(5)}>
                  <Text style={{fontSize: 50, color: getStarColor(5)}}>★</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={{
                width: 130,
                height: 35,
                backgroundColor: Colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderRadius: 15,
                borderColor: '#797979',
                alignSelf: 'center',
                marginTop: 10,
                position: 'absolute',
                top: 143,
              }}
              activeOpacity={0.6}
              onPress={() => bottomSheetRef2.current.close()}>
              <Text style={{fontSize: 20, color: 'black'}}>Close</Text>
            </TouchableOpacity>

            <View
              style={{
                width: '100%',
                height: 70,
                position: 'absolute',
                top: 203,
              }}>
              <View
                style={{
                  width: '100%',
                  height: 56,
                  backgroundColor: Colors.primary,
                }}>
                {/* bottom navigation bar */}
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    width: '100%',
                    height: 55,
                  }}>
                  <TouchableOpacity
                    style={styles.navbar}
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('Homepage')}>
                    <Image
                      style={{
                        width: 48,
                        height: 55,
                        position: 'absolute',
                        top: -9,
                      }}
                      source={require('../assets/images/icons/homepage-icon.png')}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.navbar}
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('OrderHistory')}>
                    <Image
                      style={{
                        width: 35,
                        height: 35,
                        position: 'absolute',
                        top: 3,
                      }}
                      source={require('../assets/images/icons/order-history-icon.png')}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.navbar}
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('Favourites')}>
                    <Image
                      style={{
                        width: 23,
                        height: 30,
                        position: 'absolute',
                        top: 6,
                      }}
                      source={require('../assets/images/icons/favorites-icon.png')}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.navbar}
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('ReviewTimeline')}>
                    <Image
                      style={{
                        width: 62,
                        height: 55,
                        position: 'absolute',
                        top: -4,
                      }}
                      source={require('../assets/images/icons/timeline-icon.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.navbar}
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('DealsAndDiscount')}>
                    <Image
                      style={{
                        width: 34,
                        height: 44,
                        position: 'absolute',
                        top: 0,
                      }}
                      source={require('../assets/images/icons/discount-icon.png')}
                    />
                  </TouchableOpacity>
                </View>

                <Downbar></Downbar>
              </View>
            </View>
          </BottomSheet>
        </TouchableOpacity>

        {/*Delete Account */}

        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            width: '100%',
            height: 50,
            borderWidth: 1,
            borderRadius: 20,
            backgroundColor: '#ffe979',
            marginTop: 15,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => bottomSheetRef1.current.open()}>
          <Image
            style={{
              width: 30,
              height: 30,
              marginRight: 16,
              marginLeft: 10,
            }}
            source={require('../assets/images/icons/delete-icon.png')}
          />

          <Text
            style={{
              color: 'black',
              fontFamily: 'Montserrat-Bold',
              fontSize: 18,
            }}>
            Delete Account
          </Text>

          <Image
            style={{
              width: 45,
              height: 45,
              marginLeft: 70,
            }}
            source={require('../assets/images/icons/right-arrow-head.png')}
          />

          {/*delete Bottom Sheet */}

          <BottomSheet
            ref={bottomSheetRef1}
            customStyles={{
              container: {
                height: 170,
                borderTopStartRadius: 10,
                borderTopEndRadius: 10,
                borderTopColor: 'black',
                borderTopWidth: 1,
                borderStartColor: 'black',
                borderStartWidth: 1,
                borderEndColor: 'black',
                borderEndWidth: 1,
              },
            }}
            closeOnDragDown={true}>
            <View style={styles.bottomDrawer}>
              <TouchableOpacity
                style={{
                  width: 170,
                  height: 37,
                  backgroundColor: '#ff3131',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderRadius: 15,
                  borderColor: '#797979',
                  alignSelf: 'center',
                  marginTop: 10,
                }}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('Login')}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'white',
                    fontFamily: 'Arimo-Regular',
                  }}>
                  Delete Account
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: '100%',
                height: 70,
                position: 'absolute',
                top: 113,
              }}>
              <View
                style={{
                  width: '100%',
                  height: 56,
                  backgroundColor: Colors.primary,
                }}>
                {/* bottom navigation bar */}
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    width: '100%',
                    height: 55,
                  }}>
                  <TouchableOpacity
                    style={styles.navbar}
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('Homepage')}>
                    <Image
                      style={{
                        width: 48,
                        height: 55,
                        position: 'absolute',
                        top: -9,
                      }}
                      source={require('../assets/images/icons/homepage-icon.png')}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.navbar}
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('OrderHistory')}>
                    <Image
                      style={{
                        width: 35,
                        height: 35,
                        position: 'absolute',
                        top: 3,
                      }}
                      source={require('../assets/images/icons/order-history-icon.png')}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.navbar}
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('Favourites')}>
                    <Image
                      style={{
                        width: 23,
                        height: 30,
                        position: 'absolute',
                        top: 6,
                      }}
                      source={require('../assets/images/icons/favorites-icon.png')}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.navbar}
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('ReviewTimeline')}>
                    <Image
                      style={{
                        width: 62,
                        height: 55,
                        position: 'absolute',
                        top: -4,
                      }}
                      source={require('../assets/images/icons/timeline-icon.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.navbar}
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('DealsAndDiscount')}>
                    <Image
                      style={{
                        width: 34,
                        height: 44,
                        position: 'absolute',
                        top: 0,
                      }}
                      source={require('../assets/images/icons/discount-icon.png')}
                    />
                  </TouchableOpacity>
                </View>

                <Downbar></Downbar>
              </View>
            </View>
          </BottomSheet>
        </TouchableOpacity>

        {/*Logout*/}

        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            width: '100%',
            height: 50,
            borderWidth: 1,
            borderRadius: 20,
            backgroundColor: '#ffe979',
            marginTop: 15,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('Login')}>
          <Image
            style={{
              width: 40,
              height: 40,
              marginRight: 10,
              marginLeft: 10,
            }}
            source={require('../assets/images/icons/logout-icon.png')}
          />

          <Text
            style={{
              color: 'black',
              fontFamily: 'Montserrat-Bold',
              fontSize: 18,
            }}>
            Logout
          </Text>

          <Image
            style={{
              width: 45,
              height: 45,
              marginLeft: 140,
            }}
            source={require('../assets/images/icons/right-arrow-head.png')}
          />
        </TouchableOpacity>
      </View>

      {/*  Bottom navigation bar */}
      <View style={{width: '100%', height: 70, position: 'absolute', top: 666}}>
        <Navbar navigation={navigation}></Navbar>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottomDrawer: {
    width: '100%',
    height: 200,
    alignItems: 'center',
  },
  container: {
    width: '90%',
    height: 30,
    flexDirection: 'row',
    marginBottom: 5,
    marginLeft: 30,
  },
  bottomSheetText: {
    color: '#333333',
    fontSize: 18,
  },

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

{
  /*

import React, { useState } from 'react';
import { View, Text, TouchableOpacity , StyleSheet,Image} from 'react-native';


export default function Demo() {

  const [defaultRating, setDefaultRating] = useState(2);

  const [maxRating, setMaxRating]= useState([1,2,3,4,5])

  const starImgFilled=require('../assets/images/icons/star_filled.png')

  const starImgCorner=require('../assets/images/icons/star_corner.png')


  
  
  
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


*/
}
