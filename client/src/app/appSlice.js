import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowLoginModal: false,
  isMountHomePage: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setShowLoginModal(state, action) {
      state.isShowLoginModal = action.payload;
    },
    setMountHomePage(state, action) {
      state.isMountHomePage = action.payload;
    },
  },
});

export const { setShowLoginModal, setMountHomePage } = appSlice.actions;

export default appSlice.reducer;
