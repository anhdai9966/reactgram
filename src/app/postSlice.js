import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { posts } from "~/services";

export const fetchAllPosts = createAsyncThunk(
  "post/fetchAllPosts",
  async () => {
    try {
      const resPosts = await posts.getAllPosts();

      return resPosts.data.data.posts.map((post) => {
        return { ...post, inputComment: "", comments: [] };
      });
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchPost = createAsyncThunk("post/fetchPost", async (postId) => {
  try {
    const resPost = await posts.getPostById(postId);

    return Object.assign({ inputComment: "" }, resPost.data.data.post);
  } catch (error) {
    console.log(error);
  }
});

export const fetchPostsByUserId = createAsyncThunk("post/fetchPostsByUserId", async (userId) => {
  try {
    const resPosts = await posts.getPostsByUserId(userId);

    return resPosts.data.data.posts
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  posts: [],
  isLoadingPosts: false,
  post: {},
  isLoadingPost: false,
  postsUser: [],
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
    addEmojiCommentPost(state, action) {
      const { id, emoji } = action.payload;
      state.posts = state.posts.map((post) => {
        if (post.id === id) {
          post.inputComment += emoji;
        }
        return post;
      });
    },
    setPost(state, action) {
      state.post = action.payload;
    },
    addCommentItem(state, action) {
      const { id, comment } = action.payload;
      state.posts = state.posts.map((post) => {
        if (post.id === id) {
          post.comments = [comment, ...post.comments];
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
    builder.addCase(fetchPost.pending, (state, action) => {
      state.isLoadingPost = true;
    });
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isLoadingPost = false;
    });
    builder.addCase(fetchPost.rejected, (state, action) => {
      state.isLoadingPost = false;
    });
    builder.addCase(fetchPostsByUserId.pending, (state, action) => {
      state.isLoadingPost = true;
    });
    builder.addCase(fetchPostsByUserId.fulfilled, (state, action) => {
      state.postsUser = action.payload;
      state.isLoadingPost = false;
    });
    builder.addCase(fetchPostsByUserId.rejected, (state, action) => {
      state.isLoadingPost = false;
    });
  },
});

export const {
  setPosts,
  setChangeCommentPost,
  addEmojiCommentPost,
  setPost,
  addCommentItem,
} = postSlice.actions;

export default postSlice.reducer;
