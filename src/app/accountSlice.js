import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { account } from "~/services";

export const accountLogin = createAsyncThunk(
  "account/accountLogin",
  async ({ email, password, isChecked }, { rejectWithValue }) => {
    try {
      const res = await account.login(email, password, isChecked);
      // const res = await signInWithEmailAndPassword(auth, email, password);
      return res.user;
    } catch (error) {
      // console.log(error.message);
      throw rejectWithValue(error.code);
    }
  }
);

export const accountloginWithGoogle = createAsyncThunk(
  "account/loginWithGoogle",
  async (thunkAPI) => {
    try {
      const result = await account.loginWithGoogle();
      // The signed-in user info.
      return result.user;
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      thunkAPI.rejectWithValue(errorCode);
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
    resetLoggedMessages(state) {
      state.isLoggedMessage = "";
    },
    setLoadingAccount(state, action) {
      state.isLoadingAccount = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(accountLogin.pending, (state, action) => {
      state.isLoadingAccount = true;
      state.isLoggedMessage = "";
    });
    builder.addCase(accountLogin.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.isLoadingAccount = false;
      state.isLoggedIn = true;
      state.isLoggedMessage = "";
    });
    builder.addCase(accountLogin.rejected, (state, action) => {
      state.isLoggedMessage = action.payload;
      state.isLoggedIn = false;
      state.isLoadingAccount = false;
    });
    builder.addCase(accountloginWithGoogle.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
      state.isLoadingAccount = false;
    });
    builder.addCase(accountloginWithGoogle.rejected, (state, action) => {
      state.isLoggedMessage = action.payload;
      state.isLoggedIn = false;
      state.isLoadingAccount = false;
    });
  },
});

export const { setIsLoggedIn, resetLoggedMessages, setLoadingAccount } = accountSlice.actions;
export default accountSlice.reducer;
