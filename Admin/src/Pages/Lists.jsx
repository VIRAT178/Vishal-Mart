import React, { useContext, useEffect, useState } from "react";
import { authDataContext } from "../Contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";


const Lists = () => {
  const [list, setList] = useState([]);
  const { serverUrl } = useContext(authDataContext);


  const fetchList = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/product/list");
      if (!result) {
        toast.error("Failed to Get products");
      } else {
        setList(result.data);
        console.log(result.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Server Unreachable");
    }
  };


  const removeProduct = async (id) => {
    try {
      const result = await axios.post(`${serverUrl}/api/product/remove/${id}`, {}, { withCredentials: true });
      toast.success(result.data.message)
      if (result.data) {
        fetchList();
      } else {
        console.log("Failed to remove product");
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchList();
  }, []);


 return (
  <div className="max-w-4xl mx-auto p-4">
    <div className="mb-6">
      <p className="text-2xl font-semibold text-white text-center sm:text-left">All Lists</p>
    </div>


    <div className="space-y-6">
      {list?.length > 0 ? (
        list.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-center sm:items-start border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <img
              src={item.image1}
              alt="Product image"
              className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded-md"
            />
            <div className="flex-grow mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
              <div className="text-lg font-medium text-gray-900">{item.name}</div>
              <div className="text-sm text-gray-600">{item.category}</div>
              <div className="text-md font-semibold text-indigo-600 mt-1">₹{item.price}</div>
            </div>
            <div
              className="text-red-500 cursor-pointer hover:text-red-700 transition-colors mt-4 sm:mt-0 sm:ml-4"
              onClick={() => removeProduct(item._id)}
              title="Delete product"
              role="button"
              tabIndex={0}
              onKeyPress={(e) => { if (e.key === 'Enter') removeProduct(item._id); }}
            >
              <MdDelete size={24} />
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">No Product available</div>
      )}
    </div>
  </div>
);


};


export default Lists;