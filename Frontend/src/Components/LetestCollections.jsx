import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { shopDataContext } from "../Contexts/ShopContext";
import Card from "./Card";

function LetestCollections() {
  const { products } = useContext(shopDataContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 8));
  }, [products]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6 text-center">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p
          className="mt-2 font-semibold text-lg drop-shadow-md"
          style={{ color: "#FF6F61" }} 
        >
          Step into Style - New Collection Dropping This Season!
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {latestProducts.map((item, index) => (
          <Card
            key={index}
            name={item.name}
            image={item.image1}
            id={item._id}
            price={item.price}
            className="animate-fadeInUp"
          />
        ))}
      </div>
    </div>
  );
}

export default LetestCollections;

