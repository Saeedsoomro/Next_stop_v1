import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../constants';
import Downbar from '../components/Downbar';
import homepageData from '../constants/data';
import {useDispatch, useSelector} from 'react-redux';
import {STATUSES, getAllDeals} from '../redux/reducers/dealSlice';
import {getRestaurantById} from '../redux/reducers/restaurantSlice';

export default function DealsAndDiscount({navigation}) {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const {status, deals} = useSelector(state => state.deals);
  const filteredMenu = deals?.filter(item =>
    item.RestaurantDealName.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  useEffect(() => {
    getAllDealsHandler();
  }, [dispatch]);

  const goToMenuPage = restaurantId => {
    dispatch(getRestaurantById(restaurantId))
      .unwrap()
      .then(item => {
        navigation.navigate('MenuPage', {item});
      })
      .catch(error => {
        console.log(error);
      });
  };
  const getAllDealsHandler = () => {
    dispatch(getAllDeals());
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
          Deals & Discount
        </Text>
        <ScrollView style={{marginBottom: 5}}>
          {status === STATUSES.LOADING ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" />
            </View>
          ) : searchQuery === '' ? (
            deals?.map(item => (
              <View key={item.RestaurantDealId}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Bold',
                    color: 'black',
                    fontSize: 18,
                    marginBottom: 5,
                    marginLeft: 18,
                  }}>
                  {item.RestaurantDealName}
                </Text>
                <TouchableOpacity
                  key={item.RestaurantDealId}
                  onPress={() => goToMenuPage(item.RestaurantId)}
                  activeOpacity={0.7}
                  style={{
                    width: 340,
                    height: 160,
                    borderRadius: 18,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    alignItems: 'center',
                    backgroundColor: Colors.primary,
                    marginBottom: 15,
                  }}>
                  <Image
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 20,
                    }}
                    resizeMode="contain"
                    source={{
                      uri: `data:image/png;base64,${item.DealIcon}`,
                    }}
                  />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            filteredMenu.map(item => (
              <View key={item.RestaurantDealId}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Bold',
                    color: 'black',
                    fontSize: 18,
                    marginBottom: 5,
                    marginLeft: 18,
                  }}>
                  {item.RestaurantDealName}
                </Text>
                <TouchableOpacity
                  key={item.RestaurantDealId}
                  onPress={() => goToMenuPage(item.RestaurantId)}
                  activeOpacity={0.7}
                  style={{
                    width: 340,
                    height: 160,
                    borderRadius: 18,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    alignItems: 'center',
                    backgroundColor: Colors.primary,
                    marginBottom: 15,
                  }}>
                  <Image
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 20,
                    }}
                    resizeMode="contain"
                    source={{
                      uri: `data:image/png;base64,${item.DealIcon}`,
                    }}
                  />
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>
      </View>

      {/*  Bottom navigation bar */}
      <View
        style={{
          width: '100%',
          height: 59,
          position: 'absolute',
          top: 662,
          backgroundColor: Colors.primary,
        }}>
        {/* bottom navigation bar */}
        <View
          style={{flex: 1, flexDirection: 'row', width: '100%', height: 36}}>
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
            style={{
              position: 'relative',
              width: '20%',
              height: 45,
              alignItems: 'center',
            }}
            activeOpacity={0.6}>
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

  navbarImage: {
    width: 50,
    height: 60,
    position: 'absolute',
    top: -9,
  },
});
