import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const STATUSES = Object.freeze({
  IDLE: 'idle',
  SUCCESS: 'success',
  ERROR: 'error',
  LOADING: 'loading',
});

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderDetails, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'https://firststop.bnstoys.net/api/Restaurants/CreateRestaurantOrder',
        orderDetails,
      );
      console.log(response.data['Response']);
      return response.data['Response'];
    } catch (error) {
      console.log(error);
      return rejectWithValue('server error');
    }
  },
);
export const getNewOrders = createAsyncThunk(
  'order/getNewOrders',
  async (restaurantId, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'https://firststop.bnstoys.net/api/Restaurants/getRestaurantNewOrder',
        {
          restaurantsId: restaurantId,
        },
      );
      console.log(response.data['Response']);
      return response.data['Response'];
    } catch (error) {
      console.log(error);
      return rejectWithValue('server error');
    }
  },
);
export const getPreviousOrders = createAsyncThunk(
  'order/getPreviousOrders',
  async (restaurantId, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'https://firststop.bnstoys.net/api/Restaurants/GetPreviousOrdersRestaurant',
        {
          restaurantId: restaurantId,
        },
      );
      console.log(response.data['Response']);
      return response.data['Response'];
    } catch (error) {
      console.log(error);
      return rejectWithValue('server error');
    }
  },
);
export const getAcceptedOrders = createAsyncThunk(
  'order/getAcceptedOrders',
  async (restaurantId, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'https://firststop.bnstoys.net/api/Restaurants/GetRestaurantAcceptedOrder',
        {
          restaurantsId: restaurantId,
        },
      );
      return response.data['Response'];
    } catch (error) {
      console.log(error);
      return rejectWithValue('server error');
    }
  },
);
export const getDeclinedOrders = createAsyncThunk(
  'order/getDeclinedOrders',
  async (restaurantId, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'https://firststop.bnstoys.net/api/Restaurants/GetRestaurantDeclineOrder',
        {
          restaurantsId: restaurantId,
        },
      );
      return response.data['Response'];
    } catch (error) {
      console.log(error);
      return rejectWithValue('server error');
    }
  },
);
export const acceptNewOrders = createAsyncThunk(
  'order/acceptNewOrders',
  async (restaurantOrderId, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'https://firststop.bnstoys.net/api/Restaurants/RestaurantAcceptOrder',
        {
          restaurantOrderId,
        },
      );
      return response.data['Response'];
    } catch (error) {
      console.log(error);
      return rejectWithValue('server error');
    }
  },
);
export const declineNewOrders = createAsyncThunk(
  'order/declineNewOrders',
  async (restaurantOrderId, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'https://firststop.bnstoys.net/api/Restaurants/RestaurantDeclineOrder',
        {
          restaurantOrderId,
        },
      );
      console.log(response.data['Response']);
      return response.data['Response'];
    } catch (error) {
      console.log(error);
      return rejectWithValue('server error');
    }
  },
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderItems: {},
    newOrders: [],
    acceptedOrders: [],
    declinedOrders: [],
    previousOrders: [],
    status: STATUSES.IDLE,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createOrder.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCESS;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      })
      .addCase(getNewOrders.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getNewOrders.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCESS;
        state.newOrders = action.payload;
      })
      .addCase(getNewOrders.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      })
      .addCase(getDeclinedOrders.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getDeclinedOrders.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCESS;
        state.declinedOrders = action.payload;
      })
      .addCase(getDeclinedOrders.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      })
      .addCase(getAcceptedOrders.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getAcceptedOrders.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCESS;
        state.acceptedOrders = action.payload;
      })
      .addCase(getAcceptedOrders.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      })
      .addCase(acceptNewOrders.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(acceptNewOrders.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCESS;
      })
      .addCase(acceptNewOrders.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      })
      .addCase(declineNewOrders.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(declineNewOrders.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCESS;
      })
      .addCase(declineNewOrders.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      })
      .addCase(getPreviousOrders.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getPreviousOrders.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCESS;
        state.previousOrders = action.payload;
      })
      .addCase(getPreviousOrders.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
