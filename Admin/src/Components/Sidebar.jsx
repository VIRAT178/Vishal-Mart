// Sidebar.jsx
import React from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { FaList } from 'react-icons/fa';
import { SiTicktick } from 'react-icons/si';
import { motion } from 'framer-motion';

const menuItems = [
  { label: 'Add Items', icon: IoIosAddCircleOutline, key: 'add' },
  { label: 'List Items', icon: FaList, key: 'lists' },
  { label: 'View Orders', icon: SiTicktick, key: 'order' },
];

export default function Sidebar({ activePage, onSelect }) {
  return (
    <nav className="flex flex-col items-center md:items-start p-4 h-full min-h-screen bg-white/10 backdrop-blur-lg shadow-lg border-r border-white/10">
      {menuItems.map(({ label, icon: Icon, key }) => (
        <motion.button
          key={key}
          onClick={() => onSelect(key)}
          className={`flex items-center w-full mb-4 rounded-lg py-2 transition-all focus:outline-none ${
            activePage === key
              ? 'bg-cyan-500/40 text-white'
              : 'text-cyan-300 hover:bg-cyan-500/20'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-current={activePage === key ? 'page' : undefined}
        >
          <Icon size={24} />
          <span className="ml-3 hidden md:inline">{label}</span>
        </motion.button>
      ))}
    </nav>
  );
}
