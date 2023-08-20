import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const STATUSES = Object.freeze({
  IDLE: 'idle',
  SUCCESS: 'success',
  ERROR: 'error',
  LOADING: 'loading',
});

export const addMenuItem = createAsyncThunk(
  'menu/addItem',
  async (menuItem, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'https://firststop.bnstoys.net/api/Restaurants/CreateRestaurantsMenu',
        menuItem,
      );
      return response.data['Response'];
    } catch (error) {
      return rejectWithValue('server error');
    }
  },
);
export const addPreBooking = createAsyncThunk(
  'menu/addPreBooking',
  async (preBookingData, {rejectWithValue}) => {
    try {
      console.log(preBookingData);
      const response = await axios.post(
        'https://firststop.bnstoys.net/api/Restaurants/CreateRestaurantPreBooking',
        preBookingData,
      );
      return response.data['Response'];
    } catch (error) {
      console.log(error);
      return rejectWithValue('server error');
    }
  },
);

export const upadatePreBooking = createAsyncThunk(
  'menu/updatePreBooking',
  async (preBookingData, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'https://firststop.bnstoys.net/api/Restaurants/CreateRestaurantPreBooking',
        preBookingData,
      );
      return response.data['Response'];
    } catch (error) {
      console.log(error);
      return rejectWithValue('server error');
    }
  },
);

export const getRestaurantMenu = createAsyncThunk(
  'restuarant/getRestuarantMenu',
  async (restaurantsId, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'https://firststop.bnstoys.net/api/Restaurants/GetRestaurantsMenu',
        {
          restaurantsId,
        },
      );
      return response.data['Response'];
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const authSlice = createSlice({
  name: 'menu',
  initialState: {
    menuItem: {},
    restaurantsMenu: [],
    preBooking: {},
    status: STATUSES.IDLE,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addMenuItem.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(addMenuItem.fulfilled, (state, action) => {
        state.menuItem = action.payload;
        state.status = STATUSES.SUCCESS;
      })
      .addCase(addMenuItem.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      })
      .addCase(addPreBooking.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(addPreBooking.fulfilled, (state, action) => {
        state.preBooking = action.payload;
        state.status = STATUSES.SUCCESS;
      })
      .addCase(addPreBooking.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      })
      .addCase(getRestaurantMenu.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getRestaurantMenu.fulfilled, (state, action) => {
        state.restaurantsMenu = action.payload;
        state.status = STATUSES.SUCCESS;
      })
      .addCase(getRestaurantMenu.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      })
      .addCase(upadatePreBooking.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(upadatePreBooking.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCESS;
      })
      .addCase(upadatePreBooking.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
