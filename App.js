import React, {useEffect} from 'react';
// import AdminNavigation from './adminNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useDispatch, useSelector} from 'react-redux';
import UserNavigation from './userNavigation';
import AdminNavigation from './adminNavigation';
import Toast from 'react-native-toast-message';
import {
  addFavoriteRestaurantsFromLocal,
  getRestaurantById,
} from './src/redux/reducers/restaurantSlice';
// import {StripeProvider} from '@stripe/stripe-react-native';
import {getCustomer} from './src/redux/reducers/auth';

export default function App() {
  const dispatch = useDispatch();
  const {token, userState} = useSelector(state => state.auth);
  const fetchFavoriteRestaurantsFromStorage = async () => {
    try {
      const storedFavoriteRestaurants = await AsyncStorage.getItem(
        'favoriteRestaurants',
      );

      if (storedFavoriteRestaurants) {
        const favoriteRestaurants = JSON.parse(storedFavoriteRestaurants);
        dispatch(addFavoriteRestaurantsFromLocal(favoriteRestaurants));
      }
    } catch (error) {
      console.log(
        'Error fetching favoriteRestaurants from AsyncStorage:',
        error,
      );
    }
  };

  const getUser = async () => {
    const customerId = await AsyncStorage.getItem('customerId');
    const userData = {
      CustomerId: customerId,
    };
    dispatch(getCustomer(userData));
    console.log(userState);
  };

  const getRestaurant = async () => {
    const customerId = await AsyncStorage.getItem('customerId');
    dispatch(getRestaurantById(customerId));
  };

  useEffect(() => {
    fetchFavoriteRestaurantsFromStorage();
    getUser();
    getRestaurant();
  }, [dispatch, token]);
  const STRIPE_KEY =
    'pk_test_51N4S8eFuhaSFNWDBPBWjYrROGYlHX0qqyGbsNCCByeXbV5oja3VFK2ZruCZvKDeGoVVw2n9m2XYSAMbUHryxfNRb00l2Td9rhf';

  return (
    <>
      {/* <StripeProvider publishableKey={STRIPE_KEY}> */}
      <UserNavigation />
      {/* <AdminNavigation /> */}
      <Toast />
      {/* </StripeProvider> */}
    </>
  );
}
