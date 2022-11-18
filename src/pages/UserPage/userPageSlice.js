import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { users } from "~/services";

export const fetchUsername = createAsyncThunk(
  "userPage/user",
  async (username, thunkAPI) => {
    try {
      const resUser = await users.getUsername(username);

      return resUser.data.data.user;
    } catch (error) {
      const errorCode = error.code;
      throw thunkAPI.rejectWithValue(errorCode);
    }
  }
);

const initialState = {
  isStatusUserPage: false,
  userPage: {},
  isLoadingUserPage: false,
  isMessageUserPage: "",
  isLoadingProfilePic: false,
};

const userPageSlice = createSlice({
  name: "userPage",
  initialState,
  reducers: {
    setUserPage(state, action) {
      state.userPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsername.pending, (state, action) => {
      state.isLoadingUserPage = true;
    });
    builder.addCase(fetchUsername.fulfilled, (state, action) => {
      state.isLoadingUserPage = false;
      state.userPage = action.payload;
      state.isStatusUserPage = true;
    });
    builder.addCase(fetchUsername.rejected, (state, action) => {
      state.isLoadingUserPage = false;
      state.isMessageUserPage = action.payload;
      state.isStatusUserPage = false;
    });
  },
});

export const { setUserPage } = userPageSlice.actions;

export default userPageSlice.reducer;
