import React from 'react';
import HeroSection from '../Components/HeroSection'; 
import Product from './Product';
import OurPolicy from '../Components/OurPolicy';
import SubscribeForm from '../Components/newLatter';
import Footer from '../Components/Footer';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Product/>
      <OurPolicy/>
      <SubscribeForm/>
      <Footer/>
    </div>
  );
}

export default Home;
