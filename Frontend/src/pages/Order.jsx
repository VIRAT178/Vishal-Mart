import React, { useContext, useEffect, useState } from "react";
import Title from "../Components/Title";
import { shopDataContext } from "../Contexts/ShopContext";
import { authDataContext } from "../Contexts/AuthContext";
import axios from "axios";
import { MdLocalShipping, MdPayment, MdCalendarToday, MdRefresh } from "react-icons/md";

const Order = () => {
  const [orderData, setOrderData] = useState([]);
  const { currency } = useContext(shopDataContext);
  const { serverUrl } = useContext(authDataContext);

  const loadOrderData = async () => {
    try {
      const result = await axios.post(serverUrl + "/api/order/userorder", {}, { withCredentials: true });
      if (result.data) {
        let allOrderItem = [];
        result.data.forEach((order) => {
          order.items.forEach((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrderItem.push(item);
          });
        });
        setOrderData(allOrderItem.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-white to-pink-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8 animate-fade-in">
        <Title text1={"MY"} text2={"ORDER"} />

        <div className="mt-6 space-y-6">
          {orderData.length === 0 && (
            <p className="text-center text-gray-500">No orders found.</p>
          )}
          {orderData.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-r from-white to-blue-50">
              <img
                src={item.image1}
                alt={item.name}
                className="w-32 h-32 rounded-lg object-cover border border-gray-300"
                loading="lazy"
              />

              <div className="flex-1 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-gray-700">
                    <p><span className="font-medium">Price:</span> {currency}{item.price}</p>
                    <p><span className="font-medium">Quantity:</span> {item.quantity}</p>
                    <p><span className="font-medium">Size:</span> {item.size}</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
                  <div className="flex items-center gap-2">
                    <MdCalendarToday className="text-blue-500 text-2xl" />
                    <span>Date: {new Date(item.date).toDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdPayment className="text-purple-500 text-2xl" />
                    <span>Payment Method: {item.paymentMethod}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdLocalShipping className="text-green-500 text-2xl" />
                    <span>Status: {item.status}</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-4">

                  <button
                    onClick={loadOrderData}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-400 to-pink-500 hover:from-pink-500 hover:to-blue-400 text-white px-6 py-3 rounded-xl shadow-lg font-semibold transition-transform transform hover:scale-105"
                  >
                    <MdRefresh className="animate-spin" />
                    Refresh Orders
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
