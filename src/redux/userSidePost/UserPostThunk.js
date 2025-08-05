import { createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Search posts by searchTerm
export const searchPostsThunk = createAsyncThunk(
  "userPosts/search",
  async (searchTerm, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:5000/api/post/getposts?searchTerm=${encodeURIComponent(searchTerm)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to search posts");
      return data.posts;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ✅ Sort posts (asc/desc)
export const sortPostsThunk = createAsyncThunk(
  "userPosts/sort",
  async (sort, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:5000/api/post/getposts?sort=${sort}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to sort posts");
      return data.posts;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ✅ Filter posts by category
export const filterPostsByCategoryThunk = createAsyncThunk(
  "userPosts/filterByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:5000/api/post/getposts?category=${encodeURIComponent(category)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to filter posts");
      return data.posts;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ✅ Combined filters (category, searchTerm, sort)

export const filterPostsThunk = createAsyncThunk(
  "userPosts/filterCombined",
  async ({ category, searchTerm, sort }, { rejectWithValue }) => {
    try {
      let url = "http://localhost:5000/api/post/getposts?";
      const params = [];
      if (category) params.push(`category=${encodeURIComponent(category)}`);
      if (searchTerm) params.push(`searchTerm=${encodeURIComponent(searchTerm)}`);
      if (sort) params.push(`sort=${sort}`);
      url += params.join("&");

      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to filter posts");
      return data.posts;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ✅ Pagination (startIndex, limit)
export const paginatePostsThunk = createAsyncThunk(
  "userPosts/paginate",
  async ({ startIndex = 0, limit = 10 }, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:5000/api/post/getposts?startIndex=${startIndex}&limit=${limit}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to paginate posts");
      return data.posts;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
 