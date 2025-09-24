import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { adminDataContext } from "./Contexts/AdminContext";
import Login from "./Pages/Login";
import Registration from "./Pages/Signup";
import Home from "./Pages/Home";
import Add from "./Pages/Add";
import Lists from "./Pages/Lists";
import Order from "./Pages/Order";
import Loading from "./Pages/loading";
import { ToastContainer } from "react-toastify";

function App() {
  const { adminData, loading } = useContext(adminDataContext);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
        {adminData ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Add />} />
            <Route path="/lists" element={<Lists />} />
            <Route path="/order" element={<Order />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
