import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import usersService from './usersService';

const initialState = {
  isProfileModal: false,
  selectedUser: null,
  allUsers: [],
  isError: false,
  isLoading: false,
  message: '',
};

export const getAllUsers = createAsyncThunk(
  'users/getAllUsers',
  async (searchTerm, thunkAPI) => {
    try {
      return await usersService.getAllUsers(searchTerm);
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
    toggleProfileModal: (state) => {
      state.isProfileModal = !state.isProfileModal;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: {
    [getAllUsers.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.allUsers = action.payload;
    },
    [getAllUsers.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
  },
});

export const { reset, toggleProfileModal, setSelectedUser } =
  usersSlice.actions;
export default usersSlice.reducer;
