import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {Svg, Rect, Mask} from 'react-native-svg';
import {Colors} from '../../src/constants';
import Navbar from '../components/Navbar';
import {ScrollView} from 'react-native-gesture-handler';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import {
  STATUSES,
  getReviewsByRestaurants,
  giveReviewRating,
} from '../redux/reducers/reviewSlice';
import Toast from 'react-native-toast-message';
import {addFavoriteRestaurants} from '../redux/reducers/restaurantSlice';
import {useEffect} from 'react';
export default function ReviewPage({navigation, route}) {
  const {item} = route.params;
  const {
    Rating,
    distance,
    IsOpen,
    RestaurantsName,
    RestaurantsId,
    RestaurantLogo,
  } = item;
  const {cartItems = [], cartLength} = route.params;
  const {status, restaurantsReviews} = useSelector(state => state.review);
  const {userState} = useSelector(state => state.auth);
  const {favoriteRestaurants} = useSelector(state => state.restaurant);
  const [totalReview, setTotalReview] = useState(restaurantsReviews.length);
  const {CustomerId} = userState;

  const dispatch = useDispatch();

  const handleSearch = () => {
    // Perform search logic here and update the searchedItem state
    navigation.navigate('MenuPage', {item, cartItems, cartLength});
  };

  // const rating = 5;
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

  //rating or give rating

  const [showRatingBox, setShowRatingBox] = useState(false);
  const [isRating, setIsRating] = useState(true);

  const toggleRatingBox = () => {
    setShowRatingBox(!showRatingBox);
    setIsRating(!isRating);
  };

  //select image

  const [selectedImage, setSelectedImage] = useState(null);

  const selectImage = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      multiple: false,
    })
      .then(response => {
        const source = {uri: response.path};
        setSelectedImage(source);
      })
      .catch(error => {
        console.log('ImagePicker Error: ', error);
      });
  };

  const [rating1, setRating1] = useState(0);
  const [userComment, setUserComment] = useState('');

  const handlePress = value => {
    if (value === rating1) {
      setRating1(0);
    } else {
      setRating1(value);
    }
  };

  const getStarColor = index => {
    if (index <= rating1) {
      return 'gold';
    }
    return 'gray';
  };

  // fetch restaurant Reviews
  useEffect(() => {
    dispatch(getReviewsByRestaurants(RestaurantsId));
  }, [RestaurantsId]);

  function getRatingByvalue(rating) {
    const newReviews = restaurantsReviews.filter(
      item => item.Rating === rating,
    );
    return newReviews.length;
  }
  const data = {
    1: getRatingByvalue(1),
    2: getRatingByvalue(2),
    3: getRatingByvalue(3),
    4: getRatingByvalue(4),
    5: getRatingByvalue(5),
  };

  const xScale = 20; // each unit on the x-axis represents 20 reviews
  const maxXValue = Math.max(...Object.values(data));

  const chartWidth = 140;
  const chartHeight = 150;
  const barHeight = 11;
  const barSpacing = 10;

  // handle give rating
  const handleAddRating = () => {
    if (rating1 == 0) {
      Alert.alert('Plz select rating');
    } else if (userComment == '') {
      Alert.alert('Plz give commit');
    } else {
      const reviewData = {
        restaurantId: RestaurantsId,
        customerId: CustomerId,
        rating: rating1,
        reviews: userComment,
      };
      dispatch(giveReviewRating(reviewData))
        .unwrap()
        .then(data => {
          Toast.show({
            type: 'success',
            text1: 'success',
            text2: 'Thanks for your review',
          });
          setRating1('');
          setUserComment('');
          toggleRatingBox();
        })
        .catch(error => {
          Toast.show({
            type: 'error',
            text1: 'error',
            text2: error,
          });
        });
    }
  };
  const isFavorite = favoriteRestaurants.some(
    favItem => favItem.RestaurantsId === RestaurantsId,
  );
  const handleAddFavourite = () => {
    dispatch(addFavoriteRestaurants(item));
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.scrollContentContainer,
        {paddingBottom: 120, backgroundColor: '#fff'},
      ]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.mainContainer}>
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
            left: -170,
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
            flex: 1,
            flexDirection: 'row',
            backgroundColor: Colors.primary,
            borderWidth: 1,
            borderColor: '#797979',
            width: 240,
            height: 40,
            borderRadius: 18,
            position: 'absolute',
            left: -110,
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

          <TouchableWithoutFeedback onPress={handleSearch}>
            <Text style={{color: 'black', fontSize: 18, marginTop: 5}}>
              Search food
            </Text>
          </TouchableWithoutFeedback>
        </View>

        {/* bag icon */}
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 10,
            right: -180,
            width: 40,
            height: 40,
          }}
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
          <View
            style={{width: 110, height: 120, marginLeft: 12, marginRight: 8}}>
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
                <Text
                  style={IsOpen === 1 ? styles.openText : styles.closedText}>
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
              navigation.navigate('PreBookingPage', {
                item,
                cartItems,
                cartLength,
              })
            }>
            <Text style={styles.topnavbarText}>Pre-booking</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.topNavbar}
            activeOpacity={0.6}
            onPress={() =>
              navigation.navigate('MenuPage', {item, cartItems, cartLength})
            }>
            <Text style={styles.topnavbarText}>Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.topNavbar, {borderBottomColor: Colors.primary}]}
            activeOpacity={0.6}>
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

        {/* review numbers */}

        <View
          style={{
            width: '96%',
            height: 130,
            position: 'absolute',
            top: 260,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 110,
              height: 110,
              borderRadius: 60,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Colors.primary,
              marginLeft: 3,
            }}>
            <Text
              style={{
                fontSize: 47,
                color: 'black',
                fontFamily: 'Arimo-Bold',
                height: 58,
              }}>
              {totalReview}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: 'black',
                height: 20,
                marginBottom: 10,
              }}>
              Reviews
            </Text>
          </View>

          {/* review bars */}

          <View
            style={{
              width: 28,
              height: 110,
              flexDirection: 'column',
              marginLeft: 15,
            }}>
            <View
              style={{
                width: '100%',
                height: 20,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{color: 'black', fontSize: 17}}>1</Text>
              <Image
                style={{
                  width: 15,
                  height: 15,
                  marginTop: 2,
                }}
                source={require('../assets/images/icons/star.png')}
              />
            </View>

            <View
              style={{
                width: '100%',
                height: 20,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{color: 'black', fontSize: 17}}>2</Text>
              <Image
                style={{
                  width: 15,
                  height: 15,
                  marginTop: 2,
                }}
                source={require('../assets/images/icons/star.png')}
              />
            </View>

            <View
              style={{
                width: '100%',
                height: 20,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{color: 'black', fontSize: 17}}>3</Text>
              <Image
                style={{
                  width: 15,
                  height: 15,
                  marginTop: 2,
                }}
                source={require('../assets/images/icons/star.png')}
              />
            </View>

            <View
              style={{
                width: '100%',
                height: 20,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{color: 'black', fontSize: 17}}>4</Text>
              <Image
                style={{
                  width: 15,
                  height: 15,
                  marginTop: 2,
                }}
                source={require('../assets/images/icons/star.png')}
              />
            </View>

            <View
              style={{
                width: '100%',
                height: 20,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{color: 'black', fontSize: 17}}>5</Text>
              <Image
                style={{
                  width: 15,
                  height: 15,
                  marginTop: 2,
                }}
                source={require('../assets/images/icons/star.png')}
              />
            </View>
          </View>

          {/* bars for review */}

          <View style={{width: 140, height: 100}}>
            <Svg width={chartWidth} height={chartHeight}>
              {Object.keys(data).map((rating, index) => {
                const x = 0;
                const y = index * (barHeight + barSpacing);
                const width = (data[rating] * chartWidth) / maxXValue;
                return (
                  <React.Fragment key={rating}>
                    <Rect
                      x={0}
                      y={y}
                      width={chartWidth}
                      height={barHeight}
                      fill="#fff3b3"
                      rx={10} // horizontal border radius
                      ry={10} // vertical border radius
                    />
                    <Mask id={`mask-${rating}`}>
                      <Rect
                        x={x}
                        y={y}
                        width={width}
                        height={barHeight}
                        fill="white"
                        rx={10}
                        ry={10}
                      />
                    </Mask>
                    <Rect
                      x={x}
                      y={y}
                      width={width}
                      height={barHeight}
                      fill="#ffe142"
                      mask={`url(#mask-${rating})`}
                      rx={10}
                      ry={10}
                    />
                  </React.Fragment>
                );
              })}
            </Svg>
          </View>

          {/* each number of review */}

          <View style={{width: 46, height: 110, flexDirection: 'column'}}>
            <View
              style={{
                width: '100%',
                height: 21,
                flexDirection: 'row',
                marginLeft: 5,
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 11}}>{data['1']}</Text>
              <Text style={{fontSize: 11}}> Reviews</Text>
            </View>

            <View
              style={{
                width: '100%',
                height: 21,
                flexDirection: 'row',
                marginLeft: 5,
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 11}}>{data['2']}</Text>
              <Text style={{fontSize: 11}}> Reviews</Text>
            </View>

            <View
              style={{
                width: '100%',
                height: 21,
                flexDirection: 'row',
                marginLeft: 5,
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 11}}>{data['3']}</Text>
              <Text style={{fontSize: 11}}> Reviews</Text>
            </View>

            <View
              style={{
                width: '100%',
                height: 21,
                flexDirection: 'row',
                marginLeft: 5,
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 11}}>{data['4']}</Text>
              <Text style={{fontSize: 11}}> Reviews</Text>
            </View>

            <View
              style={{
                width: '100%',
                height: 21,
                flexDirection: 'row',
                marginLeft: 5,
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 11}}>{data['5']}</Text>
              <Text style={{fontSize: 11}}> Reviews</Text>
            </View>
          </View>
        </View>

        {/* rating and give rating section*/}

        <View
          style={{width: '85%', height: 150, position: 'absolute', top: 410}}>
          <View style={{width: '100%', flexDirection: 'row'}}>
            <View style={{width: '10%', borderBottomWidth: 3}}></View>
            <TouchableOpacity
              style={isRating ? styles.rating : styles.ratingDeactive}
              activeOpacity={0.6}
              onPress={toggleRatingBox}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  fontFamily: 'Arimo-Regular',
                }}>
                Ratings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={isRating ? styles.giveRatingDeactive : styles.giveRating}
              activeOpacity={0.6}
              onPress={toggleRatingBox}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  fontFamily: 'Arimo-Regular',
                }}>
                Give Ratings
              </Text>
            </TouchableOpacity>
            <View style={{width: '10%', borderBottomWidth: 3}}></View>
          </View>

          {showRatingBox ? (
            <View
              style={{
                width: '100%',
                height: 200,
                borderWidth: 3,
                borderTopWidth: 0,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  fontFamily: 'Arimo-Medium',
                }}>
                Rate Us
              </Text>

              <View
                style={{width: 135, height: 35, position: 'absolute', top: 10}}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity onPress={() => handlePress(1)}>
                    <Text style={{fontSize: 30, color: getStarColor(1)}}>
                      ★
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handlePress(2)}>
                    <Text style={{fontSize: 30, color: getStarColor(2)}}>
                      ★
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handlePress(3)}>
                    <Text style={{fontSize: 30, color: getStarColor(3)}}>
                      ★
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handlePress(4)}>
                    <Text style={{fontSize: 30, color: getStarColor(4)}}>
                      ★
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handlePress(5)}>
                    <Text style={{fontSize: 30, color: getStarColor(5)}}>
                      ★
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  fontFamily: 'Arimo-Medium',
                  position: 'absolute',
                  top: 50,
                }}>
                Comments
              </Text>
              <View
                style={{
                  width: 200,
                  height: 50,
                  position: 'absolute',
                  top: 70,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#f2f2f2',
                }}>
                <TextInput
                  style={{
                    width: 190,
                    height: 55,
                    fontSize: 12,
                    marginBottom: 3,
                  }}
                  multiline={true}
                  textAlignVertical="top"
                  autoComplete="off"
                  autoCorrect={false}
                  autoCapitalize="none"
                  value={userComment}
                  onChangeText={data => setUserComment(data)}></TextInput>
              </View>

              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  fontFamily: 'Arimo-Medium',
                  position: 'absolute',
                  top: 120,
                }}>
                Image(s)
              </Text>

              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  position: 'absolute',
                  top: 140,
                  width: 70,
                  height: 20,
                  backgroundColor: '#f2f2f2',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={selectImage}>
                <Text style={{fontSize: 11}}>Select File</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={x => {
                  handleAddRating();
                }}
                style={{
                  position: 'absolute',
                  top: 167,
                  width: 80,
                  height: 25,
                  backgroundColor: Colors.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderRadius: 15,
                }}>
                <Text style={{fontSize: 15}}>
                  {status === STATUSES.LOADING ? (
                    <ActivityIndicator color="black" size="small" />
                  ) : (
                    'Post'
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                width: '100%',
                height: 200,
                borderWidth: 3,
                borderTopWidth: 0,
                alignItems: 'center',
              }}>
              <ScrollView
                style={{marginBottom: 5, marginTop: 15}}
                showsVerticalScrollIndicator={false}>
                {status === STATUSES.LOADING ? (
                  <ActivityIndicator size="large" />
                ) : (
                  restaurantsReviews?.map(item => (
                    <View
                      key={item.RestaurantReviewsId}
                      style={{
                        width: 270,
                        height: 'auto',
                        alignItems: 'center',
                        borderBottomWidth: 1.5,
                        borderBottomColor: '#797a79',
                        paddingBottom: 5,
                      }}>
                      <View
                        style={{
                          width: 260,
                          height: 'auto',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Arimo-Bold',
                            fontSize: 14,
                            color: 'black',
                          }}>
                          {item.CustomerName}
                        </Text>
                        <Text style={{fontSize: 12}}> ago</Text>
                      </View>

                      <View
                        style={{
                          width: 260,
                          height: 'auto',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            width: '85%',
                            height: 'auto',
                            width: '80%',
                          }}>
                          {item.Reviews}
                        </Text>
                        <View
                          style={{
                            width: '15%',
                            flexDirection: 'row',
                            marginTop: 5,
                          }}>
                          <Text style={{color: 'black', fontSize: 13}}>
                            {item.Rating}
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
                      </View>
                    </View>
                  ))
                )}
              </ScrollView>
            </View>
          )}
        </View>

        {/*  Bottom navigation bar */}

        <View
          style={{width: '100%', height: 70, position: 'absolute', top: 665}}>
          <Navbar navigation={navigation}></Navbar>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
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
  scrollContentContainer: {
    flexGrow: 1,
    alignItems: 'center',
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
    alignItems: 'center',
  },
  line1: {
    width: 125,
    backgroundColor: '#797979',
    borderWidth: 0.3,
    borderColor: '#797979',
    position: 'absolute',
    top: 90,
    left: 35,
  },
  line2: {
    width: 125,
    backgroundColor: '#797979',
    borderWidth: 0.3,
    borderColor: '#797979',
    position: 'absolute',
    top: 90,
    right: 35,
  },

  rating: {
    width: '30%',
    height: 30,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: Colors.primary,
  },
  ratingDeactive: {
    width: '30%',
    height: 30,
    alignItems: 'center',
    borderBottomWidth: 3,
  },
  giveRating: {
    width: '50%',
    height: 30,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: Colors.primary,
  },
  giveRatingDeactive: {
    width: '50%',
    height: 30,
    alignItems: 'center',
    borderBottomWidth: 3,
  },
});
