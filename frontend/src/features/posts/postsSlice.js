import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postsService from './postsService';

const initialState = {
  posts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getMyPosts = createAsyncThunk(
  'posts/getMyPosts',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postsService.getMyPosts(token);
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

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postsService.createPost(postData, token);
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

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postsService.deletePost(id, token);
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

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: {
    [createPost.pending]: (state, action) => {
      state.isLoading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.posts.push(action.payload);
    },
    [createPost.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.message = action.payload;
    },
    [getMyPosts.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getMyPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.posts = action.payload;
    },
    [getMyPosts.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.message = action.payload;
    },
    [deletePost.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload.id
      );
    },
    [deletePost.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.message = action.payload;
    },
  },
});

export const { reset } = postsSlice.actions;
export default postsSlice.reducer;
