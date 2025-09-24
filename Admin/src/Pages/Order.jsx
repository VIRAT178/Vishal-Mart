import React, { useContext, useEffect, useState } from "react";
import { authDataContext } from "../Contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import {
  MdListAlt,
  MdPayment,
  MdDateRange,
  MdOutlineLocalShipping,
} from "react-icons/md";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const { serverUrl } = useContext(authDataContext);

  const statusHandler = async (e, orderId) => {
    const status = e.target.value;
    try {
      const result = await axios.post(
        serverUrl + "/api/order/status",
        { orderId, status },
        { withCredentials: true }
      );
      if (result.data) {
        await fetchAllOrders();
        toast.success(result.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  const fetchAllOrders = async () => {
    try {
      const result = await axios.post(
        serverUrl + "/api/order/list",
        {},
        { withCredentials: true }
      );
      setOrders(result.data.reverse());
    } catch (error) {
      toast.error(error.message || "Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e1e2e] to-[#0f172a] p-8">
      <div className="max-w-6xl mx-auto bg-[#181a2a] rounded-3xl p-8 shadow-2xl">
        <h2 className="flex items-center text-4xl font-bold text-gray-300 mb-10">
          <MdListAlt size={36} className="text-indigo-500 mr-4" />
          All Orders List
        </h2>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500 py-24 text-xl">
            No orders found.
          </p>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-[#252836] rounded-xl shadow-lg p-6 flex flex-col md:flex-row md:justify-between gap-6"
              >
                <div className="flex-1 text-gray-300 font-semibold tracking-wider">
                  <div className="flex flex-wrap gap-3">
                    {order.items.map((item, idx) => (
                      <span key={idx} className="capitalize">
                        {item.name.toUpperCase()} x {item.quantity}{" "}
                        <span className="text-indigo-400 italic text-sm">
                          [{item.size}]
                        </span>
                        {idx !== order.items.length - 1 && ","}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex-1 text-gray-400 text-sm md:text-base leading-relaxed">
                  <p>
                    <span className="font-semibold text-gray-300">Name: </span>
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-300">Address: </span>
                    {order.address.street}, {order.address.city}, {order.address.state},{" "}
                    {order.address.country}, {order.address.pincode}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-300">Phone: </span>
                    {order.address.phone}
                  </p>
                </div>

                {/* Order Details */}
                <div className="flex-1 space-y-3 text-gray-400 text-sm md:text-base">
                  <p className="flex items-center gap-2">
                    <MdPayment className="text-indigo-500" />
                    Payment Method: {order.paymentMethod}
                  </p>
                  <p className="flex items-center gap-2">
                    <MdOutlineLocalShipping className="text-green-500" />
                    Payment Status:{" "}
                    {order.payment ? (
                      <span className="text-green-400 font-semibold">Done</span>
                    ) : (
                      <span className="text-red-500 font-semibold">Pending</span>
                    )}
                  </p>
                  <p className="flex items-center gap-2">
                    <MdDateRange className="text-purple-500" />
                    Date: {new Date(order.date).toLocaleDateString()}
                  </p>
                  <p className="text-indigo-400 font-bold text-lg">
                    Total: ₹ {order.amount}
                  </p>
                </div>

                {/* Status selector */}
                <div className="flex items-center">
                  <select
                    value={order.status}
                    onChange={(e) => statusHandler(e, order._id)}
                    className="py-2 px-5 rounded-lg border border-gray-600 bg-[#1e1e2e] text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  >
                    <option>Order Placed</option>
                    <option>Packing</option>
                    <option>Shipped</option>
                    <option>Out for delivery</option>
                    <option>Delivered</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
