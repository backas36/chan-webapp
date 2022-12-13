import { createSlice } from "@reduxjs/toolkit"
import i18n from "../../../lib/i18n"
const initialState = {
  defaultLang: localStorage.getItem("lang") || "en",
}

const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    setLang: (state, action) => {
      i18n.changeLanguage(action.payload)
      state.defaultLang = action.payload
    },
  },
})

export const { setLang } = langSlice.actions
export const selectLang = (state) => state.lang.defaultLang
export default langSlice.reducer
