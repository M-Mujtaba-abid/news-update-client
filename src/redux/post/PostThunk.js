// // redux/post/postThunk.js

// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { BASE_URL } from "../api/baseUrl";
// // Create a Post
// export const createPostThunk = createAsyncThunk(
//   "post/create",
//   async (postData, thunkAPI) => {
//     try {
//       const res = await fetch("http://localhost:5000/api/post/create", {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(postData),
//       });
//       const data = await res.json();
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// // Get all Posts (with optional filters like category, limit)
// export const getPostsThunk = createAsyncThunk(
//   "post/getAll",
//   async ({ category = "", limit = 10 } = {}, thunkAPI) => {
//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/post/getposts?category=${category}&limit=${limit}`
//       );
//       const data = await res.json();
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// // Update a Post
// export const updatePostThunk = createAsyncThunk(
//   "post/update",
//   async ({ postId, userId, updateData }, thunkAPI) => {
//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/post/updatepost/${postId}/${userId}`,
//         {
//           method: "PUT",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(updateData),
//         }
//       );
//       const data = await res.json();
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// // Delete a Post
// export const deletePostThunk = createAsyncThunk(
//   "post/delete",
//   async ({ postId, userId }, thunkAPI) => {
//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/post/deletepost/${postId}/${userId}`,
//         {
//           method: "DELETE",
//           credentials: "include",
//         }
//       );
//       const data = await res.json();
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );


// gpt---
// redux/post/postThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../api/baseUrl";

// Create a Post
export const createPostThunk = createAsyncThunk(
  "post/create",
  async (postData, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}/post/create`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get all Posts (with optional filters like category, limit)
export const getPostsThunk = createAsyncThunk(
  "post/getAll",
  async ({ category = "", limit = 10 } = {}, thunkAPI) => {
    try {
      const res = await fetch(
        `${BASE_URL}/post/getposts?category=${category}&limit=${limit}`
      );
      const data = await res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update a Post
export const updatePostThunk = createAsyncThunk(
  "post/update",
  async ({ postId, userId, updateData }, thunkAPI) => {
    try {
      const res = await fetch(
        `${BASE_URL}/post/updatepost/${postId}/${userId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete a Post
export const deletePostThunk = createAsyncThunk(
  "post/delete",
  async ({ postId, userId }, thunkAPI) => {
    try {
      const res = await fetch(
        `${BASE_URL}/post/deletepost/${postId}/${userId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
