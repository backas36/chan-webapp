//import { useRoutes } from "react-router-dom"

//import AdminHome, { AdminMain, Users } from "../pages/admin"
//import Profile from "../pages/Shared/Profile"
//import { RequireAdminAuth, RequireAuth } from "../common/auth"

//const AdminRoutes = () => {
//  const routes = useRoutes([
//    {
//      element: <AdminHome />,
//      children: [
//        {
//          element: <RequireAuth />,
//          children: [
//            {
//              element: <RequireAdminAuth />,
//              children: [
//                {
//                  index: true,
//                  path: "main",
//                  element: <AdminMain />,
//                },
//                { path: "user-profile", element: <Profile /> },
//                { path: "users", element: <Users /> },
//                { path: "create-user", element: <Profile isCreate={true} /> },
//              ],
//            },
//          ],
//        },
//        { path: "*", element: <div>error page for admin page</div> },
//      ],
//    },
//  ])
//  return routes
//}

//export default AdminRoutes
