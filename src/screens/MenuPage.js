import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {Colors} from '../../src/constants';
import Navbar from '../components/Navbar';
import {ScrollView} from 'react-native-gesture-handler';
import BottomSheet from 'react-native-raw-bottom-sheet';
import MenupageBottomsheet from '../components/MenupageBottomsheet';
import {log} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {STATUSES, getRestaurantMenu} from '../redux/reducers/menuSlice';
import {addFavoriteRestaurants} from '../redux/reducers/restaurantSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getReviewsByRestaurants} from '../redux/reducers/reviewSlice';
import {getDealsByRestaurant} from '../redux/reducers/dealSlice';

export default function MenuPage({navigation, route}) {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    item,
    cartItems: initialCartItems = [],
    cartLength: initialCartLength,
  } = route.params;
  const {
    Rating,
    distance,
    IsOpen,
    RestaurantsName,
    RestaurantsId,
    RestaurantLogo,
  } = item;

  const dispatch = useDispatch();
  const {status, restaurantsMenu} = useSelector(state => state.menu);
  const {favoriteRestaurants} = useSelector(state => state.restaurant);
  const {restaurantsReviews} = useSelector(state => state.review);
  const {restaurantsDeals} = useSelector(state => state.deals);
  const [totalReview, setTotalReview] = useState(restaurantsReviews.length);
  const [addCount, setAddCount] = useState(1);

  const isOpen = 'Open Now';

  const minus = () => {
    if (addCount > 1) {
      setAddCount(addCount - 1);
    }
  };

  //const bottomSheetRef = useRef(null);

  // bottomsheet component

  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  // Function to handle item selection to bottomsheet
  const handleItemPress = item => {
    setSelectedItem(item);
    setBottomSheetVisible(true);
  };

  {
    /* const openBottomSheet = () => {
  setBottomSheetVisible(true);
  };

  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
  };

*/
  }

  //cart logic

  const [cartItems, setCartItems] = useState(initialCartItems || []);
  const [cartLength, setCartLength] = useState(0 || initialCartLength);
  // get Restaurant menu

  useEffect(() => {
    getMenu();
    dispatch(getReviewsByRestaurants(RestaurantsId));
    dispatch(getDealsByRestaurant(RestaurantsId));
  }, [dispatch]);

  const getMenu = () => {
    dispatch(getRestaurantMenu(RestaurantsId));
  };

  const handleAddFavourite = () => {
    dispatch(addFavoriteRestaurants(item));
  };

  useEffect(() => {
    if (route.params?.cartItems) {
      setCartItems(route.params.cartItems);
    }

    if (route.params?.cartLength) {
      setCartLength(route.params.cartLength);
    }
  }, [route.params]);

  const addToCart = async (item, quantity, additionalRequirements) => {
    const existingCartItem = cartItems.find(
      cartItem => cartItem.item.RestaurantsMenuId === item.RestaurantsMenuId,
    );

    if (existingCartItem) {
      // If the item already exists in the cart, update the quantity
      const updatedCartItems = cartItems.map(cartItem => {
        if (cartItem.item.RestaurantsMenuId === item.RestaurantsMenuId) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + quantity,
          };
        }
        return cartItem;
      });
      const dataJson = JSON.stringify(updatedCartItems);
      await AsyncStorage.setItem(RestaurantsId, dataJson);
      setCartItems(updatedCartItems);
    } else {
      // If the item doesn't exist in the cart, add it as a new entry
      const cartItem = {
        item: item,
        quantity: quantity,
        additionalRequirements:
          additionalRequirements !== undefined ? additionalRequirements : '',
      };
      const uncodedCartItems = [...cartItems, cartItem];
      const dataJson = JSON.stringify(uncodedCartItems);
      await AsyncStorage.setItem(RestaurantsId, dataJson);
      setCartItems(uncodedCartItems);
    }
  };

  useEffect(() => {
    setCartLength(cartItems.length);
  }, [cartItems]);

  {
    /* star rating logic */
  }
  //const rating = 5;
  const stars = [];
  for (let i = 0; i < Math.round(Rating || 3); i++) {
    stars.push(
      <Image
        key={i}
        source={require('../assets/images/icons/star.png')}
        style={styles.reviewStar}
      />,
    );
  }

  {
    /* serving per person logic */
  }

  const Person = ({servingPerPerson}) => {
    const servingPerson = servingPerPerson;
    const persons = [];
    for (let i = 0; i < servingPerson; i++) {
      persons.push(
        <Image
          key={i}
          source={require('../assets/images/icons/person-icon.png')}
          style={{width: 21, height: 20}}
        />,
      );
    }

    return (
      <View
        style={{
          width: 125,
          height: 20,
          position: 'absolute',
          top: 50,
          right: -38,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        {persons}
      </View>
    );
  };

  const menu1 = [
    {
      index: 1,
      name: 'Lotus Three Milk Cake',
      size: 2,
      price: 1800,
      discountprice: 1599,
      orderCount: '12',
      imgsrc: require('../assets/images/food-images/cake1.jpg'),
      servingPerPerson: 6,
    },
    {
      index: 2,
      name: 'Milk Cake',
      size: 3,
      price: 1700,
      orderCount: 20,
      imgsrc: require('../assets/images/food-images/cake1.jpg'),
      servingPerPerson: 5,
    },
  ];
  const isFavorite = favoriteRestaurants.some(
    favItem => favItem.RestaurantsId === RestaurantsId,
  );
  const filteredMenu = restaurantsMenu.filter(item =>
    item.MenuName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#fffefe"
      />

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
          source={require('../assets/images/icons/back-arrow2.png')}
        />
      </TouchableOpacity>

      {/* search bar */}

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: Colors.primary,
          borderWidth: 1,
          borderColor: '#797979',
          width: 240,
          height: 40,
          borderRadius: 18,
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
          style={{width: 170, fontSize: 17, height: '100%', marginTop: 4}}
          placeholder="Search Food"
          placeholderTextColor={'black'}
          autoComplete="off"
          autoCorrect={false}
          autoCapitalize="none"
          value={searchQuery}
          onChangeText={data => setSearchQuery(data)}
        />
      </View>

      {/* bag icon */}
      <TouchableOpacity
        style={{position: 'absolute', top: 10, right: 5, width: 40, height: 40}}
        onPress={() =>
          navigation.navigate('Cart', {cartItems, cartLength, item})
        }>
        <Image
          style={{width: 40, height: 40}}
          source={require('../assets/images/icons/bag-icon.png')}
        />
        {/* cart count */}

        {cartLength >= 1 ? (
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 20,
              backgroundColor: '#fff',
              position: 'absolute',
              top: 20,
              right: 0,
              marginTop: 5,
              borderWidth: 1,
              borderColor: 'black',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'black', fontSize: 12}}>{cartLength}</Text>
          </View>
        ) : null}
      </TouchableOpacity>

      {/* Restaurant Detail section */}

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 120,
          position: 'absolute',
          top: 70,
        }}>
        <View style={{width: 110, height: 120, marginLeft: 12, marginRight: 8}}>
          <Image
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 20,
            }}
            resizeMode="contain"
            source={{
              uri: `data:image/png;base64,${RestaurantLogo}`,
            }}
          />
        </View>

        <View style={{width: 225, height: 120}}>
          <Text
            style={{
              fontSize: 24,
              color: 'black',
              fontFamily: 'Montserrat-Bold',
            }}>
            {RestaurantsName}
          </Text>

          <View style={{flexDirection: 'row', width: 220, height: 90}}>
            <View style={{width: 160, height: 90}}>
              <View
                style={{
                  flexDirection: 'row',
                  maxWidth: 160,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                {stars}
              </View>
              <Text style={{fontSize: 13, color: 'grey'}}>
                {distance} away | {totalReview > 30 ? '30+' : totalReview}{' '}
                Reviews
              </Text>
              <Text style={IsOpen === 1 ? styles.openText : styles.closedText}>
                {IsOpen === 1 ? 'Open Now' : 'Closed'}
              </Text>
            </View>
            <View
              style={{
                width: 60,
                height: 90,
                justifyContent: 'center',
                paddingLeft: 19,
              }}>
              <TouchableOpacity onPress={handleAddFavourite}>
                <Image
                  style={{
                    width: 40,
                    height: 40,
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
      </View>

      {/* top navigation bar */}

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 40,
          position: 'absolute',
          top: 210,
        }}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={{
            width: '33%',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 2.5,
          }}
          onPress={() =>
            navigation.navigate('PreBookingPage', {item, cartItems, cartLength})
          }>
          <Text style={styles.topnavbarText}>Pre-booking</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.topNavbar, {borderBottomColor: Colors.primary}]}
          activeOpacity={0.6}>
          <Text style={styles.topnavbarText}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.topNavbar}
          activeOpacity={0.6}
          onPress={() =>
            navigation.navigate('ReviewPage', {item, cartItems, cartLength})
          }>
          <Text style={styles.topnavbarText}>Review</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.topNavbar}
          activeOpacity={0.6}
          onPress={() =>
            navigation.navigate('About', {item, cartItems, cartLength})
          }>
          <Text style={styles.topnavbarText}>About</Text>
        </TouchableOpacity>
      </View>

      {/* Scroll items*/}

      <View
        style={{
          marginTop: 230,
          width: '100%',
          height: 400,
          position: 'absolute',
          top: 40,
        }}>
        <ScrollView style={{marginBottom: 5}}>
          {/* Discount and Deals*/}

          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: 'black',
              fontFamily: 'Montserrat-Bo0ld',
              marginBottom: 10,
              marginLeft: 15,
            }}>
            Discounts & Deals
          </Text>

          {restaurantsDeals?.map(item => (
            <View key={item.RestaurantDealId}>
              <TouchableOpacity
                key={item.RestaurantDealId}
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
                  backgroundColor: '#ffe979',
                  marginBottom: 10,
                }}
                onPress={() => handleItemPress(item)}>
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
                      uri: `data:image/png;base64,${item.DealIcon}`,
                    }}
                  />
                </View>

                <View style={{width: 200, height: 60, marginTop: -8}}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Bold',
                      color: 'black',
                      fontSize: 15,
                      marginBottom: 5,
                    }}>
                    {item.RestaurantDealName}
                  </Text>
                  <Text style={{fontSize: 14, marginBottom: 5, color: 'grey'}}>
                    {item.size} Pounds
                  </Text>
                  <View
                    style={{
                      width: 120,
                      height: 20,
                      marginTop: -5,
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{color: 'black', marginRight: 10, fontSize: 13}}>
                      Rs. {item.Price}
                    </Text>
                    <Text
                      style={{
                        textDecorationLine: 'line-through',
                        fontSize: 13,
                        color: 'grey',
                      }}>
                      Rs. {item.Price + (item.Price * 15) / 100}
                    </Text>
                  </View>

                  <Person servingPerPerson={item.NoPersons} />
                </View>
                {/* order count 

                <View style={{ width: 35, height: 35, borderRadius: 20, backgroundColor: 'black', position: 'absolute', top: -14, right: -6, marginTop: 5, borderWidth: 1, borderColor: '#797979', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: 'white', fontSize: 15 }}>1</Text>
                </View>

                */}
              </TouchableOpacity>
            </View>
          ))}

          {/* food item*/}

          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: 'black',
              fontFamily: 'Montserrat-Bo0ld',
              marginBottom: 10,
              marginLeft: 15,
            }}>
            Dishes
          </Text>

          {status === STATUSES.LOADING ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" />
            </View>
          ) : searchQuery === '' ? (
            restaurantsMenu?.map(item => (
              <TouchableOpacity
                key={item.RestaurantsMenuId}
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
                  backgroundColor: '#ffe979',
                  marginBottom: 10,
                }}
                onPress={() => handleItemPress(item)}>
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
                    source={{uri: `data:image/png;base64,${item.MenuImage}`}}
                  />
                </View>

                <View style={{width: 200, height: 60, marginTop: -8}}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Bold',
                      color: 'black',
                      fontSize: 15,
                      marginBottom: 5,
                    }}>
                    {item.MenuName}
                  </Text>
                  <Text style={{fontSize: 14, marginBottom: 5}}>
                    {item.MenuQty} Pounds
                  </Text>
                  <View
                    style={{
                      width: 120,
                      height: 20,
                      marginTop: -5,
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{color: 'black', marginRight: 10, fontSize: 13}}>
                      Rs. {item.Price}
                    </Text>
                  </View>

                  <Person servingPerPerson={item.ServingPerson} />
                </View>
              </TouchableOpacity>
            ))
          ) : (
            filteredMenu.map(item => (
              <TouchableOpacity
                key={item.RestaurantsMenuId}
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
                  backgroundColor: '#ffe979',
                  marginBottom: 10,
                }}
                onPress={() => handleItemPress(item)}>
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
                    source={{uri: `data:image/png;base64,${item.MenuImage}`}}
                  />
                </View>

                <View style={{width: 200, height: 60, marginTop: -8}}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Bold',
                      color: 'black',
                      fontSize: 15,
                      marginBottom: 5,
                    }}>
                    {item.MenuName}
                  </Text>
                  <Text style={{fontSize: 14, marginBottom: 5}}>
                    {item.MenuQty} Pounds
                  </Text>
                  <View
                    style={{
                      width: 120,
                      height: 20,
                      marginTop: -5,
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{color: 'black', marginRight: 10, fontSize: 13}}>
                      Rs. {item.Price}
                    </Text>
                  </View>

                  <Person servingPerPerson={item.ServingPerson} />
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>

      {/* Menupage Bottom Sheet */}

      <MenupageBottomsheet
        isVisible={isBottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        selectedItem={selectedItem}
        onAddToCart={addToCart}
        navigation={navigation}
      />

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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    position: 'relative',
    backgroundColor: '#fff',
  },

  openText: {
    color: 'green',
    fontSize: 17,
  },
  closedText: {
    color: 'red',
    fontSize: 17,
  },

  topNavbar: {
    width: '23%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2.5,
  },

  topnavbarText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: 'black',
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

  reviewStar: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  bottomDrawer: {
    width: '100%',
    height: 200,
  },

  button: {
    width: 120,
    height: 40,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#797979',
    alignSelf: 'center',
    marginTop: 30,
  },
});

{
  /* 

      <BottomSheet ref={bottomSheetRef} customStyles={{
        container: {
          height: 450, borderTopStartRadius: 10, borderTopEndRadius: 10, borderTopColor: 'black', borderTopWidth: 1, borderStartColor: 'black', borderStartWidth: 1, borderEndColor: 'black', borderEndWidth: 1,
        },
      }}
        closeOnDragDown={true}>
        <View style={styles.bottomDrawer}>

          <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: '#797979', width: 340, height: 85, borderRadius: 18, marginLeft: 'auto', marginRight: 'auto', alignItems: 'center', backgroundColor: '#ffe979', marginBottom: 10 }}>

            <View style={{ width: 80, height: 75, marginLeft: 9, marginRight: 9 }}>

              <Image
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 20

                }}

                resizeMode="contain"
                source={require('../assets/images/restaurant-images/hobnob.png')}
              />


            </View>

            <View style={{ width: 200, height: 60, marginTop: -8 }}>
              <Text style={{ fontFamily: 'Montserrat-Bold', color: "black", fontSize: 15, marginBottom: 5 }}>Lotus Three Milk Cak</Text>
              <Text style={{ fontSize: 14, marginBottom: 5 }}>2 Pounds</Text>
              <View style={{ width: 120, height: 20, marginTop: -5, flexDirection: 'row' }}>
                <Text style={{ color: 'black', marginRight: 10, fontSize: 13 }}>Rs. 1599</Text>
                <Text style={{ textDecorationLine: 'line-through', fontSize: 13 }}>Rs. 1800</Text>
              </View>
              <View style={{ width: 90, height: 20, position: 'absolute', top: 40, right: -45, flexDirection: 'row', }}>
                <TouchableOpacity activeOpacity={0.7} style={{ borderWidth: 1, borderColor: "black", borderRadius: 20, width: 22, height: 22, justifyContent: 'center', alignItems: 'center', backgroundColor: '#d2d2d0', marginRight: 5, marginTop: 5 }}
                  onPress={minus}>
                  <Image
                    style={{
                      width: 15,
                      height: 15,
                      borderRadius: 20,
                    }}

                    resizeMode="contain"
                    source={require('../assets/images/icons/minus.png')}
                  />

                </TouchableOpacity>
                <View style={{ width: 20, height: 30, marginBottom: 20, }}>
                  <Text style={{ color: 'black', fontSize: 24, alignSelf: 'center', }}>{addCount}</Text>
                </View>


                <TouchableOpacity activeOpacity={0.7} style={{ borderWidth: 1, borderColor: "black", borderRadius: 20, width: 22, height: 22, justifyContent: 'center', alignItems: 'center', marginLeft: 5, marginTop: 5 }}
                  onPress={() => {
                    setAddCount(addCount + 1)
                  }}>
                  <Image
                    style={{
                      width: 15,
                      height: 15,
                      borderRadius: 20,
                    }}

                    resizeMode="contain"
                    source={require('../assets/images/icons/plus.png')}
                  />

                </TouchableOpacity>
              </View>

            </View>
          </View>

          <Text style={{ color: 'black', fontFamily: 'Montserrat-Bold', fontSize: 18, marginLeft: 15 }}>Special instructions</Text>

          <Text style={{ fontSize: 13, marginLeft: 15, marginRight: 15, marginTop: 10 }}>Please let us know if you want any addition in your order  or want to remove anything</Text>

          <View style={{ borderWidth: 1, borderColor: '#797979', width: 340, height: 85, borderRadius: 18, marginLeft: 'auto', marginRight: 'auto', marginTop: 10, justifyContent: 'center' }}>

            <TextInput style={{ width: '95%', height: 80, borderRadius: 18, textAlignVertical: 'top', marginLeft: 'auto', marginRight: 'auto' }}
              placeholder="e.g. No lettuce"
              multiline={true}
              onChangeText={(data) => setText(data)}
              value={text} />

          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={{ fontSize: 20, color: 'black' }}>Add to Cart</Text>
          </TouchableOpacity>

        </View>

         // Bottom sheet nav bar

        <View style={{ width: "100%", height: 70, position: 'absolute', top: 393, }}>
          <Navbar></Navbar>
        </View>

      </BottomSheet>
*/
}
