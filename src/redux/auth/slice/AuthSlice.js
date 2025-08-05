


// redux/auth/slice/authSlice.js

import { createSlice } from "@reduxjs/toolkit";
import {
  signUpThunk,
  signInThunk,
  logoutThunk,
  googleSignInThunk,
} from "../thunk/AuthThunk";

// ✅ Load saved auth state from localStorage
const savedAuth = JSON.parse(localStorage.getItem("auth"));

const initialState = {
  user: savedAuth?.user || null,
  isLoading: false,
  error: null,
  isAuthenticated: savedAuth?.isAuthenticated || false,
  isLoggedIn: savedAuth?.isAuthenticated || false,
  isAdmin: savedAuth?.isAdmin || false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      const user = action.payload.user;
      // const isAdmin = user?.role === "admin";
  const isAdmin = action.payload.isAdmin;
      state.user = user;
      state.isLoggedIn = true;
      state.isAuthenticated = true;
      state.isAdmin = isAdmin;
      // state.isAdmin = isAdmin;
      //  state.isAdmin = action.payload.isAdmin;

      localStorage.setItem(
        "auth",
        JSON.stringify({ user, isAuthenticated: true, isAdmin: action.payload.isAdmin})
      );
    },
    setLogout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.error = null;

      localStorage.removeItem("auth");
    },
  },
  extraReducers: (builder) => {
    builder
      // ➤ Sign Up
      .addCase(signUpThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
          console.log("Login payload:", action.payload); // Add this line
        const user = action.payload.user;
        // state.user = action.payload.user; // Make sure this is set
        // const isAdmin = user?.role === "admin";
         const isAdmin = action.payload.isAdmin;

        state.isLoading = false;
        state.user = user;
        state.isAuthenticated = true;
        state.isLoggedIn = true;
        // state.isAdmin = isAdmin;
//  state.isAdmin = action.payload.isAdmin;
        localStorage.setItem(
          "auth",
          JSON.stringify({ user, isAuthenticated: true, isAdmin :action.payload.isAdmin})
        );
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      // ➤ Sign In
      .addCase(signInThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        const user = action.payload.user;
        const isAdmin = action.payload.isAdmin;
        state.isLoading = false;
        state.user = user;
        state.isAuthenticated = true;
        state.isLoggedIn = true;
        state.isAdmin = isAdmin; // <-- YEH LINE ADD KAREN
        localStorage.setItem(
          "auth",
          JSON.stringify({ user, isAuthenticated: true, isAdmin })
        );
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      // ➤ Google Sign In
      .addCase(googleSignInThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(googleSignInThunk.fulfilled, (state, action) => {
        const user = action.payload.user;
        // const isAdmin = user?.role === "admin";
         const isAdmin = action.payload.isAdmin;

        state.isLoading = false;
        state.user = user;
        state.isAuthenticated = true;
        state.isLoggedIn = true;
        // state.isAdmin = isAdmin;
        //  isAdmin = action.payload.isAdmin;

        localStorage.setItem(
          "auth",
          JSON.stringify({ user, isAuthenticated: true, isAdmin:action.payload.isAdmin })
        );
      })
      .addCase(googleSignInThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Google Sign-in failed";
      })

      // ➤ Logout
      .addCase(logoutThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.isLoggedIn = false;
        state.isAdmin = false;

        localStorage.removeItem("auth");
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Logout failed";
      });
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
