import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { posts } from "~/services";

export const fetchPostExplore = createAsyncThunk(
  "explore/posts",
  async (uid, thunkApi) => {
    try {
      const res = await posts.getPostsByExplore(uid);
      return res.data.data.posts;
    } catch (error) {
      thunkApi.rejectWithValue(error.code);
      throw error;
    }
  }
);

const initialState = {
  postsExplore: [],
  isLoadingPostsExplore: false,
  messageErrorPostsExplore: "",
};

const exploreSlice = createSlice({
  name: "explore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPostExplore.pending, (state, actions) => {
      state.isLoadingPostsExplore = true;
    });
    builder.addCase(fetchPostExplore.fulfilled, (state, actions) => {
      state.postsExplore = actions.payload;
      state.isLoadingPostsExplore = false;
    });
    builder.addCase(fetchPostExplore.rejected, (state, actions) => {
      state.messageErrorPostsExplore = actions.payload;
      state.isLoadingPostsExplore = false;
    });
  },
});

export const {} = exploreSlice.actions;

export default exploreSlice.reducer;
