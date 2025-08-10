// // src/redux/user/thunk/userThunk.js
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { BASE_URL } from "../api/baseUrl";
// // ✅ Fetch all users
// export const fetchUsersThunk = createAsyncThunk("user/fetchAll", async (_, thunkAPI) => {
//   try {
//     const res = await fetch("http://localhost:5000/api/user/getusers", {
//       method: "GET",
//       credentials: "include",
//     });
//     const data = await res.json();
//     return data.users; // ✅ return only the array
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.message);
//   }
// });

// // Get a single user by ID
// export const getSingleUserThunk = createAsyncThunk(
//   "user/getSingle",
//   async (id, thunkAPI) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/user/${id}`, {
//         method: "GET",
//         credentials: "include",
//       });
//       return await res.json();
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.message);
//     }
//   }
// );

// // ✅ Delete user by ID
// export const deleteUserThunk = createAsyncThunk("user/delete", async (userId, thunkAPI) => {
//   try {
//     const res = await fetch(`http://localhost:5000/api/user/delete/${userId}`, { // <-- Sahi route
//       method: "DELETE",
//       credentials: "include",
//     });
//     return await res.json();
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.message);
//   }
// });

// // ✅ Update user by ID

// // export const updateUserThunk = createAsyncThunk("user/update", async ({ userId, updateData }, thunkAPI) => {
// //   try {
// //     const res = await fetch(`http://localhost:5000/api/user/update/${userId}`, {
// //       method: "PUT",
// //       credentials: "include",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify(updateData),
// //     });
// //     return await res.json();
// //   } catch (err) {
// //     return thunkAPI.rejectWithValue(err.message);
// //   }
// // });


// export const updateUserThunk = createAsyncThunk(
//   "user/update",
//   async ({ userId, updateData }, thunkAPI) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/user/update/${userId}`, {
//         method: "PUT",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updateData),
//       });
//       return await res.json();
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.message);
//     }
//   }
// );


import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../api/baseUrl"; // ✅ path adjust kiya

// ✅ Fetch all users
export const fetchUsersThunk = createAsyncThunk(
  "user/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}/user/getusers`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      return data.users; // ✅ return only the array
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Get a single user by ID
export const getSingleUserThunk = createAsyncThunk(
  "user/getSingle",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}/user/${id}`, {
        method: "GET",
        credentials: "include",
      });
      return await res.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// ✅ Delete user by ID
export const deleteUserThunk = createAsyncThunk(
  "user/delete",
  async (userId, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}/user/delete/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });
      return await res.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// ✅ Update user by ID
export const updateUserThunk = createAsyncThunk(
  "user/update",
  async ({ userId, updateData }, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}/user/update/${userId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });
      return await res.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
