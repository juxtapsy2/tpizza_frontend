import Cart from "../pages/general/Cart";
import Checkout from "../pages/general/Checkout";
import Forgot from "../pages/general/Forgot";
import Home from "../pages/general/Home";
import Login from "../pages/general/Login";
import Profile from "../pages/general/Profile";
import Register from "../pages/general/Register";
import Thanks from "../pages/general/Thanks";
import VerifyEmail from "../pages/general/VerifyEmail";
import Menu from "../pages/general/Menu";
import AdminPage from "../pages/admin/AdminPage";

export const publicRoutes = [
  { path: "/", component: Home, roles: [] }, // Public
  { path: "/login", component: Login, roles: [] },
  { path: "/register", component: Register, roles: [] },
  { path: "/forgot", component: Forgot, roles: [] },
  { path: "/verify-email", component: VerifyEmail, roles: [] },
  { path: "/profile", component: Profile, roles: ["Admin", "User"] },
  { path: "/cart", component: Cart, roles: ["Admin", "User"] },
  { path: "/checkout", component: Checkout, roles: ["Admin", "User"] },
  { path: "/thanks", component: Thanks, roles: [] },
  { path: "/menu", component: Menu, roles: [] },
];

export const adminRoutes = [
    {
      path: "/admin",
      component: AdminPage,
      roles: ["Admin"],
      protected: true,
    },
]