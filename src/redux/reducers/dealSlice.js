import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const STATUSES = Object.freeze({
  IDLE: 'idle',
  SUCCESS: 'success',
  ERROR: 'error',
  LOADING: 'loading',
});

export const getAllDeals = createAsyncThunk(
  'deals/getAllDeals',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'https://firststop.bnstoys.net/api/Restaurants/GetRestaurantDealsAll',
        {
          restaurantDealName: 'All',
        },
      );
      return response.data['Response'];
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const getDealsByRestaurant = createAsyncThunk(
  'deals/getByRestaurantDeals',
  async (restaurantsId, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'https://firststop.bnstoys.net/api/Restaurants/GetRestaurantDeals',
        {
          restaurantId: restaurantsId,
        },
      );

      return response.data['Response'];
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const dealsSlice = createSlice({
  name: 'deals',
  initialState: {
    deals: [],
    restaurantsDeals: [],
    status: STATUSES.IDLE,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllDeals.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getAllDeals.fulfilled, (state, action) => {
        state.deals = action.payload;
        state.status = STATUSES.SUCCESS;
      })
      .addCase(getAllDeals.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      })
      .addCase(getDealsByRestaurant.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getDealsByRestaurant.fulfilled, (state, action) => {
        state.restaurantsDeals = action.payload;
        state.status = STATUSES.SUCCESS;
      })
      .addCase(getDealsByRestaurant.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      });
  },
});

export default dealsSlice.reducer;
