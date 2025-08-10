// // redux/auth/thunk/AuthThunk.js

// import { createAsyncThunk } from "@reduxjs/toolkit";

// // Sign Up Thunk
// export const signUpThunk = createAsyncThunk(
//   "auth/signup",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//         credentials: "include",
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Signup failed");
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );


// // Sign In Thunk

// export const signInThunk = createAsyncThunk(
//   "auth/signin",
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/signin", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(credentials),
//         credentials: "include",
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Signin failed");
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Logout Thunk
// export const logoutThunk = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
//   try {
//     const res = await fetch("http://localhost:5000/api/user/signout", {
//       method: "POST",
//       credentials: "include",
//     });

//     const data = await res.json();
//     if (!res.ok) return thunkAPI.rejectWithValue(data.message || "Logout failed");

//     return data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.message || "Logout failed");
//   }
// });





// // google signIN-----------
// export const googleSignInThunk = createAsyncThunk(
//   "auth/googleSignIn",
//   async ({ email, name, profilePhotoUrl }, thunkAPI) => {
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/google", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({ email, name, profilePhotoUrl }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         return thunkAPI.rejectWithValue(data.message || "Google login failed");
//       }

//       return data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.message || "Something went wrong");
//     }
//   }
// );





// redux/auth/thunk/AuthThunk.js



// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { BASE_URL } from "../../api/baseUrl";

// // Sign Up Thunk
// export const signUpThunk = createAsyncThunk(
//   "auth/signup",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//         credentials: "include",
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Signup failed");
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );


// // Sign In Thunk
// export const signInThunk = createAsyncThunk(
//   "auth/signin",
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/signin", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(credentials),
//         credentials: "include",
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Signin failed");

//       // ✅ Store required fields in localStorage
//       localStorage.setItem("auth", JSON.stringify({
//         isAuthenticated: true,
//         isAdmin: data.user?.role === "admin", // change condition as per your backend
//         user: data.user,
//       }));

//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );


// // Logout Thunk
// export const logoutThunk = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
//   try {
//     const res = await fetch("http://localhost:5000/api/user/signout", {
//       method: "POST",
//       credentials: "include",
//     });

//     const data = await res.json();
//     if (!res.ok) return thunkAPI.rejectWithValue(data.message || "Logout failed");

//     // ✅ Clear localStorage on logout
//     localStorage.removeItem("auth");

//     return data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.message || "Logout failed");
//   }
// });




// // google signIN-----------
// export const googleSignInThunk = createAsyncThunk(
//   "auth/googleSignIn",
//   async (googleResponse, thunkAPI) => {
//     try {
//       // Google response se user nikalo
//       const user = googleResponse.users?.[0];
//       if (!user) return thunkAPI.rejectWithValue("Google user not found");

//       // Sirf required fields bhejo
//       const payload = {
//         email: user.email,
//         name: user.displayName,        // yahan user.displayName hamesha milega
//         profilePhotoUrl: user.photoUrl // yahan user.photoUrl hamesha milega
//       };

//       console.log("Google payload:", payload); // <-- Added log statement

//       const res = await fetch("http://localhost:5000/api/auth/google", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       console.log("Google API response:", data); // Log the response from the Google API

//       if (!res.ok) {
//         return thunkAPI.rejectWithValue(data.message || "Google login failed");
//       }

//       return data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.message || "Something went wrong");
//     }
//   }
// );





// gpt---------


import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../api/baseUrl";
// import { BASE_URL } from "../baseURL";

// Sign Up Thunk
export const signUpThunk = createAsyncThunk(
  "auth/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Sign In Thunk
export const signInThunk = createAsyncThunk(

  "auth/signin",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signin failed");

      localStorage.setItem(
        "auth",
        JSON.stringify({
          isAuthenticated: true,
          isAdmin: data.user?.role === "admin",
          user: data.user,
        })
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Logout Thunk
export const logoutThunk = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const res = await fetch(`${BASE_URL}/user/signout`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) return thunkAPI.rejectWithValue(data.message || "Logout failed");

    localStorage.removeItem("auth");
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || "Logout failed");
  }
});

// Google Sign-In Thunk
export const googleSignInThunk = createAsyncThunk(
  "auth/googleSignIn",
  async (googleResponse, thunkAPI) => {
    try {
      const user = googleResponse.users?.[0];
      if (!user) return thunkAPI.rejectWithValue("Google user not found");

      const payload = {
        email: user.email,
        name: user.displayName,
        profilePhotoUrl: user.photoUrl,
      };

      console.log("Google payload:", payload);

      const res = await fetch(`${BASE_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Google API response:", data);

      if (!res.ok) {
        return thunkAPI.rejectWithValue(data.message || "Google login failed");
      }

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Something went wrong");
    }
  }
);
