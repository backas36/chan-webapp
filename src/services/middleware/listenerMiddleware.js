import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit"

import { toggleThemeMode } from "../../features/ui"
import { setLang } from "../../features/lang"

export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  matcher: isAnyOf(toggleThemeMode),
  effect: (action, listenerApi) => {
    localStorage.setItem("isDarkMode", listenerApi.getState().ui.isDarkMode)
  },
})

listenerMiddleware.startListening({
  matcher: isAnyOf(setLang),
  effect: (action, listenerApi) => {
    localStorage.setItem("lang", action.payload)
  },
})
