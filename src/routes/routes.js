import Home from "../pages/general/Home";
import Login from "../pages/general/Login";

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