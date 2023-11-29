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
import Register from "./Register/Register";
import InfoManagement from "./InfoManagement/InfoManagement";
import ChangePassword from "./ChangePassword/ChangePassword";
import Rate from "./Rate/Rate";
import NotFound from "./NotFound/NotFound";
import BookDetail from "./BookDetail/BookDetail";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:bookId" element={<BookDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/" element={<InfoManagement />}>
        <Route path="/user/account" element={<AccountManagement />} />
        <Route path="/user/order" element={<OrderManagement />} />
        <Route path="/user/changePassword" element={<ChangePassword />} />
      </Route>
      <Route path="/rate" element={<Rate />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
