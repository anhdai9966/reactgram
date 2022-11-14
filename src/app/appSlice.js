import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  isShowLoginModal: false,
  isMountHomePage: false,
  isShowToast: false,
  toastMessage: "",
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
    showToast(state, action) {
      state.isShowToast = true;
      state.toastMessage = action.payload;
    },
    closeToast(state) {
      state.isShowToast = false;
      state.toastMessage = "";
    },
  },
});

export const { setShowLoginModal, setMountHomePage, showToast, closeToast } =
  appSlice.actions;

export default appSlice.reducer;
