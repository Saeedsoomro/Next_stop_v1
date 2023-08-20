import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const STATUSES = Object.freeze({
  IDLE: 'idle',
  SUCCESS: 'success',
  ERROR: 'error',
  LOADING: 'loading',
});

export const giveReviewRating = createAsyncThunk(
  'menu/giveReviewRating',
  async (ratingData, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'https://firststop.bnstoys.net/api/Restaurants/RestaurantReviews',
        ratingData,
      );

      return response.data['Response'];
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getReviewsByRestaurants = createAsyncThunk(
  'restaurant/getRestaurnatReviews',
  async (restaurantId, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'https://firststop.bnstoys.net/api/Restaurants/GetReviewsByRestaurant',
        {
          restaurantsId: restaurantId,
        },
      );

      return response.data['Response'];
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const getAllReviews = createAsyncThunk(
  'restaurant/getAllReviews',
  async (restaurantId, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'https://firststop.bnstoys.net/api/Restaurants/GetRestaurantReviews',
        {
          reviews: 'string',
        },
      );

      return response.data['Response'];
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    restaurantsReviews: [],
    allReviews: [],
    status: STATUSES.IDLE,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(giveReviewRating.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(giveReviewRating.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCESS;
      })
      .addCase(giveReviewRating.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      })
      .addCase(getReviewsByRestaurants.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getReviewsByRestaurants.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCESS;
        state.restaurantsReviews = action.payload;
      })
      .addCase(getReviewsByRestaurants.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      })
      .addCase(getAllReviews.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getAllReviews.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCESS;
        state.allReviews = action.payload;
      })
      .addCase(getAllReviews.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      });
  },
});

export default reviewSlice.reducer;
