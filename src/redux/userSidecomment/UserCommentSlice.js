import { createSlice } from "@reduxjs/toolkit";
import {
  createUserComment,
  getPostComments,
  likeComment,
  editComment,
  deleteComment
} from "./UserCommentThunk";

const userCommentSlice = createSlice({
  name: "userComment",
  initialState: {
    comments: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // CREATE COMMENT
      .addCase(createUserComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.unshift(action.payload);
        state.successMessage = "Comment created successfully";
      })
      .addCase(createUserComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET COMMENTS
      .addCase(getPostComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPostComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = Array.isArray(action.payload)
          ? action.payload
          : action.payload.comments || [];
      })
      .addCase(getPostComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LIKE COMMENT
      .addCase(likeComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likeComment.fulfilled, (state, action) => {
        state.loading = false;
        const { commentId, updatedComment } = action.payload;
        const index = state.comments.findIndex((c) => c._id === commentId);
        if (index !== -1) {
          state.comments[index] = updatedComment;
        }
      })
      .addCase(likeComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // EDIT COMMENT
      .addCase(editComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(editComment.fulfilled, (state, action) => {
        state.loading = false;
        const editedComment = action.payload;
        const index = state.comments.findIndex((c) => c._id === editedComment._id);
        if (index !== -1) {
          state.comments[index] = editedComment;
        }
      })
      .addCase(editComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE COMMENT
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.payload;
        state.comments = state.comments.filter((c) => c._id !== deletedId);
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userCommentSlice.reducer;