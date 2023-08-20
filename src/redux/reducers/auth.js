import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const STATUSES = Object.freeze({
  IDLE: 'idle',
  SUCCESS: 'success',
  ERROR: 'error',
  LOADING: 'loading',
});

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'https://firststop.bnstoys.net/api/Restaurants/CreateCustomers',
        userData,
      );

      return response.data['Response'];
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const loginUser = createAsyncThunk(
  'user/siginUser',
  async (userData, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'https://firststop.bnstoys.net/api/Restaurants/LoginCustomers',
        userData,
      );
      return response.data['Response'];
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getCustomer = createAsyncThunk(
  'user/getUser',
  async (userData, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'https://firststop.bnstoys.net/api/Restaurants/GetCustomers',
        userData,
      );

      return response.data['Response'][0];
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateCustomer = createAsyncThunk(
  'user/updateUser',
  async (userData, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'https://firststop.bnstoys.net/api/Restaurants/UpdateCustomers',
        userData,
      );
      return response.data['Response'];
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    userState: {},
    status: STATUSES.IDLE,
  },
  reducers: {
    getUsr: () => {
      return userState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCESS;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userState = action.payload;
        state.status = STATUSES.SUCCESS;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      })
      .addCase(getCustomer.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.userState = action.payload;
        state.status = STATUSES.SUCCESS;
      })
      .addCase(getCustomer.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      })
      .addCase(updateCustomer.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.userState = action.payload;
        state.status = STATUSES.SUCCESS;
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
