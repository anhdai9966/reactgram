import { configureStore } from "@reduxjs/toolkit";
import HeaderReducer from "~/layouts/components/Header/HeaderSlice";
import DefaultLayoutReducer from "~/layouts/DefaultLayout/DefaultLayoutSlice";
import PageHomeReducer from "~/pages/Home/PageHomeSlice";

const store = configureStore({
    reducer: {
        header: HeaderReducer,
        pageHome: PageHomeReducer,
        defaultLayout: DefaultLayoutReducer,
    }
})

export default store