import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { shopDataContext } from "../Contexts/ShopContext";
import Card from "./Card";

function Bestseller() {
  const { products } = useContext(shopDataContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const filterProduct = products.filter((item) => item.bestSeller);
    setBestSeller(filterProduct.slice(0, 4));
  }, [products]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <div className="text-center mb-4">
        <Title text1={"BEST"} text2={"SELLER"} />
        <p
          className="mt-2 font-semibold text-lg drop-shadow-md"
          style={{ color: "#FF6F61" }}
        >
          Tried, Tested, Loved — Discover Our All-Time Best Sellers.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        {bestSeller.map((item, index) => (
          <Card
            key={item._id || index}
            name={item.name}
            id={item._id}
            price={item.price}
            image={item.image1}
            className="animate-fadeInUp"
          />
        ))}
      </div>
    </div>
  );
}

export default Bestseller;
