import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import usersService from './usersService';

const initialState = {
  allUsers: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getAllUsers = createAsyncThunk(
  'users/getAllUsers',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await usersService.getAllUsers(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: {
    [getAllUsers.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.allUsers = action.payload;
    },
    [getAllUsers.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
  },
});

export const { reset } = usersSlice.actions;
export default usersSlice.reducer;
