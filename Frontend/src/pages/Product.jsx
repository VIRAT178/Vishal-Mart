import React from 'react';
import LetestCollections from '../Components/LetestCollections';
import Bestseller from '../Components/Bestseller';

function Product() {
  return (
    <div className="px-4 sm:px-8 lg:px-16 py-8 space-y-12">
      <div>
        <LetestCollections />
      </div>
      <div>
        <Bestseller />
      </div>
    </div>
  );
}

export default Product;
