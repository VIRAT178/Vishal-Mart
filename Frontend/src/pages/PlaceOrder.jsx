import React, { useContext, useState } from "react";
import Title from "../Components/Title";
import { MdPlace, MdEmail, MdPhone, MdHome, MdPerson } from "react-icons/md";
import CartTotal from "../Components/CartTotal";
import { SiRazorpay } from "react-icons/si";
import { shopDataContext } from "../Contexts/ShopContext";
import { toast } from "react-toastify";
import { authDataContext } from "../Contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PlaceOrder() {
  const [method, setMethod] = useState("cod");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { cardItem, setCardItem, getCartAmount, delivery_fee, products } =
    useContext(shopDataContext);

  const { serverUrl } = useContext(authDataContext);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm((data) => ({ ...data, [name]: value }));
  };

  const initpay = (order) => {
    if (!window.Razorpay) {
      toast.error("Razorpay SDK failed to load");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order payment",
      description: "Order Payment",
      order_id: order.id,
      handler: async (response) => {
        console.log("Payment Success:", response);
        toast.success("Payment Successful!");
        const {data} = await axios.post(serverUrl + '/api/order/verifyOrder',response,{withCredentials:true})
        if (data) {
          navigate("/orders");
          setCardItem({});
        }
      },
      prefill: {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        contact: form.phone,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      console.log("cartItem:", cardItem);
      console.log("products:", products);

      let orderItems = [];
      for (const items in cardItem) {
        for (const item in cardItem[items]) {
          if (cardItem[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cardItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: form,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };
      switch (method) {
        case "cod":
          const result = await axios.post(
            serverUrl + "/api/order/placeorder",
            orderData,
            { withCredentials: true }
          );
          console.log(result.data);
          if (result) {
            setCardItem({});
            navigate("/orders");
          } else {
            console.log(result.data.message);
          }
          break;
        case "razorpay":
          const resultrazorpay = await axios.post(
            serverUrl + "/api/order/placeorderbyrazorpay",
            orderData,
            { withCredentials: true }
          );
          if (resultrazorpay.data) {
            initpay(resultrazorpay.data);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-white to-pink-100 flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">
        <form
          onSubmit={handleSubmit}
          className="flex-1 bg-white rounded-3xl shadow-2xl p-8 flex flex-col gap-6 animate-fade-in"
        >
          <div className="flex justify-center">
            <Title text1="DELIVERY" text2="INFORMATION" />
          </div>
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex-1 relative">
              <MdPerson className="absolute top-3 left-3 text-blue-400 text-xl" />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="input input-bordered pl-10 py-2 w-full rounded-lg shadow-sm focus:ring-2 ring-blue-200"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1 relative">
              <MdPerson className="absolute top-3 left-3 text-purple-400 text-xl" />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="input input-bordered pl-10 py-2 w-full rounded-lg shadow-sm focus:ring-2 ring-purple-200"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="relative">
            <MdEmail className="absolute top-3 left-3 text-orange-400 text-xl" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="input input-bordered pl-10 py-2 w-full rounded-lg shadow-sm focus:ring-2 ring-orange-200"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="relative">
            <MdHome className="absolute top-3 left-3 text-green-400 text-xl" />
            <input
              type="text"
              name="street"
              placeholder="Street"
              className="input input-bordered pl-10 py-2 w-full rounded-lg shadow-sm focus:ring-2 ring-green-200"
              value={form.street}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-4 flex-col md:flex-row">
            <input
              type="text"
              name="city"
              placeholder="City"
              className="input input-bordered py-2 w-full rounded-lg shadow-sm focus:ring-2 ring-gray-200"
              value={form.city}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              className="input input-bordered py-2 w-full rounded-lg shadow-sm focus:ring-2 ring-gray-200"
              value={form.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-4 flex-col md:flex-row">
            <input
              type="number"
              name="pincode"
              placeholder="Pincode"
              className="input input-bordered py-2 w-full rounded-lg shadow-sm focus:ring-2 ring-pink-200"
              value={form.pincode}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              className="input input-bordered py-2 w-full rounded-lg shadow-sm focus:ring-2 ring-yellow-200"
              value={form.country}
              onChange={handleChange}
              required
            />
          </div>
          <div className="relative">
            <MdPhone className="absolute top-3 left-3 text-teal-400 text-xl" />
            <input
              type="number"
              name="phone"
              placeholder="Phone"
              className="input input-bordered pl-10 py-2 w-full rounded-lg shadow-sm focus:ring-2 ring-teal-200"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              className="flex items-center gap-2 bg-gradient-to-r from-blue-400 to-pink-400 text-white py-3 px-8 rounded-lg shadow-lg font-bold text-lg transform hover:scale-105 transition-transform duration-200"
              type="submit"
            >
              <MdPlace className="text-2xl animate-bounce" />
              PLACE ORDER
            </button>
          </div>
        </form>

        <div className="w-full md:w-96 flex flex-col gap-6">
          <CartTotal />

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <Title text1={"PAYMENT"} text2={"METHOD"} />
            <div className="flex flex-col gap-4 mt-4">
              <button
                onClick={() => setMethod("razorpay")}
                className={`flex items-center gap-3 py-3 px-5 rounded-lg border text-lg font-semibold transition-colors duration-200 ${
                  method === "razorpay"
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                }`}
              >
                <SiRazorpay size={26} />
                Razorpay
              </button>
              <button
                onClick={() => setMethod("cod")}
                className={`py-3 px-5 rounded-lg border text-lg font-semibold transition-colors duration-200 ${
                  method === "cod"
                    ? "bg-pink-600 text-white border-pink-600 shadow-lg"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-pink-50"
                }`}
              >
                Cash On Delivery
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
