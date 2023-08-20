import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const STATUSES = Object.freeze({
  IDLE: 'idle',
  SUCCESS: 'success',
  ERROR: 'error',
  LOADING: 'loading',
});

export const getRestaurants = createAsyncThunk(
  'restuarant/getRestuarant',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'https://firststop.bnstoys.net/api/Restaurants/GetRestaurant',
        {
          //   restuarantId,
          //   : '0000000-0000-0000-000000000000',
        },
      );

      return response.data['Response'];
    } catch (error) {
      return rejectWithValue('server error');
    }
  },
);

export const registerRestaurant = createAsyncThunk(
  'restaurant/registerRestaurant',
  async (restaurantsData, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'https://firststop.bnstoys.net/api/Restaurants/CreateRestaurants',
        restaurantsData,
      );
      return response.data['Response'];
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateRestaurant = createAsyncThunk(
  'restaurnat/updateRestaurant',
  async (restaurnatData, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'https://firststop.bnstoys.net/api/Restaurants/UpdateRestaurants',
        restaurnatData,
      );
      console.log(response.data['Response']);
      return response.data['Response'];
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const loginAdmin = createAsyncThunk(
  'restaurant/siginRestaurants',
  async (restaurantsData, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'https://firststop.bnstoys.net/api/Restaurants/CreateCustomers',
        restaurantsData,
      );

      return response.data['Response'];
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const saveFavoriteRestaurantsToLocalStorage = async data => {
  try {
    const dataJson = JSON.stringify(data);
    await AsyncStorage.setItem('favoriteRestaurants', dataJson);
  } catch (error) {
    console.log(error);
  }
};

export const getRestaurantsTimings = createAsyncThunk(
  'restaurnat/getRestaurantsTimings',
  async (restaurantId, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'https://firststop.bnstoys.net/api/Restaurants/GetRestaurantsTiming',
        {
          restaurantsId: restaurantId,
        },
      );
      console.log(response.data['Response']);
      return response.data['Response'];
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const updateRestaurantsTimings = createAsyncThunk(
  'restaurnat/updateRestaurantsTimings',
  async (timingsData, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'https://firststop.bnstoys.net/api/Restaurants/UpdateRestaurantsTiming',
        timingsData,
      );
      console.log(response.data['Response']);
      return response.data['Response'];
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const getRestaurantById = createAsyncThunk(
  'restaurnat/getRestaurantById',
  async (restaurantId, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'https://firststop.bnstoys.net/api/Restaurants/GetRestaurant',
        {
          restaurantsId: restaurantId,
        },
      );
      return response.data['Response'][0];
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState: {
    token: '',
    restaurantState: {},
    restaurants: [],
    favoriteRestaurants: [],
    restaurantsMenu: [],
    restaurantsTimings: [],
    error: null,
    status: STATUSES.IDLE,
  },
  reducers: {
    addFavoriteRestaurants(state, action) {
      const isFavorite = state.favoriteRestaurants.some(
        favItem => favItem.RestaurantsId === action.payload.RestaurantsId,
      );

      if (isFavorite) {
        // Remove from favorites
        const favoriteItems = state.favoriteRestaurants.filter(
          favItem => favItem.RestaurantsId !== action.payload.RestaurantsId,
        );
        state.favoriteRestaurants = favoriteItems;
        saveFavoriteRestaurantsToLocalStorage(favoriteItems);
      } else {
        // Add to favorites
        state.favoriteRestaurants.push(action.payload);
        saveFavoriteRestaurantsToLocalStorage(state.favoriteRestaurants);
      }
    },
    addFavoriteRestaurantsFromLocal(state, action) {
      state.favoriteRestaurants = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getRestaurants.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getRestaurants.fulfilled, (state, action) => {
        state.restaurants = action.payload;
        state.status = STATUSES.SUCCESS;
      })
      .addCase(getRestaurants.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      })
      .addCase(registerRestaurant.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(registerRestaurant.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCESS;
        state.restaurantState = action.payload;
      })
      .addCase(registerRestaurant.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      })
      .addCase(loginAdmin.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCESS;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      })
      .addCase(updateRestaurant.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(updateRestaurant.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCESS;
        state.restaurantState = action.payload;
      })
      .addCase(updateRestaurant.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(getRestaurantsTimings.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getRestaurantsTimings.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCESS;
        state.restaurantsTimings = action.payload;
      })
      .addCase(getRestaurantsTimings.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(getRestaurantById.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getRestaurantById.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCESS;
        state.restaurantState = action.payload;
      })
      .addCase(getRestaurantById.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});
export const {addFavoriteRestaurants, addFavoriteRestaurantsFromLocal} =
  restaurantSlice.actions;

export default restaurantSlice.reducer;
