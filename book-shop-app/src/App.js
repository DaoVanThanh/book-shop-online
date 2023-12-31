import "./App.css";
import React, { useEffect, useState } from "react";
import AppRoutes from "./components/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Admin from "./adminComponents/Admin";
import { jwtDecode } from "jwt-decode";

function App() {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    if (jwtDecode(accessToken).role === "ROLE_ADMIN") {
      return (
        <BrowserRouter>
          <Admin />
        </BrowserRouter>
      );
    }
  }
  return (
    <BrowserRouter>
      <Header />
      <div className="App">
        <AppRoutes />
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
