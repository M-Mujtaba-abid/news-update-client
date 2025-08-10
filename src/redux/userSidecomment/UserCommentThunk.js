// // redux/userSideComment/UserCommentThunk.js
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { BASE_URL } from "../../api/baseUrl";
// // Create a new comment
// export const createUserComment = createAsyncThunk(
//   "userComment/create",
//   async ({ content, postId, userId }, thunkAPI) => {
//     try {
//       const res = await fetch("http://localhost:5000/api/comment/create", {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ content, postId, userId }),
//       });
//       return await res.json();
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );


// // UserCommentThunk.js
// export const getPostComments = createAsyncThunk(
//   "userComment/getPostComments",
//   async (postId, thunkAPI) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/comment/getPostComments/${postId}`);
//       const data = await res.json();
      
//       // Ensure we return comments array properly
//       return Array.isArray(data) ? data : []; // Handle both array and object responses
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );


// // Like a comment
// // export const likeComment = createAsyncThunk(
// //   "userComment/likeComment",
// //   async (commentId, thunkAPI) => {
// //     try {
// //       const res = await fetch(`http://localhost:5000/api/comment/likeComment/${commentId}`, {
// //         method: "PUT",
// //         credentials: "include",
// //       });
// //       return await res.json();
// //     } catch (error) {
// //       return thunkAPI.rejectWithValue(error.message);
// //     }
// //   }
// // );
// // UserCommentThunk.js

// export const likeComment = createAsyncThunk(
//   "comment/likeComment",
//   async ({ commentId }, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token"); // or from state if stored elsewhere
//       const res = await axios.put(
//         `http://localhost:5000/api/comment/likeComment/${commentId}`,
//         {}, // No body needed
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       return { commentId, updatedComment: res.data };
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Failed to like comment");
//     }
//   }
// );


// // Edit a comment
// export const editComment = createAsyncThunk(
//   "userComment/editComment",
//   async ({ commentId, content }, thunkAPI) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/comment/editComment/${commentId}`, {
//         method: "PUT",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ content }),
//       });
//       return await res.json();
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// // Delete a comment
// export const deleteComment = createAsyncThunk(
//   "userComment/deleteComment",
//   async (commentId, thunkAPI) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/comment/deleteComment/${commentId}`, {
//         method: "DELETE",
//         credentials: "include",
//       });
//       return await res.json();
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );





// gpt---


import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../api/baseUrl";

// Create a new comment
export const createUserComment = createAsyncThunk(
  "userComment/create",
  async ({ content, postId, userId }, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}/comment/create`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, postId, userId }),
      });
      return await res.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get comments of a post
export const getPostComments = createAsyncThunk(
  "userComment/getPostComments",
  async (postId, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}/comment/getPostComments/${postId}`);
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Like a comment (using fetch instead of axios for consistency)
export const likeComment = createAsyncThunk(
  "userComment/likeComment",
  async ({ commentId }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/comment/likeComment/${commentId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedComment = await res.json();
      return { commentId, updatedComment };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to like comment");
    }
  }
);

// Edit a comment
export const editComment = createAsyncThunk(
  "userComment/editComment",
  async ({ commentId, content }, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}/comment/editComment/${commentId}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      return await res.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete a comment
export const deleteComment = createAsyncThunk(
  "userComment/deleteComment",
  async (commentId, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}/comment/deleteComment/${commentId}`, {
        method: "DELETE",
        credentials: "include",
      });
      return await res.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
