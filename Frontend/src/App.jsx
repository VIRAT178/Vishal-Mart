import React, { useContext } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Registration from "../src/pages/Registration";
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import Navbar from "../src/Components/Navbar";
import { userDataContext } from "../src/Contexts/userContext";
import Product from "./pages/Product";
import Contect from "./pages/contact";
import About from "./pages/About";
import Collections from "./pages/Collections";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import Ai from "./Components/Ai";

const App = () => {
  const { userData } = useContext(userDataContext);
  const location = useLocation();

  return (
    <>
      <Navbar userData={userData} />
      <div className="pt-[70px]">
        <Routes>
          <Route
            path="/login"
            element={
              userData ? (
                <Navigate to={location.state?.from || "/"} />
              ) : (
                <Login />
              )
            }
          />
          <Route path="/signup" element={
              userData ? (
                <Navigate to={location.state?.from || "/"} />
              ) : (
                <Registration />
              )} />


          <Route path="/" element={userData ? <Home/>:<Navigate to="/login" state={{from: location.pathname}}/>} />

          <Route path="/product" element={userData ? <Product/>:<Navigate to="/login" state={{from: location.pathname}}/>} />

          <Route path="/contect" element={userData ? <Contect/>:<Navigate to="/login" state={{from: location.pathname}}/>} />

          <Route path="/about" element={userData ? <About/>:<Navigate to="/login" state={{from: location.pathname}}/>} />

          <Route path="/collections" element={userData ? <Collections/>:<Navigate to="/login" state={{from: location.pathname}}/>} />
          <Route path="/cart" element={userData ? <Cart/>:<Navigate to="/login" state={{from: location.pathname}}/>} />
          <Route path="/placeorders" element={userData ? <PlaceOrder/>:<Navigate to="/login" state={{from: location.pathname}}/>} />
          <Route path="/orders" element={userData ? <Order/>:<Navigate to="/login" state={{from: location.pathname}}/>} />
          <Route path="/productdetail/:productId" element={userData ? <ProductDetails/>:<Navigate to="/login" state={{from: location.pathname}}/>} />
        </Routes>
        <Ai/>
      </div>
    </>
  );
};

export default App;
