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

export const fetchPostById = createAsyncThunk(
  "post/fetchPostById",
  async (postId, thunkApi) => {
    try {
      const resPost = await posts.getPostById(postId);
      const post = resPost.data.data.post;
      return { ...post, inputComment: "", comments: [] };
    } catch (error) {
      return thunkApi.rejectWithValue(true);
    }
  }
);

export const fetchPostsByUserId = createAsyncThunk(
  "post/fetchPostsByUserId",
  async (userId) => {
    try {
      const resPosts = await posts.getPostsByUserId(userId);

      return resPosts.data.data.posts;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchPostsByUsername = createAsyncThunk(
  "post/fetchPostsByUsername",
  async (username) => {
    try {
      const resPosts = await posts.getPostsByUsername(username);

      return resPosts.data.data.posts;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  posts: [],
  isLoadingPosts: false,
  post: {},
  postError: false,
  isLoadingPost: false,
  isShowPostModal: false,
  postsUser: [],
  feeds: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    addNewPost(state, action) {
      state.posts = [
        { ...action.payload, inputComment: "", comments: [] },
        ...state.posts,
      ];
      state.postsUser = [action.payload, ...state.postsUser];
      state.feeds = [
        { ...action.payload, inputComment: "", comments: [] },
        ...state.feeds,
      ];
    },
    setIsShowPostsModal(state, action) {
      state.isShowPostModal = action.payload;
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
    builder.addCase(fetchPostById.pending, (state, action) => {
      state.isLoadingPost = true;
    });
    builder.addCase(fetchPostById.fulfilled, (state, action) => {
      state.post = action.payload;
      state.isLoadingPost = false;
    });
    builder.addCase(fetchPostById.rejected, (state, action) => {
      state.isLoadingPost = false;
      state.postError = action.payload;
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
    builder.addCase(fetchPostsByUsername.pending, (state, action) => {
      state.isLoadingPost = true;
    });
    builder.addCase(fetchPostsByUsername.fulfilled, (state, action) => {
      state.postsUser = action.payload;
      state.isLoadingPost = false;
    });
    builder.addCase(fetchPostsByUsername.rejected, (state, action) => {
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
  setIsShowPostsModal,
  addNewPost,
  addNewFeed,
} = postSlice.actions;

export default postSlice.reducer;
