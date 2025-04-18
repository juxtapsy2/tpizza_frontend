import Forgot from "../pages/general/Forgot";
import Home from "../pages/general/Home";
import Login from "../pages/general/Login";
import Register from "../pages/general/Register";

export const publicRoutes = [
    {
      path: "/",
      component: Home,
      roles: [], // Guest route
    },
    {
      path: "/login",
      component: Login,
      roles: [], // Guest route
      authRoute: true,
    },
    {
      path: "/register",
      component: Register,
      roles: [], // Guest route
      authRoute: true,
    },
    {
      path: "/forgot",
      component: Forgot,
      roles: [], // Guest route
      authRoute: true,
    },
];

export const adminRoutes = [
    // {
    //   path: "/admin",
    //   component: Dashboard,
    //   roles: ["Admin"], // Guest route
    //   protected: true,
    // },
    // {
    //   path: "/admin/users",
    //   component: ManageUser,
    //   roles: ["Admin"], // Guest route
    //   protected: true,
    // },
]