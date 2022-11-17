import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import HeaderReducer from "~/components/Header/HeaderSlice";
import PageHomeReducer from "~/pages/HomePage/HomeSlice";
import userReducer from "./userSlice";
import postReducer from "./postSlice";
import userPageReducer from "~/pages/UserPage/userPageSlice";

const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    posts: postReducer,
    header: HeaderReducer,
    pageHome: PageHomeReducer,
    userPage: userPageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
