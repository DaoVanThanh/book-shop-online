import { React } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Shop from "./Shop/Shop";
import About from "./About/About";
import Cart from "./Cart/Cart";
import Policy from "./Policy/Policy";
import Register from "./Register/register";
import Checkout from "./Checkout/Checkout";
import InfoManagemant from "./InfoManagement/InfoManagemant";
import AccountManager from "./AccountManager/AccountManager";
import OrderManagement from "./OrderManagement/OrderManagement";

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
        <Route path="/" element={<InfoManagemant />}>
          <Route path="/info/account" element = {<AccountManager />}></Route>
          <Route path="/info/order" element = {<OrderManagement />}></Route>
        </Route>
    </Routes>
  );
}

export default AppRoutes;
