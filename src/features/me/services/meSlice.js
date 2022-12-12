import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentUser: null,
}

const meSlice = createSlice({
  name: "me",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      if (action?.payload?.success && action?.payload?.user) {
        state.currentUser = action.payload.user
      }
    },
  },
})

export const { setCurrentUser } = meSlice.actions

export default meSlice.reducer

export const selectCurrentUser = (state) => state.me.currentUser
