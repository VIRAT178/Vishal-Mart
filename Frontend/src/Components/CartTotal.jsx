import React, { useContext } from "react";
import { shopDataContext } from "../Contexts/ShopContext";
import Title from "./Title";

const NAVY_BLUE = "#1A237E";
const SOFT_GRAY = "#ECEFF1";
const CORAL = "#FF6F61";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(shopDataContext);
  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;
  return (
    <div
      className="w-full max-w-sm p-6 bg-white rounded-xl shadow-lg animate-fadeIn"
      style={{ border: `2px solid ${CORAL}` }}
    >
      <Title text1={"CART"} text2={"TOTALS"} />
      <div className="flex justify-between py-2 text-[#1A237E] font-semibold text-lg">
        <span>Subtotal</span>
        <span>{currency}{subtotal}.00</span>
      </div>
      <hr className="border-gray-300" />
      <div className="flex justify-between py-2 text-[#1A237E] font-semibold text-lg">
        <span>Shipping Fee</span>
        <span>{currency} {delivery_fee}.00</span>
      </div>
      <hr className="border-gray-300" />
      <div className="flex justify-between py-3 text-[#FF6F61] font-extrabold text-xl">
        <span>Total</span>
        <span>{currency} {total}</span>
      </div>
      <style>{`
        @keyframes fadeIn {
          from {opacity: 0;}
          to {opacity: 1;}
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default CartTotal;
