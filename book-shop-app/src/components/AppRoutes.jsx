import { React } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Shop from "./Shop/Shop";
import About from "./About/About";
import Cart from "./Cart/Cart";
import Policy from "./Policy/Policy";

function AppRoutes() {
  return (
    <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route index element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/policy" element={<Policy />}></Route>
    </Routes>
  );
}

export default AppRoutes;
