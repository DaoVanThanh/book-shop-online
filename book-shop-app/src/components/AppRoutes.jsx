import { React } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Shop from "./Shop/Shop";
import About from "./About/About";
import Cart from "./Cart/Cart";
import AccountManagement from "./AccountManagement/AccountManagement";
import Policy from "./Policy/Policy";
import Checkout from "./Checkout/Checkout";
import OrderManagement from "./OrderManagement/OrderManagement";
import Register from "./Register/register";
import InfoManagement from "./InfoManagement/InfoManagement";
import ChangePassword from "./ChangePassword/ChangePassword";
import Rate from "./Rate/Rate";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route index element={<Home />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/shop" element={<Shop />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/policy" element={<Policy />}></Route>
      <Route path="/checkout" element={<Checkout />}></Route>
      <Route path="/" element={<InfoManagement />}>
        <Route path="/info/account" element={<AccountManagement />}></Route>
        <Route path="/info/order" element={<OrderManagement />}></Route>
      </Route>
        <Route path="/changePassword" element={<ChangePassword />}></Route>
        <Route path="/rate" element={<Rate />}></Route>
    </Routes>

);
}

export default AppRoutes;
