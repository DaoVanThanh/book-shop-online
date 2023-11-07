import "./App.css";
import React from "react";
import AppRoutes from "./components/AppRoutes";
import { BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Admin from "./adminComponents/Admin";

function App() {
  return (
    <BrowserRouter>
      {/*<Header />
      <div className="App">
        <AppRoutes />
      </div>
      <Footer />*/}
      {<Admin /> }
    </BrowserRouter>
  );
}

export default App;
