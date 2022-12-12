import { useRoutes } from "react-router-dom"

import { RequireAuth } from "../features/authentication"
import FrontLayout from "../layout/FrontLayout"
import {
  ActivateAccount,
  Cart,
  Contacts,
  Favorite,
  ForgetPwd,
  FrontMain,
  Login,
  Products,
  Profile,
  SetUpPwd,
} from "../pages"

const FrontRoutes = () => {
  const routes = useRoutes([
    {
      element: <FrontLayout />,
      children: [
        { index: true, element: <FrontMain /> },
        { path: "login", element: <Login /> },
        { path: "products", element: <Products /> },
        { path: "contacts", element: <Contacts /> },
        {
          path: "forget-password",
          element: <ForgetPwd />,
        },
        {
          path: "setup-password",
          element: <SetUpPwd />,
        },
        {
          path: "activate-account",
          element: <ActivateAccount />,
        },
        {
          element: <RequireAuth />,
          children: [
            { path: "cart", element: <Cart /> },
            { path: "favorite", element: <Favorite /> },

            {
              path: "user-profile",
              element: <Profile />,
            },
          ],
        },
        //TODO error page
        { path: "*", element: <div>error for public</div> },
      ],
    },
  ])
  return routes
}

export default FrontRoutes
