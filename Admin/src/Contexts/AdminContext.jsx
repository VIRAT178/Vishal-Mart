import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";

export const adminDataContext = createContext();
function adminContext({children}) {
  const [adminData, setAdminData] = useState(null);
  const { serverUrl } = useContext(authDataContext);

 const [loading, setLoading] = useState(true);

const getCurrentAdmin = async () => {
  try {
    const result = await axios.get(serverUrl + "/api/user/getcurrentadmin", {
      withCredentials: true,
    });
    setAdminData(result.data);
  } catch (error) {
    setAdminData(null);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  getCurrentAdmin();
}, []);

const value = {
  adminData,
  loading,
  setAdminData,
  getCurrentAdmin,
};

  return (
 
      <adminDataContext.Provider value={value}>
        {children}
      </adminDataContext.Provider>
  
  );
}

export default adminContext;
