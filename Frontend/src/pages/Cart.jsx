import React, { useContext, useEffect, useState } from "react";
import Title from "../Components/Title";
import { shopDataContext } from "../Contexts/ShopContext";
import { useNavigate } from "react-router-dom";
import { HiTrash, HiPlus, HiMinus } from "react-icons/hi";
import CartTotal from "../Components/CartTotal";
import { toast } from "react-toastify";

const NAVY_BLUE = "#1A237E";
const SOFT_GRAY = "#ECEFF1";
const CORAL = "#FF6F61";

function Cart() {
  const { products, cardItem, updateQuantity } = useContext(shopDataContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const items in cardItem) {
      for (const item in cardItem[items]) {
        if (cardItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cardItem[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cardItem]);

  const incrementQuantity = (id, size, currentQty) => {
    updateQuantity(id, size, currentQty + 1);
  };
  const decrementQuantity = (id, size, currentQty) => {
    if (currentQty > 1) {
      updateQuantity(id, size, currentQty - 1);
    }
  };

  return (
    <div
      className="min-h-screen w-full px-4 py-10 max-w-7xl mx-auto"
      style={{ backgroundColor: SOFT_GRAY }}
    >
      <Title text1={"YOUR"} text2={"CART"} />
      <div className="flex flex-col gap-6 mt-8">
        {cartData.length === 0 ? (
          <p className="text-center text-lg text-gray-600 animate-fadeIn">Your cart is empty.</p>
        ) : (
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            if (!productData) return null;
            return (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white rounded-xl shadow-md animate-fadeInUp"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <img
                  src={productData.image1}
                  alt={productData.name}
                  className="h-24 w-24 object-cover rounded-lg border border-gray-200"
                />
                <div className="flex-1 flex flex-col justify-center">
                  <p className="font-semibold text-lg text-[#1A237E]">{productData.name}</p>
                  <p className="text-indigo-700 font-semibold">{productData.price}</p>
                  <p className="text-sm text-gray-500 uppercase mt-1">Size: {item.size}</p>
                </div>
                <div className="flex items-center space-x-1 border border-gray-300 rounded-md overflow-hidden">
                  <button
                    onClick={() => decrementQuantity(item._id, item.size, item.quantity)}
                    className="px-3 py-2 bg-[#FF6F61] text-white hover:bg-[#e45044] transition"
                    aria-label="Decrease quantity"
                  >
                    <HiMinus size={20} />
                  </button>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    readOnly
                    className="w-12 text-center border-x border-gray-300 py-2 focus:outline-none"
                  />
                  <button
                    onClick={() => incrementQuantity(item._id, item.size, item.quantity)}
                    className="px-3 py-2 bg-[#FF6F61] text-white hover:bg-[#e45044] transition"
                    aria-label="Increase quantity"
                  >
                    <HiPlus size={20} />
                  </button>
                </div>
                <button
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  aria-label="Remove item"
                  className="p-2 hover:text-white hover:bg-[#FF6F61] rounded-md transition-colors duration-300 flex items-center justify-center"
                  title="Remove item"
                >
                  <HiTrash size={24} />
                </button>
              </div>
            );
          })
        )}
      </div>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <CartTotal />
        <button
          onClick={() => {
            if (cartData.length > 0) {
              navigate("/placeorders");
            } else {
              toast.warn("Cart is Empty");
            }
          }}
          disabled={cartData.length === 0}
          className={`px-6 py-3 font-bold text-white rounded-xl shadow-lg transition-transform duration-300 ${
            cartData.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#FF6F61] hover:bg-[#e45044] hover:scale-105"
          }`}
        >
          PROCEED TO CHECKOUT
        </button>
      </div>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s ease forwards;
        }
      `}</style>
    </div>
  );
}

export default Cart;
