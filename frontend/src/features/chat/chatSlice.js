import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import chatService from './chatService';
import messageService from './messageService';


const initialState = {
  selectedChat: null,
  isChatModal: false,
  messages: [],
  message: '',
  isError: false,
};

export const accessChat = createAsyncThunk(
  'chat/acessChat',
  async (userId, thunkAPI) => {
    try {
      return await chatService.accessChat(userId);
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

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (message, thunkAPI) => {
    try {
      return await messageService.sendMessage(message);
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

export const getAllMessages = createAsyncThunk(
  'chat/getAllMessages',
  async (chatId, thunkAPI) => {
    try {
      return await messageService.getAllMessages(chatId);
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

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    toggleChatModal: (state, action) => {
      state.isChatModal = !state.isChatModal;
    },
  },
  extraReducers: {
    [accessChat.pending]: (state, action) => {
      // state.isLoading = true;
    },
    [accessChat.fulfilled]: (state, action) => {
      // state.isLoading = true;
      state.isError = false;
      state.selectedChat = action.payload;
      state.messages = [];
    },
    [accessChat.rejected]: (state, action) => {
      // state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    [sendMessage.pending]: (state, action) => {
      // state.isLoading = true;
    },
    [sendMessage.fulfilled]: (state, action) => {
      // state.isLoading = true;
      state.isError = false;
      state.messages = [...state.messages, action.payload];
      // state.selectedChat = action.payload;
    },
    [sendMessage.rejected]: (state, action) => {
      // state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    [getAllMessages.pending]: (state, action) => {
      // state.isLoading = true;
    },
    [getAllMessages.fulfilled]: (state, action) => {
      // state.isLoading = true;
      state.isError = false;
      state.messages = action.payload;
    },
    [getAllMessages.rejected]: (state, action) => {
      // state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
  },
});

export const { toggleChatModal } = chatSlice.actions;

export default chatSlice.reducer;
