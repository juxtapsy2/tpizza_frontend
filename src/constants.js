import {
    GiShrimp, GiTomato, GiChickenOven, GiFullPizza, GiFruitBowl, GiMeat,
    GiCheeseWedge, GiOlive, GiBarbecue, GiFamilyHouse, GiHotMeal,
    GiHamburger, GiSpiralBottle, GiCakeSlice, GiHealthCapsule, GiPizzaSlice
} from "react-icons/gi";

// Configs for distinguish production and development
export const isDev = process.env.NODE_ENV !== "production";
export const backendURL = isDev ? "http://localhost:8800" : process.env.REACT_APP_BACKEND_URL;

export const BOOKING_OPTIONS = [
    { id: "delivery", label: "Giao tận nơi" },
    { id: "pickup", label: "Đặt đến lấy" },
];

export const NAVLINKS = [
    { label: "Trang chủ", path: "/" },
    { label: "Thực đơn", path: "/menu" },
    { label: "Khuyến mãi", path: "/deals" },
    { label: "Blog", path: "/blog" },
];

export const MENU_ITEMS_BY_ROLE = {
    User: [
      { label: "Hồ sơ cá nhân", path: "/profile" },
      { label: "Lịch sử giao dịch", path: "/orders" },
    ],
    Admin: [
      { label: "Quản lý", path: "/admin/dashboard" },
    ],
};

// Default pre-defined classes for filter
export const PIZZA_CLASSES = [
    { class: "seafood", label: "Pizza Hải Sản", icon: <GiShrimp /> },
    { class: "vegetarian", label: "Pizza Chay", icon: <GiTomato /> },
    { class: "mixed", label: "Pizza Thập Cẩm", icon: <GiFullPizza /> },
    { class: "fruity", label: "Pizza Trái Cây", icon: <GiFruitBowl /> },
    { class: "fresh", label: "Pizza Tươi Mát", icon: <GiOlive /> },
    { class: "meaty", label: "Pizza Thịt", icon: <GiMeat /> },
    { class: "premium", label: "Pizza Cao Cấp", icon: <GiPizzaSlice /> },
    { class: "cheesy", label: "Pizza Phô Mai", icon: <GiCheeseWedge /> },
    { class: "italian", label: "Pizza Ý", icon: <GiOlive /> },
    { class: "chicken", label: "Pizza Gà", icon: <GiChickenOven /> },
    { class: "sweet-savory", label: "Pizza Ngọt Mặn", icon: <GiCakeSlice /> },
    { class: "exotic", label: "Pizza Lạ", icon: <GiSpiralBottle /> },
    { class: "healthy", label: "Pizza Lành Mạnh", icon: <GiHealthCapsule /> },
    { class: "four-seasons", label: "Pizza Bốn Mùa", icon: <GiFullPizza /> },
    { class: "loaded", label: "Pizza Thêm Topping", icon: <GiFullPizza /> },
    { class: "cheeseLovers", label: "Pizza Phô Mai Thêm", icon: <GiCheeseWedge /> },
    { class: "burger-style", label: "Pizza Kiểu Burger", icon: <GiHamburger /> },
    { class: "bbq", label: "Pizza BBQ", icon: <GiBarbecue /> },
    { class: "family", label: "Pizza Dành Cho Gia Đình", icon: <GiFamilyHouse /> },
    { class: "classic", label: "Pizza Cổ Điển", icon: <GiHotMeal /> },
    { class: "colorful", label: "Pizza Màu Sắc", icon: <GiPizzaSlice /> },
];

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/-])[A-Za-z\d!@#$%^&*()_+={}\[\]:;"'<>,.?/-]{8,}$/;

export const PROFILE_TABS = [
    {
      path: "#profile",
      label: "Thông tin",
      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    },
    {
      path: "#transaction",
      label: "Lịch sử giao dịch",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    },
    {
      path: "#policy",
      label: "Chính sách",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    },
];

export const CRUST_STYLE_VN = {
  Thin: "Mỏng",
  Regular: "Vừa",
  Thick: "Dày",
  Stuffed: "Nhồi",
};

export const PIZZA_PRICES = {
  "7-Thin": 99000,
  "7-Regular": 109000,
  "7-Thick": 129000,
  "9-Thin": 149000,
  "9-Regular": 159000,
  "9-Thick": 169000,
  "12-Thin": 229000,
  "12-Regular": 249000,
  "12-Thick": 269000,
};
// Route-related
export const GUEST_ONLY_ROUTES = ["/login", "/register", "/forgot", "/verify-email"];
export const HIDE_NAV_ROUTES = ["/register", ];