import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../constants';
import Downbar from '../components/Downbar';
import BottomSheet from 'react-native-raw-bottom-sheet';
import ReviewTimelineBottomsheet from '../components/ReviewTimelineBottomsheet';
import ImageCropPicker from 'react-native-image-crop-picker';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {STATUSES, getAllReviews} from '../redux/reducers/reviewSlice';

const data = [
  {
    index: 1,
    userName: 'Farhan',
    timePeriod: '12 minutes',
    comment: 'This order staisfied my cravings',
    order: {
      food: 'Cake',
      price: 1200,
    },
    profileImage: null,
  },
  {
    index: 2,
    userName: 'Khadija',
    timePeriod: '12 minutes',
    comment: 'This order staisfied my cravings',
    order: {
      food: 'Pastry',
      price: 1200,
    },
    profileImage: null,
  },
  {
    index: 3,
    userName: 'Sami',
    timePeriod: '12 minutes',
    comment: 'This order staisfied my cravings',
    order: {
      food: 'Cake',
      price: 1200,
    },
    profileImage: null,
  },
  {
    index: 4,
    userName: 'Ali',
    timePeriod: '12 minutes',
    comment: 'This order staisfied my cravings',
    order: {
      food: 'Cake',
      price: 1200,
    },
    profileImage: null,
  },
];

export default function ReviewTimeline({navigation}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const dispatch = useDispatch();
  const {status, allReviews} = useSelector(state => state.review);

  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch]);

  const handleSearch = query => {
    setSearchQuery(query);

    // Filter the data based on the search query
    const filteredItems = allReviews.filter(
      item =>
        item.RestaurantsName.toLowerCase().indexOf(query.toLowerCase()) !== -1,
    );
    setFilteredData(filteredItems);
  };

  //const [userComment, setUserComment] = useState("");

  const userData = {userName: 'Maria', profileImage: null};

  // bottomsheet component

  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  // Function to handle item selection to bottomsheet
  const handleItemPress = item => {
    setSelectedItem(item);
    setBottomSheetVisible(true);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  //give review after order

  const [userComment, setUserComment] = useState('');

  const [rating, setRating] = useState(0);

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

  const [isModalVisible1, setIsModalVisible1] = useState(false);

  const showModal1 = () => {
    setIsModalVisible1(true);
  };

  const hideModal1 = () => {
    setIsModalVisible1(false);
  };

  //upload image

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
            width: 290,
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
            style={{width: 210, fontSize: 16}}
            placeholder="Search by cousine or review"
            placeholderTextColor={'black'}
            autoComplete="off"
            autoCorrect={false}
            autoCapitalize="none"
            value={searchQuery}
            onChangeText={handleSearch}></TextInput>
        </View>
      </View>

      {/* comment List*/}

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
          Timeline
        </Text>

        <ScrollView
          style={{marginBottom: 5}}
          keyboardShouldPersistTaps="handled">
          {/* share your experience */}

          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: '#797979',
              width: 340,
              height: 60,
              borderRadius: 15,
              marginLeft: 'auto',
              marginRight: 'auto',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ffe979',
              marginBottom: 15,
            }}>
            {userData.profileImage ? (
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 10,
                }}>
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 50,
                  }}
                  resizeMode="contain"
                  source={userData.profileImage}
                />
              </View>
            ) : (
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 10,
                }}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Bold',
                    fontSize: 25,
                    color: 'black',
                  }}>
                  {userData.userName.substring(0, 1)}
                </Text>
              </View>
            )}

            <TouchableOpacity
              activeOpacity={0.8}
              style={{height: 40, justifyContent: 'center'}}
              onPress={showModal1}>
              <Text
                style={{
                  width: 250,
                  fontSize: 16,
                  fontSize: 14,
                  alignSelf: 'center',
                  color: 'grey',
                }}>
                Share your food experience
              </Text>
            </TouchableOpacity>
          </View>

          {/* reviews */}

          {status === STATUSES.LOADING ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" />
            </View>
          ) : searchQuery !== '' ? (
            filteredData.map(item => (
              <View
                key={item.RestaurantReviewsId}
                style={{
                  borderWidth: 1,
                  borderColor: '#797979',
                  width: 340,
                  height: 'auto',
                  borderRadius: 15,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  backgroundColor: '#ffe979',
                  marginBottom: 15,
                }}>
                <View style={{flexDirection: 'row'}}>
                  {item.profileImage ? (
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 10,
                        marginTop: 10,
                      }}>
                      <Image
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 50,
                        }}
                        resizeMode="contain"
                        source={item.profileImage}
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 10,
                        marginTop: 10,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Montserrat-Bold',
                          fontSize: 25,
                          color: 'black',
                        }}>
                        {item.CustomerName.substring(0, 1)}
                      </Text>
                    </View>
                  )}

                  <View
                    style={{
                      width: 240,
                      height: 45,
                      marginTop: 12,
                      marginLeft: 10,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Bold',
                        fontSize: 16,
                        color: 'black',
                      }}>
                      {item.CustomerName}
                    </Text>
                    <Text style={{fontSize: 13, color: 'grey'}}>
                      {item.timePeriod} ago
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={{width: 25, height: 40, marginTop: 10}}
                    activeOpacity={0.6}
                    onPress={showModal}>
                    <Image
                      style={{
                        width: 25,
                        height: 25,
                        alignSelf: 'center',
                      }}
                      source={require('../assets/images/icons/dot-icon.png')}
                    />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    width: 290,
                    height: 'auto',
                    marginTop: 5,
                    marginLeft: 20,
                  }}>
                  <Text style={{fontSize: 14, color: 'grey'}}>
                    {item.comment}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.6}
                  onPress={() => handleItemPress(item)}>
                  <Text style={{fontSize: 16, color: 'black'}}>
                    Order Summary
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            allReviews.map(item => (
              <View
                key={item.RestaurantReviewsId}
                style={{
                  borderWidth: 1,
                  borderColor: '#797979',
                  width: 340,
                  height: 'auto',
                  borderRadius: 15,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  backgroundColor: '#ffe979',
                  marginBottom: 15,
                }}>
                <View style={{flexDirection: 'row'}}>
                  {item.profileImage ? (
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 10,
                        marginTop: 10,
                      }}>
                      <Image
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 50,
                        }}
                        resizeMode="contain"
                        source={item.profileImage}
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 10,
                        marginTop: 10,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Montserrat-Bold',
                          fontSize: 25,
                          color: 'black',
                        }}>
                        {item.CustomerName.substring(0, 1)}
                      </Text>
                    </View>
                  )}

                  <View
                    style={{
                      width: 240,
                      height: 45,
                      marginTop: 12,
                      marginLeft: 10,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Bold',
                        fontSize: 16,
                        color: 'black',
                      }}>
                      {item.CustomerName}
                    </Text>
                    <Text style={{fontSize: 13, color: 'grey'}}>
                      {item.timePeriod} ago
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={{width: 25, height: 40, marginTop: 10}}
                    activeOpacity={0.6}
                    onPress={showModal}>
                    <Image
                      style={{
                        width: 25,
                        height: 25,
                        alignSelf: 'center',
                      }}
                      source={require('../assets/images/icons/dot-icon.png')}
                    />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    width: 290,
                    height: 'auto',
                    marginTop: 5,
                    marginLeft: 20,
                  }}>
                  <Text style={{fontSize: 14, color: 'grey'}}>
                    {item.Reviews}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.6}
                  onPress={() => handleItemPress(item)}>
                  <Text style={{fontSize: 16, color: 'black'}}>
                    Order Summary
                  </Text>
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
          height: 56,
          backgroundColor: Colors.primary,
          position: 'absolute',
          top: 660,
        }}>
        {/* bottom navigation bar */}
        <View
          style={{flex: 1, flexDirection: 'row', width: '100%', height: 55}}>
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
            style={{
              position: 'relative',
              width: '20%',
              height: 45,
              alignItems: 'center',
            }}
            activeOpacity={0.6}>
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

        <Downbar />
      </View>

      {/*Bottom Sheet */}

      <ReviewTimelineBottomsheet
        isVisible={isBottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        selectedItem={selectedItem}
        navigation={navigation}
      />

      {/* modal for alert of options */}

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={hideModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalButton} onPress={hideModal}>
              <Text style={styles.modalButtonText}>X</Text>
            </TouchableOpacity>

            <View
              style={{
                width: 150,
                height: 70,
                marginLeft: 'auto',
                marginRight: 'auto',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity activeOpacity={0.6}>
                <Text style={{color: '#333333', fontSize: 18}}>
                  Report Message
                </Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.6}>
                <Text style={{color: '#333333', fontSize: 18}}>
                  Report User
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* give review after order modal */}

      <Modal
        visible={isModalVisible1}
        transparent={true}
        animationType="fade"
        onRequestClose={hideModal1}>
        <View style={styles.modalContainer1}>
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
              backgroundColor: 'white',
            }}
            onPress={hideModal1}>
            <Image
              style={{width: 35, height: 25}}
              source={require('../assets/images/icons/back-arrow2.png')}></Image>
          </TouchableOpacity>
          <View style={styles.modalContent1}>
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                fontSize: 17,
                color: 'black',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}>
              {' '}
              your experience?
            </Text>

            <Text
              style={{
                fontSize: 16,
                marginTop: 10,
                marginBottom: 10,
                color: 'grey',
              }}>
              Order Summary
            </Text>

            <View style={styles.order}>
              <Text style={{color: 'black', fontSize: 17, marginRight: 30}}>
                1x Three milk cake
              </Text>
              <Text style={{color: 'black', fontSize: 17}}>Rs. 1706</Text>
            </View>

            <Text
              style={{
                fontSize: 16,
                marginTop: 10,
                marginBottom: 10,
                color: 'grey',
              }}>
              Comment
            </Text>

            <View
              style={{
                width: 250,
                height: 70,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f2f2f2',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}>
              <TextInput
                style={{
                  width: 240,
                  height: 70,
                  fontSize: 12,
                  marginBottom: 3,
                  color: 'black',
                }}
                multiline={true}
                textAlignVertical="top"
                autoComplete="off"
                autoCorrect={false}
                autoCapitalize="none"
                value={userComment}
                onChangeText={data => setUserComment(data)}></TextInput>
            </View>

            <Text style={{fontSize: 16, marginTop: 10, color: 'grey'}}>
              Rates
            </Text>

            <View
              style={{
                width: 135,
                height: 35,
                marginLeft: 'auto',
                marginRight: 'auto',
                position: 'relative',
              }}>
              <View
                style={{flexDirection: 'row', position: 'absolute', top: -10}}>
                <TouchableOpacity onPress={() => handlePress(1)}>
                  <Text style={{fontSize: 35, color: getStarColor(1)}}>★</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress(2)}>
                  <Text style={{fontSize: 35, color: getStarColor(2)}}>★</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress(3)}>
                  <Text style={{fontSize: 35, color: getStarColor(3)}}>★</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress(4)}>
                  <Text style={{fontSize: 35, color: getStarColor(4)}}>★</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress(5)}>
                  <Text style={{fontSize: 35, color: getStarColor(5)}}>★</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={{fontSize: 16, marginTop: 10, color: 'grey'}}>
              Image
            </Text>

            <TouchableOpacity
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                borderWidth: 1,
                width: 130,
                height: 35,
                backgroundColor: '#f2f2f2',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
                marginBottom: 10,
              }}
              onPress={selectImage}>
              <Text style={{fontSize: 15, color: 'grey'}}>Upload image(s)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                width: 120,
                height: 35,
                backgroundColor: Colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderRadius: 15,
                marginTop: 10,
                marginBottom: 10,
                marginTop: 40,
              }}
              onPress={hideModal1}>
              <Text style={{fontSize: 15, color: 'black'}}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* bottom navigation bar */}

        <View
          style={{width: '100%', height: 73, position: 'absolute', top: 660}}>
          <View
            style={{
              width: '100%',
              height: 60,
              backgroundColor: Colors.primary,
            }}>
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
                onPress={hideModal1}>
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
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 130,
    height: 25,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#797979',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 12,
    marginBottom: 10,
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
  bottomDrawer: {
    width: '100%',
    height: 200,
    alignItems: 'center',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    width: '80%',
    borderColor: '#797979',
    borderWidth: 1,
  },

  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },

  modalButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 30,
    height: 30,
    position: 'absolute',
    right: -2,
  },
  modalButtonText: {
    color: 'black',
    fontSize: 16,
  },

  modalContainer1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent1: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    width: '85%',
    borderWidth: 1,
    borderColor: '#797979',
  },
  order: {
    flexDirection: 'row',
    backgroundColor: '#ffe979',
    borderWidth: 1,
    borderColor: '#797979',
    width: 260,
    height: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
});

{
  /*
 <BottomSheet ref={bottomSheetRef1} customStyles={{
                container: {
                    height: 380, borderTopStartRadius: 10, borderTopEndRadius: 10, borderTopColor: 'black', borderTopWidth: 1, borderStartColor: 'black', borderStartWidth: 1, borderEndColor: 'black', borderEndWidth: 1,
                },
            }}
                closeOnDragDown={true}>
                <View style={styles.bottomDrawer}>

                    <Text style={{ fontFamily: 'Montserrat-Bold', color: 'black', fontSize: 20, marginBottom: 10 }}>Order Summary</Text>



                    <View style={{ borderWidth: 1, borderColor: '#797979', width: 340, height: 'auto', borderRadius: 15, marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#ffe979', marginBottom: 15, paddingBottom: 30 }}>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: 50, height: 50, borderRadius: 50, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginLeft: 10, marginTop: 10 }}>
                                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 25, color: 'black' }}>K</Text>
                            </View>

                            <View style={{ width: 240, height: 45, marginTop: 12, marginLeft: 10 }}>
                                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 16, color: 'black' }}>khadija</Text>
                                <Text style={{ fontSize: 13, color:'grey' }}>2 minutes ago</Text>
                            </View>


                        </View>
                        <View style={{ width: 250, height: 'auto', marginLeft: 70, flexDirection: 'row', margin: 6 }}>
                            <Text style={{ color: 'black', fontSize: 17, marginRight: 30 }}>1x Three milk cake</Text>
                            <Text style={{ color: 'black', fontSize: 17 }}>Rs. 1706</Text>
                        </View>


                    </View>

                    <TouchableOpacity style={{
                        width: 110,
                        height: 30,
                        backgroundColor: Colors.primary,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 15,
                        borderColor: '#797979',
                        alignSelf: 'center', marginTop: 50
                    }} activeOpacity={0.6}>
                        <Text style={{ fontSize: 20, color: 'black' }}>Close</Text>
                    </TouchableOpacity>
                </View>


              // Bottom sheet navigation bar 


                <View style={{ width: "100%", height: 56, backgroundColor: Colors.primary, position: 'absolute', top: 323 }} >

                    <View style={{ flex: 1, flexDirection: 'row', width: "100%", height: 55, }}>

                        <TouchableOpacity style={styles.navbar} activeOpacity={0.6}
                            onPress={() => navigation.navigate("Homepage")} >


                            <Image
                                style={{
                                    width: 48,
                                    height: 55,
                                    position: 'absolute',
                                    top: -9
                                }}
                                source={require('../assets/images/icons/homepage-icon.png')} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.navbar} activeOpacity={0.6}
           onPress={() => navigation.navigate("OrderHistory")}>


                            <Image
                                style={{
                                    width: 35,
                                    height: 35,
                                    position: 'absolute',
                                    top: 3
                                }}
                                source={require('../assets/images/icons/order-history-icon.png')} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.navbar} activeOpacity={0.6}
                         onPress={() => navigation.navigate("Favourites")}>
                            <Image
                                style={{
                                    width: 23,
                                    height: 30,
                                    position: 'absolute',
                                    top: 6
                                }}
                                source={require('../assets/images/icons/favorites-icon.png')} />
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            position: 'relative',
                            width: "20%",
                            height: 45,
                            alignItems: 'center'
                        }} activeOpacity={0.6}>
                            <Image
                                style={{
                                    width: 62,
                                    height: 55,
                                    position: 'absolute',
                                    top: -4
                                }}
                                source={require('../assets/images/icons/timeline-icon.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navbar} activeOpacity={0.6}
                        onPress={() => navigation.navigate("DealsAndDiscount")}>
                            <Image
                                style={{
                                    width: 34,
                                    height: 44,
                                    position: 'absolute',
                                    top: 0
                                }}
                                source={require('../assets/images/icons/discount-icon.png')} />
                        </TouchableOpacity>
                    </View>

                    <Downbar />

                </View>

            </BottomSheet>

*/
}
