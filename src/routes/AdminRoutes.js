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
import IngredientInventory from "../pages/Admin/IngredientInventory"
import Ingredients from "../pages/Admin/Ingredients"
import ManageProducts from "../pages/Admin/ManageProducts"
import Purchases from "../pages/Admin/Purchases"
import Recipes from "../pages/Admin/Recipes"
import ProductInventory from "../pages/Admin/ProductInventory"

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
                {
                  path: "ingredient-inventory",
                  element: <IngredientInventory />,
                },
                {
                  path: "purchases",
                  element: <Purchases />,
                },
                {
                  path: "ingredients",
                  element: <Ingredients />,
                },
                {
                  path: "recipe",
                  element: <Recipes />,
                },
                {
                  path: "product-inventory",
                  element: <ProductInventory />,
                },
                {
                  path: "manage-products",
                  element: <ManageProducts />,
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
