import React, { useContext } from 'react';
import { shopDataContext } from '../Contexts/ShopContext';
import { useNavigate } from 'react-router-dom';

function Card({ name, image, price, id, className }) {
  const { currency } = useContext(shopDataContext);
  const navigate = useNavigate()
  return (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl ${className} relative group`}
      tabIndex={0}
      aria-labelledby={`card-title-${id}`}
      role="button"
      onClick={()=>navigate(`/productdetail/${id}`)}
    >
      <div className="overflow-hidden rounded-t-xl">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      <div className="p-4">
        <h3
          id={`card-title-${id}`}
          className="text-lg font-semibold text-gray-900 truncate"
          title={name}
        >
          {name}
        </h3>
        <p className="mt-2 text-indigo-600 font-bold text-lg">
          {currency}
          {price}
        </p>
      </div>
    </div>
  );
}

export default Card;
