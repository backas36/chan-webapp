import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { disableReactDevTools } from "@fvilers/disable-react-devtools"

import App from "./App"
import store from "./services/store/store"
import "./lib/i18n"
if (process.env.NODE_ENV === "production") {
  disableReactDevTools()
}
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
