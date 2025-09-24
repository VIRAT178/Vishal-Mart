import React, { useContext, useEffect, useState } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";
import Title from "../Components/Title";
import { shopDataContext } from "../Contexts/ShopContext";
import Card from "../Components/Card";

const NAVY_BLUE = "#1A237E";
const SOFT_GRAY = "#ECEFF1";
const CORAL = "#FF6F61";
const INDIGO = "#536DFE";

function Collections() {
  const [showFilter, setShowFilter] = useState(false);
  const { products } = useContext(shopDataContext);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const { showSearch, setShowSearch, search, setSearch } = useContext(shopDataContext);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productCopy = [...products];
    if (showSearch && search) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productCopy = productCopy.filter((item) => category.includes(item.category));
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) => subCategory.includes(item.subCategory));
    }
    if (sortType === "low-high") {
      productCopy.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      productCopy.sort((a, b) => b.price - a.price);
    }
    setFilteredProduct(productCopy);
  };

  useEffect(() => {
    setFilteredProduct(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, sortType, search, showSearch]);

  const allCategories = ["Men", "Women", "Kids"];
  const allSubCategories = ["Topwear", "Bottom Wear", "Winter Wear"];

  return (
    <div
      className="min-h-screen w-full transition-all duration-300 pb-12"
    >
      <div className="sm:hidden w-full sticky top-0 bg-[rgba(236,239,241,0.8)] backdrop-blur-sm z-50 shadow">
        <button
          className="flex w-full items-center justify-center gap-2 font-semibold text-lg py-4"
          style={{ color: CORAL }}
          onClick={() => setShowFilter((prev) => !prev)}
          aria-expanded={showFilter}
          aria-controls="mobile-filter-drawer"
        >
          <FaFilter size={20} />
          Filters
        </button>
      </div>
      {showFilter && (
        <div
          id="mobile-filter-drawer"
          className="sm:hidden w-full bg-[rgba(236,239,241,0.9)] backdrop-blur-lg rounded-lg sticky top-0 shadow-lg z-50 px-5 pt-8 pb-6 transition-all duration-500 ease-in-out animate-fadeIn"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-xl font-bold" style={{ color: NAVY_BLUE }}>Filters</span>
            <button
              className="text-2xl text-gray-500 hover:text-[#FF6F61]"
              onClick={() => setShowFilter(false)}
              aria-label="Close Filters"
            >
              <FaTimes />
            </button>
          </div>

          <p className="font-bold mb-4" style={{ color: NAVY_BLUE }}>Categories</p>
          <div className="flex flex-wrap gap-4 mb-8">
            {allCategories.map((cat) => (
              <label key={cat} className="flex items-center gap-2" style={{ color: "#37474F" }}>
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5"
                  style={{ accentColor: CORAL }}
                  value={cat}
                  onChange={toggleCategory}
                  checked={category.includes(cat)}
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>

          <p className="font-bold mb-4" style={{ color: NAVY_BLUE }}>Sub-categories</p>
          <div className="flex flex-wrap gap-4 mb-2">
            {allSubCategories.map((sub) => (
              <label key={sub} className="flex items-center gap-2" style={{ color: "#37474F" }}>
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5"
                  style={{ accentColor: INDIGO }}
                  value={sub}
                  onChange={toggleSubCategory}
                  checked={subCategory.includes(sub)}
                />
                <span>{sub}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto gap-8 pt-10 px-2 md:p-12 transition-all">
        <aside className="hidden sm:flex md:flex flex-col gap-8 bg-[rgba(236,239,241,0.8)] rounded-xl shadow-xl p-8 md:w-72 min-w-[220px] self-start">
          <div>
            <p className="text-xl font-bold mb-4" style={{ color: NAVY_BLUE }}>Categories</p>
            <div className="flex flex-col gap-3">
              {allCategories.map((cat) => (
                <label
                  key={cat}
                  className="inline-flex items-center gap-3 cursor-pointer"
                  style={{ color: "#37474F" }}
                >
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5"
                    style={{ accentColor: CORAL }}
                    value={cat}
                    onChange={toggleCategory}
                    checked={category.includes(cat)}
                  />
                  <span className="font-medium">{cat}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xl font-bold mb-4" style={{ color: NAVY_BLUE }}>Sub-categories</p>
            <div className="flex flex-col gap-3">
              {allSubCategories.map((sub) => (
                <label
                  key={sub}
                  className="inline-flex items-center gap-3 cursor-pointer"
                  style={{ color: "#37474F" }}
                >
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5"
                    style={{ accentColor: INDIGO }}
                    value={sub}
                    onChange={toggleSubCategory}
                    checked={subCategory.includes(sub)}
                  />
                  <span className="font-medium">{sub}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 px-2">
            <div className="text-center sm:text-left w-full sm:w-auto mb-4 sm:mb-0">
              <p
                className="text-3xl sm:text-4xl font-extrabold tracking-wide"
                style={{ color: NAVY_BLUE }}
              >
                ALL{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${INDIGO}, ${CORAL})`,
                  }}
                >
                  COLLECTIONS
                </span>
              </p>
            </div>

            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="rounded-xl px-4 py-2 border focus:ring-2 font-semibold transition-colors duration-500 shadow"
              style={{
                backgroundColor: SOFT_GRAY,
                color: "#37474F",
                borderColor: CORAL,
                outlineColor: CORAL,
              }}
            >
              <option value="relevant">Sort By: Relevant</option>
              <option value="low-high">Sort By: Price Low-High</option>
              <option value="high-low">Sort By: Price High-Low</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 transition-all">
            {filteredProduct.map((item, index) => (
              <div
                key={item._id}
                className="rounded-2xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 animate-fadeInUp"
                style={{
                  animationDelay: `${index * 0.05}s`,
                  backgroundColor: SOFT_GRAY,
                }}
              >
                <Card id={item._id} name={item.name} price={item.price} image={item.image1} />
              </div>
            ))}
          </div>

          {filteredProduct.length === 0 && (
            <div className="w-full py-16 text-center text-lg font-semibold" style={{ color: "#B0BEC5" }}>
              No products found for selected filters.
            </div>
          )}
        </main>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease forwards;
        }
      `}</style>
    </div>
  );
}

export default Collections;
