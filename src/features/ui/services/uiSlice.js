import { createSlice } from "@reduxjs/toolkit"
console.log(JSON.parse(localStorage.getItem("isDarkMode")))
const initialState = {
  isDarkMode: !!JSON.parse(localStorage.getItem("isDarkMode")),
  isSideBarOpen: false,
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleThemeMode(state) {
      state.isDarkMode = !state.isDarkMode
    },
    toggleSideBar(state) {
      state.isSideBarOpen = !state.isSideBarOpen
    },
  },
})

export const { toggleThemeMode, toggleSideBar } = uiSlice.actions

export default uiSlice.reducer

export const selectIsDarkMode = (state) => state.ui.isDarkMode
export const selectIsSideBarOpen = (state) => state.ui.isSideBarOpen
