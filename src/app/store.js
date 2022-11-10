import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import HeaderReducer from "~/components/Header/HeaderSlice";
import PageHomeReducer from "~/pages/HomePage/HomeSlice";
import accountReducer from "./accountSlice";

const store = configureStore({
  reducer: {
    app: appReducer,
    account: accountReducer,
    header: HeaderReducer,
    pageHome: PageHomeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
