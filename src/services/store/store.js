import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync"

import { apiSlice, rtkQueryErrorMiddleware } from "../api/apiSlice"
import { authReducer, tokensMiddleware } from "../../features/authentication"
import { langReducer } from "../../features/lang"
import { meReducer } from "../../features/me"
import { uiReducer } from "../../features/ui"
import { listenerMiddleware } from "../middleware/listenerMiddleware"
import { actionLogReducer } from "../../features/actionsLog"

const syncConfig = {
  whitelist: [
    "ui/toggleThemeMode",
    "lang/setLang",
    "auth/postLogin",
    "auth/postLogout",
    "auth/checkLogin",
  ],
}

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    ui: uiReducer,
    lang: langReducer,
    auth: authReducer,
    me: meReducer,
    actionLog: actionLogReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      rtkQueryErrorMiddleware,
      tokensMiddleware,
      listenerMiddleware.middleware,
      createStateSyncMiddleware(syncConfig)
    ),
  devTools: true, // should false for staging and prod
})

initMessageListener(store)
setupListeners(store.dispatch)

export default store
