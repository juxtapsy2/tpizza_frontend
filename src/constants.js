import {
    GiShrimp, GiTomato, GiChickenOven, GiFullPizza, GiFruitBowl, GiMeat,
    GiCheeseWedge, GiOlive, GiBarbecue, GiFamilyHouse, GiHotMeal,
    GiHamburger, GiSpiralBottle, GiCakeSlice, GiHealthCapsule, GiPizzaSlice
} from "react-icons/gi";

// Configs for differentiating production and development
export const isDev = process.env.NODE_ENV !== "production";
export const backendURL = isDev ? "http://localhost:8800" : process.env.BACKEND_URL;
export const frontendURL = isDev ? "http://localhost:3000" : process.env.FRONTEND_URL;

export const bookingOptions = [
    { id: "delivery", label: "Giao tận nơi" },
    { id: "pickup", label: "Đặt đến lấy" },
];

export const navLinks = [
    { label: "Trang chủ", path: "/" },
    { label: "Thực đơn", path: "/menu" },
    { label: "Khuyến mãi", path: "/deals" },
    { label: "Blog", path: "/blog" },
];

export const pizzaClasses = [
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

  