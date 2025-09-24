import React from 'react';
import Title from '../Components/Title';
import SubscribeForm from '../Components/newLatter';
import { HiShieldCheck, HiClock, HiSupport } from 'react-icons/hi';

function About() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-white min-h-screen flex flex-col items-center px-6 py-16">
      <svg
        className="absolute top-10 left-10 w-28 h-28 opacity-20 stroke-pink-500 animate-spin-slow"
        fill="none"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <circle cx="12" cy="12" r="9" strokeDasharray="28" strokeLinecap="round" />
      </svg>
      <svg
        className="absolute top-96 right-16 w-28 h-28 opacity-20 stroke-pink-500 animate-spin-slow"
        fill="none"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <circle cx="12" cy="12" r="9" strokeDasharray="28" strokeLinecap="round" />
      </svg>
      <svg
        className="absolute top-14 right-16 w-24 h-24 opacity-15 stroke-purple-500"
        fill="none"
        strokeWidth="3"
        viewBox="0 0 100 100"
        stroke="currentColor"
      >
        <circle cx="50" cy="50" r="40" />
        <circle cx="50" cy="50" r="25" />
      </svg>

      <div className="max-w-4xl mx-auto space-y-20 text-center">
        <Title text1="ABOUT" text2="US" />
        <div className="space-y-6 text-gray-900">
          <p className="text-lg leading-relaxed animate-fadeIn delay-100">
            Vishal Mart is dedicated to bringing the latest fashion and lifestyle needs directly to your doorstep. With a carefully curated selection of products, we ensure every item meets our high standards of quality and style, empowering you to express yourself with confidence every day.
          </p>
          <p className="text-lg leading-relaxed animate-fadeIn delay-200">
            Our commitment to customer satisfaction extends beyond just great products. We provide attentive support and personalized experiences, making sure each interaction is smooth and enjoyable. Vishal Mart puts your happiness at the forefront.
          </p>
          <h3 className="text-2xl font-semibold text-pink-600 animate-fadeIn delay-300">Our Mission</h3>
          <p className="text-lg leading-relaxed animate-fadeIn delay-300">
            Our mission at Vishal Mart is to revolutionize online shopping by providing a seamless, enjoyable, and trustworthy experience for everyone. We combine trending styles and essential products with exceptional value and fast, reliable service.
          </p>
        </div>
        <section>
          <Title text1="WHY" text2="CHOOSE US" />
          <div className="grid md:grid-cols-3 gap-12 mt-8">
            <div className="bg-white rounded-2xl p-10 shadow-md transition-transform duration-300 hover:shadow-xl hover:scale-[1.05] hover:border-2 hover:border-pink-500 flex flex-col items-center text-center space-y-4 animate-fadeInUp">
              <HiShieldCheck className="text-6xl text-pink-600 mb-4" />
              <h4 className="text-xl font-bold text-pink-700">Quality Assurance</h4>
              <p className="text-gray-900 leading-relaxed">
                We carefully select our products to meet stringent quality standards, ensuring durability, authenticity, and your satisfaction with every purchase.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-md transition-transform duration-300 hover:shadow-xl hover:scale-[1.05] hover:border-2 hover:border-pink-500 flex flex-col items-center text-center space-y-4 animate-fadeInUp delay-100">
              <HiClock className="text-6xl text-pink-600 mb-4" />
              <h4 className="text-xl font-bold text-pink-700">Convenience</h4>
              <p className="text-gray-900 leading-relaxed">
                Our streamlined platform makes shopping fast and effortless with intuitive navigation, flexible payments, and reliable delivery right to your door.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-md transition-transform duration-300 hover:shadow-xl hover:scale-[1.05] hover:border-2 hover:border-pink-500 flex flex-col items-center text-center space-y-4 animate-fadeInUp delay-200">
              <HiSupport className="text-6xl text-pink-600 mb-4" />
              <h4 className="text-xl font-bold text-pink-700">Exceptional Customer Service</h4>
              <p className="text-gray-900 leading-relaxed">
                Our friendly support team is always ready to assist you promptly and personally, ensuring a smooth and satisfying shopping journey.
              </p>
            </div>
          </div>
        </section>

        <section>
          <SubscribeForm />
        </section>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s ease forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.7s ease forwards;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 25s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default About;


