import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postsService from './postsService';

const initialState = {
  posts: null,
  allPosts: [],
  followingPosts: [],
  numberOfPages: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isModalOpen: false,
  idToDelete: '',
  message: '',
};

export const getMyPosts = createAsyncThunk(
  'posts/getMyPosts',
  async (page, thunkAPI) => {
    try {
      return await postsService.getMyPosts(page);
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

export const getAllPosts = createAsyncThunk(
  'posts/getAllPosts',
  async (page, thunkAPI) => {
    try {
      return await postsService.getAllPosts(page);
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

export const loadMore = createAsyncThunk(
  'posts/loadMore',
  async (page, thunkAPI) => {
    try {
      return await postsService.getAllPosts(page);
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

export const getFollowingPosts = createAsyncThunk(
  'posts/getFollowingPosts',
  async (page, thunkAPI) => {
    try {
      return await postsService.getFollowingPosts(page);
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
      return await postsService.createPost(postData);
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
      return await postsService.deletePost(id);
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

export const editPost = createAsyncThunk(
  'posts/editPost',
  async (postData, thunkAPI) => {
    try {
      return await postsService.editPost(postData);
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

export const likePost = createAsyncThunk(
  'posts/likePost',
  async (id, thunkAPI) => {
    try {
      return await postsService.likePost(id);
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
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    setIdToDelete: (state, action) => {
      state.idToDelete = action.payload;
    },
    selectPost: (state, action) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: {
    [likePost.pending]: (state, action) => {
      // state.isLoading = true;
    },
    [likePost.fulfilled]: (state, action) => {
      // state.isSuccess = true;
      // state.isLoading = false;
      state.isError = false;
      // state.allPosts = action.payload;
      // const id = state.posts?.length > 0 ? state.posts[0].createdBy : '';
      // state.posts = action.payload.filter((post) => {
      //   return post.createdBy === id;
      // });
    },
    [likePost.rejected]: (state, action) => {
      state.isError = true;
      // state.isLoading = false;
      state.message = action.payload;
    },
    [createPost.pending]: (state, action) => {
      // state.isLoading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.isError = false;
      // state.isLoading = false;
      // state.isSuccess = true;
      state.posts.unshift(action.payload);
    },
    [createPost.rejected]: (state, action) => {
      // state.isError = true;
      // state.isLoading = false;
      state.message = action.payload;
    },
    [getMyPosts.pending]: (state, action) => {
      // state.isLoading = true;
    },
    [getMyPosts.fulfilled]: (state, action) => {
      state.isError = false;
      // state.isLoading = false;
      // state.isSuccess = true;
      state.posts = action.payload.posts;
      state.numberOfPages = action.payload.numberOfPages;
    },
    [getMyPosts.rejected]: (state, action) => {
      state.isError = true;
      // state.isLoading = false;
      state.message = action.payload;
    },
    [getAllPosts.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.isError = false;
      state.isLoading = false;
      // state.isSuccess = true;
      state.numberOfPages = action.payload.numberOfPages;
      state.allPosts = action.payload.posts;
    },
    [getAllPosts.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.message = action.payload;
    },
    [loadMore.pending]: (state, action) => {
      state.isLoading = true;
    },
    [loadMore.fulfilled]: (state, action) => {
      state.isError = false;
      state.isLoading = false;
      // state.isSuccess = true;
        state.numberOfPages = action.payload.numberOfPages;
      state.allPosts = [...state.allPosts, ...action.payload.posts];
      // state.allPosts = action.payload.posts;
    },
    [loadMore.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.message = action.payload;
    },
    [getFollowingPosts.pending]: (state, action) => {
      // state.isLoading = true;
    },
    [getFollowingPosts.fulfilled]: (state, action) => {
      state.isError = false;
      // state.isLoading = false;
      // state.isSuccess = true;
      state.numberOfPages = action.payload.numberOfPages;
      state.followingPosts = action.payload.posts;
    },
    [getFollowingPosts.rejected]: (state, action) => {
      state.isError = true;
      // state.isLoading = false;
      state.message = action.payload;
    },
    [deletePost.pending]: (state, action) => {
      // state.isLoading = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.isError = false;
      // state.isLoading = false;
      // state.isSuccess = true;
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload.id
      );
    },
    [deletePost.rejected]: (state, action) => {
      state.isError = true;
      // state.isLoading = false;
      state.message = action.payload;
    },
    [editPost.pending]: (state, action) => {
      // state.isLoading = true;
    },
    [editPost.fulfilled]: (state, action) => {
      state.isError = false;
      // state.isLoading = false;
      // state.isSuccess = true;
      state.posts = state.posts.map((post) => {
        if (post._id === action.payload._id) {
          return { ...post, text: action.payload.text };
        } else {
          return post;
        }
      });
      state.allPosts = state.allPosts.map((post) => {
        if (post._id === action.payload._id) {
          return { ...post, text: action.payload.text };
        } else {
          return post;
        }
      });
    },
    [editPost.rejected]: (state, action) => {
      state.isError = true;
      // state.isLoading = false;
      state.message = action.payload;
    },
  },
});

export const { reset, openModal, closeModal, setIdToDelete, toggleLoading } =
  postsSlice.actions;
export default postsSlice.reducer;
