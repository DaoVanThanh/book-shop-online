import { React } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Shop from "./Shop/Shop";

function AppRoutes() {
  return (
    <Routes>
        <Route index element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
    </Routes>
  );
}

export default AppRoutes;
