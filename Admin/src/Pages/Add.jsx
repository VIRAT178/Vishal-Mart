import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { IoCloudUploadOutline } from "react-icons/io5";
import { authDataContext } from "../Contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { adminDataContext } from "../Contexts/AdminContext";


const imageVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  whileHover: { scale: 1.05, boxShadow: "0 0 8px #0ec7d8" },
};


const Add = () => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const {getCurrentAdmin} = useContext(adminDataContext)
  const { serverUrl } = useContext(authDataContext);


  const handleImageChange = (idx, file) => {
    const newImages = [...images];
    newImages[idx] = file;
    setImages(newImages);
  };


  const handleSizeToggle = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };


const handleAdd = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("bestSeller", bestSeller);
    formData.append("sizes", JSON.stringify(sizes));
    formData.append("image1", images[0]);
    formData.append("image2", images[1]);
    formData.append("image3", images[2]);
    formData.append("image4", images[3]);


    const result = await axios.post(
      serverUrl + "/api/product/addproduct",
      formData,
      { withCredentials: true }
    );


    if (!result) {
      toast.error("Failed to add product");
    } else {
      toast.success(result.data.message);
    }


    if (result.data) {
      setName("");
      setDescription("");
      setImages([null, null, null, null]); 
      setPrice("");
      setBestSeller(false);
      setCategory("Men");
      setSubCategory("Topwear");
    }
    console.log(result);
  } catch (error) {
    console.log(error);
    toast.error("Network error or server unavailable");
  }
};



  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-2xl border border-white/10 mt-8"
    >
      <h2 className="text-cyan-300 text-xl md:text-3xl font-bold mb-6 text-center">
        Add New Product
      </h2>
      <form className="space-y-6" onSubmit={handleAdd}>
        <div>
          <label className="block text-white mb-2 font-medium">
            Upload Images
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <motion.label
                key={idx}
                variants={imageVariants}
                initial="initial"
                animate="animate"
                whileHover="whileHover"
                className="flex flex-col items-center justify-center bg-slate-900 p-4 rounded-xl cursor-pointer border border-cyan-700 hover:bg-cyan-900/20 transition"
              >
                {img ? (
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`Product Upload ${idx + 1}`}
                    className="w-20 h-20 object-cover rounded-lg mb-2"
                  />
                ) : (
                  <IoCloudUploadOutline
                    size={32}
                    className="text-cyan-300 mb-2"
                  />
                )}
                <span className="text-white text-sm">
                  {img ? "Change" : "Upload"}
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleImageChange(idx, e.target.files[0])}
                />
              </motion.label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-white mb-2 font-medium">
            Product Name
          </label>
          <input
            required
            type="text"
            placeholder="Type Product Name"
            className="w-full px-4 py-2 bg-slate-700 text-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 font-semibold"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-white mb-2 font-medium">
            Product Description
          </label>
          <input
            required
            type="text"
            placeholder="Type Product Description"
            className="w-full px-4 py-2 bg-slate-700 text-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-white mb-2 font-medium">
              Product Category
            </label>
            <select
              className="w-full px-3 py-2 bg-slate-800 text-cyan-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-400"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div>
            <label className="block text-white mb-2 font-medium">
              Sub-Category
            </label>
            <select
              className="w-full px-3 py-2 bg-slate-800 text-cyan-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-400"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottom Wear">Bottom Wear</option>
              <option value="Winter Wear">Winter Wear</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-white mb-2 font-medium">
            Product Price (₹)
          </label>
          <input
            required
            type="number"
            placeholder="Product Price ₹"
            className="w-full px-4 py-2 bg-slate-700 text-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-white mb-2 font-medium">
            Product Sizes
          </label>
          <div className="flex flex-wrap gap-3">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <motion.div
                key={size}
                whileTap={{ scale: 0.92 }}
                className={`cursor-pointer px-4 py-2 rounded-full font-semibold ${
                  sizes.includes(size)
                    ? "bg-cyan-400 text-white shadow"
                    : "bg-slate-800 text-cyan-300"
                } transition`}
                onClick={() => handleSizeToggle(size)}
              >
                {size}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="bestSeller"
            checked={bestSeller}
            onChange={(e) => setBestSeller((prev) => !prev)}
            className="accent-cyan-500"
          />
          <label htmlFor="bestSeller" className="text-white">
            Add to Best Seller
          </label>
        </div>


        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          className="w-full py-3 rounded-lg bg-cyan-500 hover:bg-cyan-700 text-white font-bold mt-6 shadow-lg transition"
        >
          Add Product
        </motion.button>
      </form>
    </motion.div>
  );
};


export default Add;