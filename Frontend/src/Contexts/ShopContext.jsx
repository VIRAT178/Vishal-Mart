import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import { userDataContext } from "./userContext";

export const shopDataContext = createContext();
function ShopContext({ children }) {
  const [products, setProducts] = useState([]);
  const [cardItem, setCardItem] = useState({});
  const { serverUrl } = useContext(authDataContext);
  const { userData } = useContext(userDataContext);
  const currency = "₹";
  const delivery_fee = 40;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const getProducts = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/product/list");
      if (!result) {
        toast.error("Failed to Get products");
      } else {
        setProducts(result.data);
        console.log(result.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Server Unreachable");
    }
  };

  const addToCart = async (itemId, size) => {
    if (!size) {
      console.log("Select product size");
      toast.error("Please select Product size");
      return;
    }
    let cardData = structuredClone(cardItem);
    if (cardData[itemId]) {
      if (cardData[itemId][size]) {
        cardData[itemId][size] += 1;
      } else {
        cardData[itemId][size] = 1;
      }
    } else {
      cardData[itemId] = {};
      cardData[itemId][size] = 1;
    }
    setCardItem(cardData);
    if (userData) {
      try {
        await axios.post(
          serverUrl + "/api/cart/add",
          { itemId, size },
          { withCredentials: true }
        );
        toast.success("Added to cart");
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };
  const updateQuantity = async (itemId, size, quantity) => {
    let cardData = structuredClone(cardItem);
    cardData[itemId][size] = quantity;
    setCardItem(cardData)
   if (userData) {
     try {
      await axios.post(serverUrl + '/api/cart/update',{itemId,size,quantity},{withCredentials:true})
      toast.success("Cart updated successfully")
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
   }
  }

  const getUserCart = async () => {
    try {
      const result = await axios.post(
        serverUrl + "/api/cart/get",
        {},
        { withCredentials: true }
      );
      setCardItem(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cardItem) {
      for (const item in cardItem[items]) {
        try {
          if (cardItem[items][item] > 0) {
            totalCount += cardItem[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalCount;
  };
  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    getUserCart();
  }, [userData]);

  const getCartAmount =  () => {
    let totalAmount = 0 ;
    for(const items in cardItem){
      let itemInfo = products.find((product)=> product._id === items);
      for(const item in cardItem[items]){
        try {
          if (cardItem[items][item]>0) {
            totalAmount += itemInfo.price * cardItem[items][item];
          }
        } catch (error) {
          
        }
      }
    }
    return totalAmount;
  }
  const value = {
    products,
    setProducts,
    getProducts,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    getCartCount,
    addToCart,
    cardItem,
    setCardItem,
    setShowSearch,
    updateQuantity,
    getCartAmount
  };
  return (
    <div>
      <shopDataContext.Provider value={value}>
        {children}
      </shopDataContext.Provider>
    </div>
  );
}

export default ShopContext;
