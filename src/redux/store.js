import {configureStore} from '@reduxjs/toolkit';
import AuthReducer from './reducers/auth';
import menuReducer from './reducers/menuSlice';
import orderReducer from './reducers/orderSlice';
import restaurantReducer from './reducers/restaurantSlice';
import dealsReducer from './reducers/dealSlice';
import reviewReducer from './reducers/reviewSlice';
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    menu: menuReducer,
    order: orderReducer,
    restaurant: restaurantReducer,
    deals: dealsReducer,
    review: reviewReducer,
  },
});
