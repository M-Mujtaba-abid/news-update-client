
// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice/AuthSlice";
import userReducer from "../redux/user/UserSlice";
import postReducer from "../redux/post/PostSlice";
import userPostReducer from "../redux/userSidePost/UserPostSlice";
import userCommentReducer from "../redux/userSidecomment/UserCommentSlice";

;

// LocalStorage se state load karne ka function
function loadState() {
  try {
    const serializedState = localStorage.getItem("auth");
    if (serializedState === null) {
      return undefined;
    }
    const auth = JSON.parse(serializedState);
    return { auth }; // key name reducer ke naam jaisa hona chahiye
  } catch (err) {
    return undefined;
  }
}

const store = configureStore({
  reducer: {
    auth: authReducer,
     user: userReducer,
     post: postReducer,
     userPosts: userPostReducer,
      userComment: userCommentReducer,
      
  },
  preloadedState: loadState(), // <-- yahan se localStorage se state load hogi
});

export default store;
