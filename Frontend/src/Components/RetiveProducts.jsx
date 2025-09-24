import React, { useContext, useEffect, useState } from "react";
import { shopDataContext } from "../Contexts/ShopContext";
import Title from "./Title";
import Card from "./Card";

const NAVY_BLUE = "#1A237E";
const CORAL = "#FF6F61";
const INDIGO = "#536DFE";

function RetiveProducts({ category, subcategory, currentProductId }) {
  const { products } = useContext(shopDataContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productCopy = products.slice();
      productCopy = productCopy.filter((item) => category === item.category);
      productCopy = productCopy.filter((item) => subcategory === item.subcategory);
      productCopy = productCopy.filter((item) => currentProductId !== item._id);
      setRelated(productCopy.slice(0, 4));
    }
  }, [products, category, subcategory, currentProductId]);

  return (
    <div className="mt-12">
      <div>
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6 animate-fadeIn">
        {related.map((item, index) => (
          <Card
            key={item._id}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image1}
            className="animate-fadeInUp"
            style={{ animationDelay: `${index * 0.05}s` }}
          />
        ))}
      </div>
      <style>{`
        @keyframes fadeIn {
          from {opacity: 0;}
          to {opacity: 1;}
        }
        .animate-fadeIn { animation: fadeIn 0.6s both; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: none;}
        }
        .animate-fadeInUp { animation: fadeInUp 0.7s cubic-bezier(.7,.21,.26,.99) both; }
      `}</style>
    </div>
  );
}
export default RetiveProducts;
