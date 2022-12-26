import {
  AddBusiness,
  Cake,
  Category,
  Dashboard,
  Egg,
  FoodBank,
  Inventory,
  Kitchen,
  ListAlt,
  PeopleAlt,
  ReceiptLong,
  ShoppingBag,
  Workspaces,
} from "@mui/icons-material"

const sidebarData = [
  {
    title: "Dashboard",
    icon: <Dashboard />,
    path: "/admin/main",
  },
  {
    title: "Users",
    icon: <PeopleAlt />,
    path: "users",
  },
  {
    title: "Suppliers",
    icon: <AddBusiness />,
    path: "suppliers",
  },
  {
    title: "Purchases",
    icon: <ShoppingBag />,
    path: "purchases",
  },
  {
    title: "MangeIngredients",
    icon: <Kitchen />,
    items: [
      {
        title: "Ingredient Categories",
        icon: <Category />,
        path: "ingredient-categories",
      },
      {
        title: "Ingredients",
        icon: <Egg />,
        path: "ingredients",
      },
      //{
      //  title: "Ingredient Inventory",
      //  icon: <ReceiptLong />,
      //  path: "ingredient-inventory",
      //},
    ],
  },
  {
    title: "ManageProducts",
    icon: <FoodBank />,
    items: [
      {
        title: "Product Categories",
        icon: <Workspaces />,
        path: "product-categories",
      },
      {
        title: "Products",
        icon: <Cake />,
        path: "manage-products",
      },
      //{
      //  title: "Product Inventory",
      //  icon: <Inventory />,
      //  path: "product-inventory",
      //},
    ],
  },

  {
    title: "actionsLog",
    icon: <ListAlt />,
    path: "actions-log",
  },
]

export default sidebarData
