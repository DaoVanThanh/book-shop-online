import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleShop = () => {
    navigate("/shop")
  }

  return (
    <div>
      <div onClick={handleLogin}>home</div>
      <div onClick={handleShop}> shop</div>
    </div>
  );
};

export default Home;
