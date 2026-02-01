import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Wrench, Car } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* HERO SECTION */}
      <div className="relative bg-navy-900 text-white py-32">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Make sure your building image is named 'shop-building.jpg' in the public folder */}
          <img 
            src="/shop-building.png" 
            alt="Quality Auto Shop Front" 
            className="w-full h-full object-cover opacity-40" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/90 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Quality Cars. <br/>
              <span className="text-gold-500">Honest Service.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Detroit's trusted source for restored salvage vehicles and expert collision repair. We bring cars back to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/inventory" className="bg-gold-500 text-navy-900 px-8 py-4 rounded-md font-bold text-lg hover:bg-gold-400 transition-colors text-center">
                View Inventory
              </Link>
              <Link to="/services" className="border-2 border-white text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-white hover:text-navy-900 transition-colors text-center">
                Collision Services
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Why Choose Quality Auto Services?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We specialize in two things: selling high-value restored vehicles and fixing yours when accidents happen.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="bg-navy-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Car className="text-navy-900" size={28} />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Quality Inventory</h3>
              <p className="text-gray-600 mb-4">
                Our restored salvage vehicles are inspected, repaired, and road-ready, offering you premium cars at a fraction of the market price.
              </p>
              <Link to="/inventory" className="text-gold-600 font-bold flex items-center hover:text-gold-700">
                Browse Cars <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="bg-navy-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Wrench className="text-navy-900" size={28} />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Collision Repair</h3>
              <p className="text-gray-600 mb-4">
                From fender benders to major frame damage, our expert body shop restores your vehicle to its pre-accident condition.
              </p>
              <Link to="/services" className="text-gold-600 font-bold flex items-center hover:text-gold-700">
                Our Services <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="bg-navy-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Shield className="text-navy-900" size={28} />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Trusted Service</h3>
              <p className="text-gray-600 mb-4">
                Family-owned and operated in Detroit. We believe in transparency, fair pricing, and quality workmanship.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="bg-navy-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Need an Estimate?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Upload photos of your vehicle damage and get a preliminary estimate without leaving your home.
          </p>
          <Link 
            to="/services#estimate" 
            className="inline-block bg-gold-500 text-navy-900 px-8 py-4 rounded-md font-bold text-lg hover:bg-gold-400 transition-colors"
          >
            Start Online Estimate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;