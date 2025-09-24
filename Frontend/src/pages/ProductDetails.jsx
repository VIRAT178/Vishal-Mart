// ProductDetails.jsx
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { shopDataContext } from "../Contexts/ShopContext";
import { FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import RetiveProducts from "../Components/RetiveProducts";

const NAVY_BLUE = "#1A237E";
const CORAL = "#FF6F61";
const SOFT_GRAY = "#ECEFF1";
const INDIGO = "#536DFE";

function ProductDetails() {
  const { productId } = useParams();
  const { products, currency ,addToCart } = useContext(shopDataContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [size, setSize] = useState("");
  

  useEffect(() => {
    if (products.length === 0) return;
    const item = products.find((prod) => prod._id === productId);
    if (item) {
      setProductData(item);
      setImage1(item.image1);
      setImage2(item.image2);
      setImage3(item.image3);
      setImage4(item.image4);
      setImage(item.image1);
      setSize(item.sizes?.[0] || "");
    }
  }, [productId, products]);

  const [animateImage, setAnimateImage] = useState(false);

  useEffect(() => {
    setAnimateImage(true);
    const t = setTimeout(() => setAnimateImage(false), 400);
    return () => clearTimeout(t);
  }, [image]);

  if (!productData) {
    return <div className="opacity-0"></div>;
  }

  return (
    <div
      className="min-h-screen w-full py-10 px-2 sm:px-8"
      style={{ background: `radial-gradient(circle at 40% 30%, ${SOFT_GRAY}, ${NAVY_BLUE} 80%, ${CORAL} 120%)` }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start animate-fadeIn">
        <div className="flex flex-col sm:flex-row gap-8 w-full">
          <div className="flex flex-row sm:flex-col items-center gap-3 sm:gap-4">
            {[image1, image2, image3, image4].map(
              (img, i) =>
                img && (
                  <img
                    key={i}
                    src={img}
                    alt="product-thumbnail"
                    className={`w-16 h-16 rounded-xl border cursor-pointer object-cover transition-all duration-300 hover:scale-105 ${image === img ? "ring-4 ring-[#FF6F61]" : "ring-2 ring-[#ECEFF1]"}`}
                    onClick={() => setImage(img)}
                  />
                )
            )}
          </div>
          <div className="flex-1 flex justify-center items-center py-5">
            <img
              src={image}
              alt="Selected"
              className={`max-h-[340px] w-full object-contain rounded-3xl shadow-xl border-4 transition-all duration-700 bg-white animate__animated ${animateImage ? "animate__pulse" : ""}`}
              style={{ borderColor: CORAL, background: "#fff" }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 md:gap-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide uppercase text-[#1A237E] animate-fadeInUp">
            {productData.name}
          </h1>
          <div className="flex items-center gap-2" style={{ color: CORAL }}>
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <FaStarHalfAlt />
            <p className="ml-2 text-base text-[#37474F]">(124)</p>
          </div>
          <p className="text-2xl font-bold" style={{ color: CORAL }}>
            {currency} {productData.price}
          </p>
          <p className="text-base text-[#37474F]">{productData.description}</p>
          <div className="mb-2">
            <p className="mb-2 font-semibold text-[#1A237E]">Select Size</p>
            <div className="flex gap-2">
              {productData.sizes?.map((item, index) => (
                <button
                  key={index}
                  className={`rounded-lg border-2 px-4 py-2 font-semibold transition-all duration-300 ${
                    item === size
                      ? "bg-[#ff6f61] text-white border-[#ff6f61] shadow-lg scale-105"
                      : "bg-[#ECEFF1] text-[#1A237E] border-[#536DFE] hover:border-[#ff6f61] hover:text-[#ff6f61]"
                  }`}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            className="mt-3 w-full sm:w-56 bg-[#FF6F61] hover:bg-[#e45044] text-white font-semibold py-3 px-8 rounded-xl shadow-xl transition duration-300 scale-100 hover:scale-105 text-lg animate-fadeIn"
            onClick={()=>addToCart(productData._id , size)}
          >
            ADD TO CART
          </button>
          <div className="mt-5 bg-[#eceff1] bg-opacity-70 rounded-xl p-4 text-[#1A237E] text-sm font-medium shadow-md flex flex-col gap-1">
            <p>100% Original Product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Fast return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-10 flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="border-b border-[#536DFE] pb-4 flex gap-10">
            <p className="font-bold text-[#1A237E] cursor-pointer transition-all hover:text-[#FF6F61]">
              Description
            </p>
            <p className="font-bold text-[#1A237E] cursor-pointer transition-all hover:text-[#FF6F61]">
              Reviews (124)
            </p>
          </div>
          <div className="mt-4 text-base text-[#37474F] animate-fadeInUp">
            <p>
              Upgrade your wardrobe with this stylish slim-fit cotton shirt, available now on Vishal Mart. Crafted from breathable high-quality fabric, it offers all-day comfort and effortless style. Easy to maintain and perfect for any setting, this shirt is a must-have essential for those who value both fashion and function.
            </p>
          </div>
        </div>
      </div>
      <RetiveProducts
        category={productData.category}
        subcategory={productData.subcategory}
        currentProductId={productData._id}
      />
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
        .animate__animated {animation-duration: 0.6s;}
        .animate__pulse {animation-name: pulse;}
        @keyframes pulse {
          0% {transform: scale(1);}
          50% {transform: scale(1.08);}
          100% {transform: scale(1);}
        }
      `}</style>
    </div>
  );
}
export default ProductDetails;
