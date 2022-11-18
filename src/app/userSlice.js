import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { users } from "~/services";

export const fetchUser = createAsyncThunk("user/user", async (userId) => {
  try {
    const resUser = await users.getUserById(userId);

    return resUser.data.data.user;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  isLoadingAccount: false,
  isLoggedIn: false,
  isLoggedMessage: "",
  currentUser: {},
  isLoadingScreen: false,
};

const accountSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setLoggedMessages(state, action) {
      state.isLoggedMessage = action.payload;
    },
    setLoadingAccount(state, action) {
      state.isLoadingAccount = action.payload;
    },
    setCurrentUser(state, action) {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
    setLogOut(state) {
      state.isLoggedIn = false;
      state.isLoadingAccount = false;
      state.currentUser = {};
    },
    setIsLoadingScreen(state, action) {
      state.isLoadingScreen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
      state.isLoggedMessage = "";
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoggedIn = false;
    });
  },
});

export const {
  setIsLoggedIn,
  setLoggedMessages,
  setLoadingAccount,
  setCurrentUser,
  setLogOut,
  setIsLoadingScreen,
} = accountSlice.actions;
export default accountSlice.reducer;
