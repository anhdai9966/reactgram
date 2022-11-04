import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import HeaderReducer from "~/components/Header/HeaderSlice";
import PageHomeReducer from "~/pages/HomePage/HomeSlice";

const store = configureStore({
    reducer: {
        app: appReducer,
        header: HeaderReducer,
        pageHome: PageHomeReducer,
    }
})

export default store