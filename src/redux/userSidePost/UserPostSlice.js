import { createSlice } from "@reduxjs/toolkit";
import {
  searchPostsThunk,
  sortPostsThunk,
  filterPostsByCategoryThunk,
  filterPostsThunk,
  paginatePostsThunk,
} from "./UserPostThunk";

// Initial state
const initialState = {
  posts: [],
  isLoading: false,
  error: null,
};

// Slice
const userPostSlice = createSlice({
  name: "userPosts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Search
    builder
      .addCase(searchPostsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchPostsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(searchPostsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Sort
    builder
      .addCase(sortPostsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sortPostsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(sortPostsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Filter by Category
    builder
      .addCase(filterPostsByCategoryThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(filterPostsByCategoryThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(filterPostsByCategoryThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Combined Filters
    builder
      .addCase(filterPostsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(filterPostsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(filterPostsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Pagination
    builder
      .addCase(paginatePostsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(paginatePostsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(paginatePostsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userPostSlice.reducer;
