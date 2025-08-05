// src/redux/user/slice/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUsersThunk,
  deleteUserThunk,
  updateUserThunk,
  getSingleUserThunk,
} from "../../redux/user/UserThunk";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    isLoading: false,
    error: null,
    singleUser: null,

  },
  reducers: {},
  extraReducers: (builder) => {
    // ✅ Fetch Users
    builder
      .addCase(fetchUsersThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

    //   fetch by id detail page --------

.addCase(getSingleUserThunk.pending, (state) => {
  state.isLoading = true;
  state.error = null;
})
.addCase(getSingleUserThunk.fulfilled, (state, action) => {
  state.isLoading = false;
  state.singleUser = action.payload;
})
.addCase(getSingleUserThunk.rejected, (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
})



      // ✅ Delete User
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user._id !== action.payload._id);
      })

      // ✅ Update User
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user._id === action.payload._id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  },
});

export default userSlice.reducer;
