import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { posts } from "~/services";

export const fetchAllPosts = createAsyncThunk("post/fetchPost", async () => {
  try {
    const resPost = await posts.getAllPosts();

    return resPost.data.data.posts.map((post) => {
      return { ...post, inputComment: "" };
    });
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  posts: [],
  isLoadingPosts: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setChangeCommentPost(state, action) {
      const { id, value } = action.payload;
      state.posts = state.posts.map((post) => {
        if (post.id === id) {
          post.inputComment = value;
        }
        return post;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllPosts.pending, (state, action) => {
      state.isLoadingPosts = true;
    });
    builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isLoadingPosts = false;
    });
    builder.addCase(fetchAllPosts.rejected, (state, action) => {
      state.isLoadingPosts = false;
    });
  },
});

export const { setPosts, setChangeCommentPost } = postSlice.actions;

export default postSlice.reducer;
