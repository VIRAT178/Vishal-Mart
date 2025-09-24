import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import { motion } from 'framer-motion';
import Add from './Add';
import Lists from './Lists';
import Order from './Order';
import axios from 'axios';
import { authDataContext } from '../Contexts/AuthContext';
import { MdInventory, MdOutlineShoppingCart } from 'react-icons/md';

export default function Home() {
  const [activePage, setActivePage] = useState('add');
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const { serverUrl } = useContext(authDataContext);

  const fetchCounts = async () => {
    try {
      const products = await axios.get(serverUrl + '/api/product/list', {}, { withCredentials: true });
      setTotalProducts(products.data.length);
      const orders = await axios.post(serverUrl + '/api/order/list', {}, { withCredentials: true });
      setTotalOrders(orders.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white pt-16">
      <aside className="w-16 md:w-64 transition-all duration-300">
        <Sidebar activePage={activePage} onSelect={setActivePage} />
      </aside>
      <div className="flex-1 flex flex-col p-2 md:p-4">
        <Navbar />
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 mt-5 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-white/10 overflow-auto"
        >
          <h1 className="text-cyan-300 text-2xl md:text-4xl font-bold mb-6 flex items-center gap-3">
            Welcome to Vishal Mart Admin
          </h1>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-4 bg-[#1e1e2e] rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow"
            >
              <MdInventory size={40} className="text-cyan-300 animate-pulse" />
              <div>
                <div className="text-lg font-semibold text-gray-300">Total Products</div>
                <div className="text-2xl font-bold text-cyan-300">{totalProducts}</div>
              </div>
            </motion.div>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-4 bg-[#1e1e2e] rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow"
            >
              <MdOutlineShoppingCart size={40} className="text-purple-400 animate-pulse" />
              <div>
                <div className="text-lg font-semibold text-gray-300">Total Orders</div>
                <div className="text-2xl font-bold text-purple-300">{totalOrders}</div>
              </div>
            </motion.div>
          </div>

          {/* Render Main Content */}
          <div className="mt-3">
            {activePage === 'add' && <Add />}
            {activePage === 'lists' && <Lists />}
            {activePage === 'order' && <Order />}
          </div>
        </motion.main>
      </div>
    </div>
  );
}
