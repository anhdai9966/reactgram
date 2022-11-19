import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { recents, users } from "~/services";

export const fetchUsersByKeyWord = createAsyncThunk(
  "header/fetchUserByKeyWord",
  async (keyword) => {
    const res = await users.getUsersByKeyword(keyword);

    return res.data.data.users;
  }
);

export const fetchResentsByUserId = createAsyncThunk(
  "header/fetchResentsByUserId",
  async (uid) => {
    const res = await recents.getResentByUserId(uid);

    return res.data.data.recents;
  }
);

const initialState = {
  searchs: [],
  recents: [],
  enteredSearch: "",
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
    setEnteredSearch(state, action) {
      state.enteredSearch = action.payload;
    },
    setIsLoadingSearch(state, action) {
      state.isLoadingSearch = action.payload;
    },
    addRecents(state, action) {
      state.recents = [action.payload, ...state.recents];
    },
    deleteRecents(state, action) {
      const id = action.payload;
      state.recents = state.recents.filter((recent) => recent.id !== id);
    },
    deleteAllRecents(state, action) {
      state.recents = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsersByKeyWord.pending, (state, action) => {
      state.isLoadingSearch = true;
      state.searchs = [];
    });
    builder.addCase(fetchUsersByKeyWord.fulfilled, (state, action) => {
      state.isLoadingSearch = false;
      state.searchs = action.payload;
    });
    builder.addCase(fetchUsersByKeyWord.rejected, (state, action) => {
      state.isLoadingSearch = false;
    });
    builder.addCase(fetchResentsByUserId.pending, (state, action) => {
      state.isLoadingSearch = true;
    });
    builder.addCase(fetchResentsByUserId.fulfilled, (state, action) => {
      state.isLoadingSearch = false;
      state.recents = action.payload;
    });
    builder.addCase(fetchResentsByUserId.rejected, (state, action) => {
      state.isLoadingSearch = false;
    });
  },
});

export const {
  setIsShowClearAllRecentModal,
  setEnteredSearch,
  setIsLoadingSearch,
  addRecents,
  deleteRecents,
  deleteAllRecents,
} = headerSlice.actions;

export default headerSlice.reducer;
