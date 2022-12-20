import { useRoutes } from "react-router-dom"
import AdminLayout from "../layout/AdminLayout"
import { RequireAuth, RequireAdminAuth } from "../features/authentication"
import AdminMain from "../pages/Admin/AdminMain"
import Users from "../pages/Admin/Users"
import Profile from "../pages/Shared/Profile"
import ActionsLog from "../pages/Admin/ActionsLog"
import NotFound from "../components/notify/NotFound"
import Suppliers from "../pages/Admin/Suppliers"
import IngredientCategories from "../pages/Admin/IngredientCategories"
import ProductCategories from "../pages/Admin/ProductCategories"

const AdminRoutes = () => {
  const routes = useRoutes([
    {
      element: <AdminLayout />,
      children: [
        {
          element: <RequireAuth />,
          children: [
            {
              element: <RequireAdminAuth />,
              children: [
                {
                  index: true,
                  path: "main",
                  element: <AdminMain />,
                },
                { path: "user-profile", element: <Profile /> },
                { path: "users", element: <Users /> },
                {
                  path: "actions-log",
                  element: <ActionsLog />,
                },
                {
                  path: "ingredient-categories",
                  element: <IngredientCategories />,
                },
                {
                  path: "product-categories",
                  element: <ProductCategories />,
                },
                {
                  path: "suppliers",
                  element: <Suppliers />,
                },
              ],
            },
          ],
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ])
  return routes
}

export default AdminRoutes
