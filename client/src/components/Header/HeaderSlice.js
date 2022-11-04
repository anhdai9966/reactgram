import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isToggleDropdownMenuProfile: false,
  isToggleDropdownListSearch: false,
  isToggleDropdownListNotification: false,

  isOpenModalPostMedia: false,
  isToggleModalClearAllRecent: false,

  isLoadingSearch: false,
  isToggleSubSidebar: false,
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
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
    setShownModalClearAllRecent(state) {
      state.isToggleModalClearAllRecent = true;
    },
    setIsLoading(state, action) {
      state.isLoadingSearch = action.payload;
    },
  },
});

export const {
  setHiddenAllDropdownHeader,
  setHiddenAllModalHeader,
  setShownDropdownMenuProfile,
  setShownDropdownListSearch,
  setIsLoading,
  setShownDropdownListNotification,
  setShownModalPostMedia,
  setShownModalClearAllRecent,
} = headerSlice.actions;

export default headerSlice.reducer;
