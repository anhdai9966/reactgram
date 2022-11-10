import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    
    isToggleModalMenuThread: false,
    isToggleModalDetailThead: false,
}

const PageHomeSlice = createSlice({
    name: "pageHome",
    initialState,
    reducers: {
        setHiddenAllModalHome(state) {
            state.isToggleModalMenuThread = false
            state.isToggleModalDetailThead = false
        },
        setShownModalMenuThread(state) {
            state.isToggleModalMenuThread = true
        },
        setShownModalDetailThead(state) {
            state.isToggleModalDetailThead = true
        },
    }
});

export const { setHiddenAllModalHome, setShownModalMenuThread, setShownModalDetailThead } = PageHomeSlice.actions

export default PageHomeSlice.reducer