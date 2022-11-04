import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowLoginModal: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setModalLogin(state, action) {
      state.isShowLoginModal = action.payload;
    },
  },
});

export const { setModalLogin } = appSlice.actions;

export default appSlice.reducer;
