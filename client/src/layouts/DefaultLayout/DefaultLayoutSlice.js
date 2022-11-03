import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShownModalLogin: false,
};

const defaultLayoutSlice = createSlice({
  name: "defaultLayout",
  initialState,
  reducers: {
    setModalLogin(state, action) {
      state.isShownModalLogin = action.payload;
    },
  },
});

export const { setModalLogin } = defaultLayoutSlice.actions;

export default defaultLayoutSlice.reducer;
