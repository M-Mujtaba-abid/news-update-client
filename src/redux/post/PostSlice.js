// redux/post/postSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  createPostThunk,
  getPostsThunk,
  updatePostThunk,
  deletePostThunk,
} from "../post/PostThunk";

const initialState = {
  posts: [],
  singlePost: null,
  isLoading: false,
  error: null,
  successMessage: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    clearPostMessages: (state) => {
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // CREATE
    builder.addCase(createPostThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createPostThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.successMessage = "Post created successfully";
      state.posts.unshift(action.payload); // Add new post at the start
    });
    builder.addCase(createPostThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // GET
    builder.addCase(getPostsThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPostsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload.posts || [];
    });
    builder.addCase(getPostsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // UPDATE
    builder.addCase(updatePostThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updatePostThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.successMessage = "Post updated successfully";
      const updatedPost = action.payload;
      state.posts = state.posts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );
    });
    builder.addCase(updatePostThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // DELETE
builder.addCase(deletePostThunk.pending, (state) => {
  state.isLoading = true;
});
builder.addCase(deletePostThunk.fulfilled, (state, action) => {
  state.isLoading = false;
  state.successMessage = "Post deleted successfully";
  const deletedId = action.payload.postId;
  state.posts = state.posts.filter((post) => post._id !== deletedId); // ✅ Filter removed
});
builder.addCase(deletePostThunk.rejected, (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
});
  },
});

export const { clearPostMessages } = postSlice.actions;
export default postSlice.reducer;
