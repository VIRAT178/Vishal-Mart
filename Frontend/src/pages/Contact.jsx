import React from 'react';
import Title from '../Components/Title';
import SubscribeForm from '../Components/newLatter';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaBriefcase } from 'react-icons/fa';

function ContactUs() {
  return (
    <div className="relative bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-screen p-8 flex flex-col items-center">
      <svg
        className="absolute top-8 left-8 w-28 h-28 opacity-20 text-indigo-400 animate-spin-slow"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        viewBox="0 0 48 48"
      >
        <circle cx="24" cy="24" r="20" strokeDasharray="15 15" strokeLinecap="round" />
      </svg>
      <svg
        className="absolute bottom-10 right-10 w-24 h-24 opacity-15 text-pink-400 animate-pulse-slow"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 64 64"
      >
        <rect x="12" y="12" width="40" height="40" rx="8" strokeDasharray="10 10" />
      </svg>

      <div className="relative z-10 max-w-7xl w-full bg-white rounded-3xl shadow-xl p-10 md:p-16 space-y-12 text-gray-800 animate-fadeIn">
        <Title text1="CONTACT" text2="US" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-10">
            <div>
              <div className="flex items-center space-x-4 mb-3">
                <FaMapMarkerAlt className="text-pink-600 text-3xl animate-fadeIn delay-100" />
                <h3 className="text-xl font-semibold">Our Store</h3>
              </div>
              <p className="pl-12 text-gray-600">
                123, Ambhikapuri<br />
                Indore, Madhya Pradesh, India
              </p>
            </div>
            <div>
              <div className="flex items-center space-x-4 mb-3">
                <FaPhoneAlt className="text-pink-600 text-3xl animate-fadeIn delay-150" />
                <h3 className="text-xl font-semibold">Contact Info</h3>
              </div>
              <p className="pl-12 text-gray-600">
                Tel: +91-955349873<br />
                Email: Admin@gmail.com
              </p>
            </div>
            <div className="text-center md:text-left">
              <FaBriefcase className="text-pink-600 text-4xl mx-auto md:mx-0 mb-3 animate-fadeIn delay-200" />
              <h3 className="text-2xl font-bold text-pink-700 mb-2">Careers at Vishal Mart</h3>
              <p className="text-gray-600">
                Learn more about our teams and job openings to be part of an innovative, dynamic company.
              </p>
              <button className="mt-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold px-8 py-3 shadow-lg hover:scale-105 transition-transform duration-300 animate-pulse">
                Explore Jobs
              </button>
            </div>
          </div>
          <SubscribeForm />
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-150 { animation-delay: 0.15s; }
        .delay-200 { animation-delay: 0.2s; }
        @keyframes spin-slow {
          from { transform: rotate(0deg);}
          to { transform: rotate(360deg);}
        }
        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 0.3; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default ContactUs;
