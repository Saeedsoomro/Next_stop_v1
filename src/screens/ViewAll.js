import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  Touchable,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../constants';
import Navbar from '../components/Navbar';
import {useDispatch, useSelector} from 'react-redux';
import {
  STATUSES,
  addFavoriteRestaurants,
} from '../redux/reducers/restaurantSlice';

export default function ViewAll({navigation, route}) {
  const {searchItem, data} = route.params;
  const [searchQuery, setSearchQuery] = useState(searchItem || '');
  const {status, favoriteRestaurants} = useSelector(state => state.restaurant);
  const dispatch = useDispatch();
  const filteredMenu = data.filter(item =>
    item.RestaurantsName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleAddFavourite = item => {
    dispatch(addFavoriteRestaurants(item));
  };

  const renderItem = ({item}) => {
    const isFavorite = favoriteRestaurants.some(
      favItem => favItem.RestaurantsId === item.RestaurantsId,
    );

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('PreBookingPage', {item})}
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
        }}>
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
          <Text style={{fontSize: 14, marginBottom: 5}}>{item.type1}</Text>
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
            <View>
              {/* Your image and other restaurant details here */}
              <TouchableOpacity onPress={() => handleAddFavourite(item)}>
                <Image
                  style={{
                    width: 27,
                    height: 27,
                  }}
                  source={
                    isFavorite
                      ? require('../assets/images/icons/heart.png')
                      : require('../assets/images/icons/whiteHeart.png')
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
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
            style={{width: 170, fontSize: 18, color: 'black'}}
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
          Your restaurants
        </Text>
        <View style={{marginBottom: 5}}>
          {status === STATUSES.LOADING ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" />
            </View>
          ) : searchQuery === '' ? (
            <View>
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.RestaurantsId.toString()}
              />
            </View>
          ) : (
            <View>
              <FlatList
                data={filteredMenu}
                renderItem={renderItem}
                keyExtractor={item => item.RestaurantsId.toString()}
              />
            </View>
          )}
        </View>
      </View>

      {/*  Bottom navigation bar */}
      <View style={{width: '100%', height: 70, position: 'absolute', top: 666}}>
        <Navbar navigation={navigation}></Navbar>
      </View>
    </View>
  );
}
