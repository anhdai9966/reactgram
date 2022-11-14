import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { users } from "~/services";

export const fetchUser = createAsyncThunk(
  "account/accountLogin",
  async (userId, thunkAPI) => {
    try {
      const resUser = await users.getUser(userId);

      return resUser.data.data.user;
    } catch (error) {
      console.log(error);
      // console.log(error.message);
      // const errorCode = error.code;
      // throw thunkAPI.rejectWithValue(errorCode);
    }
  }
);

const initialState = {
  isLoadingAccount: false,
  isLoggedIn: false,
  isLoggedMessage: "",
  currentUser: {},
};

const accountSlice = createSlice({
  name: "account",
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
      state.currentUser = action.payload;
    },
    setLogOut(state) {
      state.isLoggedIn = false;
      state.isLoadingAccount = false;
      state.currentUser = {};
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
} = accountSlice.actions;
export default accountSlice.reducer;
