import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowClearAllRecentModal: false,
  //
  isToggleDropdownMenuProfile: false,
  isToggleDropdownListSearch: false,
  isToggleDropdownListNotification: false,

  isOpenModalPostMedia: false,

  isLoadingSearch: false,
  isToggleSubSidebar: false,
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setIsShowClearAllRecentModal(state, action) {
      state.isShowClearAllRecentModal = action.payload;
    },
    // 
    setHiddenAllDropdownHeader(state) {
      state.isToggleDropdownMenuProfile = false;
      state.isToggleDropdownListSearch = false;
      state.isToggleDropdownListNotification = false;
    },
    setHiddenAllModalHeader(state) {
      state.isOpenModalPostMedia = false;
      state.isToggleModalClearAllRecent = false;
    },
    setShownDropdownMenuProfile(state) {
      state.isToggleDropdownMenuProfile = true;
    },
    setShownDropdownListSearch(state) {
      state.isToggleDropdownListSearch = true;
    },
    setShownDropdownListNotification(state) {
      state.isToggleDropdownListNotification = true;
    },
    setShownModalPostMedia(state) {
      state.isOpenModalPostMedia = true;
    },
    setIsLoading(state, action) {
      state.isLoadingSearch = action.payload;
    },
  },
});

export const {
  setIsShowClearAllRecentModal,
  //
  setHiddenAllDropdownHeader,
  setHiddenAllModalHeader,
  setShownDropdownMenuProfile,
  setShownDropdownListSearch,
  setIsLoading,
  setShownDropdownListNotification,
  setShownModalPostMedia,
} = headerSlice.actions;

export default headerSlice.reducer;
