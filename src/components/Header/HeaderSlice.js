import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { users } from "~/services";

export const fetchUsersByKeyWord = createAsyncThunk(
  "header/fetchUserByKeyWord",
  async (keyword) => {
    const res = await users.getUsersByKeyword(keyword);

    return res.data.data.users;
  }
);

export const fetchUsersResent = createAsyncThunk(
  "header/fetchUserResent",
  async (uid) => {
    const res = await users.getUsersResent(uid);

    return res.data.data.users;
  }
);

const initialState = {
  searchs: [],
  recents: [],
  isLoadingSearch: false,
  isShowClearAllRecentModal: false,
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setIsShowClearAllRecentModal(state, action) {
      state.isShowClearAllRecentModal = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoadingSearch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsersByKeyWord.pending, (state, action) => {
      state.isLoadingSearch = true;
    });
    builder.addCase(fetchUsersByKeyWord.fulfilled, (state, action) => {
      state.isLoadingSearch = false;
      state.searchs = action.payload;
    });
    builder.addCase(fetchUsersByKeyWord.rejected, (state, action) => {
      state.isLoadingSearch = false;
    });
    builder.addCase(fetchUsersResent.pending, (state, action) => {
      state.isLoadingSearch = true;
    });
    builder.addCase(fetchUsersResent.fulfilled, (state, action) => {
      state.isLoadingSearch = false;
      state.recents = action.payload;
    });
    builder.addCase(fetchUsersResent.rejected, (state, action) => {
      state.isLoadingSearch = false;
    });
  },
});

export const { setIsShowClearAllRecentModal, setIsLoading } =
  headerSlice.actions;

export default headerSlice.reducer;
