import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync"

import { apiSlice, rtkQueryErrorMiddleware } from "./api/apiSlice"
import { authReducer, tokensMiddleware } from "../features/authentication"
import { langReducer } from "../features/lang"
import { meReducer } from "../features/me"
import { uiReducer } from "../features/ui"
import { listenerMiddleware } from "./middleware/listenerMiddleware"
import { actionLogReducer } from "../features/actionsLog"
import { usersReducer } from "../features/users"
import { suppliersReducer } from "../features/suppliers"

const syncConfig = {
  whitelist: [
    "ui/toggleThemeMode",
    "lang/setLang",
    "auth/postLogin",
    "auth/postLogout",
    "auth/checkLogin",
  ],
}

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    ui: uiReducer,
    lang: langReducer,
    auth: authReducer,
    me: meReducer,
    actionLog: actionLogReducer,
    users: usersReducer,
    suppliers: suppliersReducer,
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
