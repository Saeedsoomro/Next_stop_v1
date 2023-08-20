import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
import {Colors} from '../constants';
import Downbar from '../components/Downbar';
import homepageData from '../constants/data';
import {useDispatch, useSelector} from 'react-redux';
import {addFavoriteRestaurants} from '../redux/reducers/restaurantSlice';

export default function Favourites({navigation}) {
  const [searchQuery, setSearchQuery] = useState('');
  const {favoriteRestaurants} = useSelector(state => state.restaurant);
  const dispatch = useDispatch();
  const filteredMenu = favoriteRestaurants.filter(item =>
    item.RestaurantsName.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const handleAddFavourite = item => {
    dispatch(addFavoriteRestaurants(item));
  };

  return (
    <View style={{backgroundColor: '#fff'}}>
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
          onPress={() => navigation.navigate('Homepage')}>
          <Image
            style={{width: 35, height: 25}}
            source={require('../assets/images/icons/back-arrow2.png')}></Image>
        </TouchableOpacity>

        {/* search bar */}

        <View
          style={{
            flexDirection: 'row',
            backgroundColor: Colors.primary,
            borderWidth: 1,
            borderColor: '#797979',
            width: 260,
            height: 43,
            borderRadius: 20,
            position: 'absolute',
            left: 66,
            top: 13,
          }}>
          <Image
            style={{
              width: 45,
              height: 30,
              marginTop: 8,
              alignSelf: 'center',
            }}
            source={require('../assets/images/icons/search-icon.png')}
          />

          <TextInput
            style={{width: 170, fontSize: 18}}
            placeholder="Search restaurants"
            placeholderTextColor={'black'}
            autoComplete="off"
            autoCorrect={false}
            autoCapitalize="none"
            value={searchQuery}
            onChangeText={data => setSearchQuery(data)}></TextInput>
        </View>
      </View>

      {/* Restaurant List*/}

      <View style={{marginTop: 70, width: '100%', height: 600}}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: 'black',
            alignSelf: 'center',
            fontFamily: 'Montserrat-Bold',
            marginBottom: 5,
          }}>
          Your Favourites
        </Text>
        {favoriteRestaurants.length === 0 && (
          <View
            style={{
              position: 'absolute',
              top: 160,
              width: '90%',
              height: 400,
              marginLeft: 18,
              alignItems: 'center',
            }}>
            <Image
              style={{
                width: 150,
                height: 150,
              }}
              resizeMode="contain"
              source={require('../assets/images/icons/order-icon.png')}
            />

            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                fontSize: 20,
                color: 'black',
                marginTop: 10,
              }}>
              No Favorite Restaurant
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Homepage')}>
              <Text style={{fontSize: 20, color: 'black'}}>Go Back</Text>
            </TouchableOpacity>
          </View>
        )}

        <ScrollView style={{marginBottom: 5}}>
          {searchQuery === ''
            ? favoriteRestaurants.map(item => (
                <TouchableOpacity
                  key={item.RestaurantsId}
                  activeOpacity={0.7}
                  style={{
                    flexDirection: 'row',
                    borderWidth: 1,
                    borderColor: '#797979',
                    width: 340,
                    height: 85,
                    borderRadius: 18,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    alignItems: 'center',
                    backgroundColor: Colors.primary,
                    marginBottom: 15,
                  }}
                  onPress={() => navigation.navigate('PreBookingPage', {item})}>
                  <View
                    style={{
                      width: 80,
                      height: 75,
                      marginLeft: 9,
                      marginRight: 9,
                    }}>
                    <Image
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 20,
                      }}
                      resizeMode="contain"
                      source={{
                        uri: `data:image/png;base64,${item.RestaurantLogo}`,
                      }}
                    />
                  </View>

                  <View style={{width: 170, height: 60, marginTop: -8}}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Bold',
                        color: 'black',
                        fontSize: 15,
                        marginBottom: 5,
                      }}>
                      {item.RestaurantsName}
                    </Text>
                    <Text style={{fontSize: 14, marginBottom: 5}}>
                      {item.type1}
                    </Text>
                    <View
                      style={{
                        width: 120,
                        height: 20,
                        marginTop: -5,
                        flexDirection: 'row',
                      }}>
                      <Text style={{color: 'black', fontSize: 13}}>
                        {Math.round(item.Rating)}
                      </Text>
                      <Image
                        style={{
                          width: 13,
                          height: 13,
                          marginTop: 2,
                        }}
                        source={require('../assets/images/icons/black-star.png')}
                      />
                    </View>
                    <View
                      style={{
                        width: 90,
                        height: 20,
                        position: 'absolute',
                        top: 20,
                        left: 190,
                      }}>
                      <TouchableOpacity
                        onPress={() => handleAddFavourite(item)}>
                        <Image
                          style={{
                            width: 27,
                            height: 27,
                          }}
                          source={require('../assets/images/icons/heart.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            : filteredMenu.map(item => (
                <TouchableOpacity
                  key={item.RestaurantsId}
                  activeOpacity={0.7}
                  style={{
                    flexDirection: 'row',
                    borderWidth: 1,
                    borderColor: '#797979',
                    width: 340,
                    height: 85,
                    borderRadius: 18,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    alignItems: 'center',
                    backgroundColor: Colors.primary,
                    marginBottom: 15,
                  }}
                  onPress={() => navigation.navigate('PreBookingPage', {item})}>
                  <View
                    style={{
                      width: 80,
                      height: 75,
                      marginLeft: 9,
                      marginRight: 9,
                    }}>
                    <Image
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 20,
                      }}
                      resizeMode="contain"
                      source={{
                        uri: `data:image/png;base64,${item.RestaurantLogo}`,
                      }}
                    />
                  </View>

                  <View style={{width: 170, height: 60, marginTop: -8}}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Bold',
                        color: 'black',
                        fontSize: 15,
                        marginBottom: 5,
                      }}>
                      {item.RestaurantsName}
                    </Text>
                    <Text style={{fontSize: 14, marginBottom: 5}}>
                      {item.type1}
                    </Text>
                    <View
                      style={{
                        width: 120,
                        height: 20,
                        marginTop: -5,
                        flexDirection: 'row',
                      }}>
                      <Text style={{color: 'black', fontSize: 13}}>
                        {Math.round(item.Rating)}
                      </Text>
                      <Image
                        style={{
                          width: 13,
                          height: 13,
                          marginTop: 2,
                        }}
                        source={require('../assets/images/icons/black-star.png')}
                      />
                    </View>
                    <View
                      style={{
                        width: 90,
                        height: 20,
                        position: 'absolute',
                        top: 20,
                        left: 190,
                      }}>
                      <TouchableOpacity
                        onPress={() => handleAddFavourite(item)}>
                        <Image
                          style={{
                            width: 27,
                            height: 27,
                          }}
                          source={require('../assets/images/icons/heart.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
        </ScrollView>
      </View>

      {/*  Bottom navigation bar */}
      <View
        style={{
          width: '100%',
          height: 56,
          backgroundColor: Colors.primary,
          position: 'absolute',
          top: 665,
        }}>
        <View
          style={{flex: 1, flexDirection: 'row', width: '100%', height: 55}}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.navbar}
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
            style={{
              position: 'relative',
              width: '20%',
              height: 45,
              alignItems: 'center',
            }}
            activeOpacity={0.6}>
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
    marginTop: 70,
  },
  navbarImage: {
    width: 50,
    height: 60,
    position: 'absolute',
    top: -9,
  },
});
