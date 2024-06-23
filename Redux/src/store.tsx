import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./products/operations";

const RootState = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export default RootState;
