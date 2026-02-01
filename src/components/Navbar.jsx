import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/car-logo-transparent.png'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-navy-900 text-white shadow-lg border-b border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LEFT: Logo & Brand */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src={logo} 
                alt="Quality Auto Logo" 
                className="h-12 w-auto object-contain"
                onError={(e) => {e.target.style.display='none'}} 
              />
              <span className="font-bold text-xl sm:text-2xl tracking-wide text-yellow-400 italic">
                Quality Auto Services
              </span>
            </Link>
          </div>

          {/* CENTER/RIGHT: Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="hover:text-yellow-400 font-medium transition-colors">Home</Link>
            <Link to="/inventory" className="hover:text-yellow-400 font-medium transition-colors">Inventory</Link>
            <Link to="/services" className="hover:text-yellow-400 font-medium transition-colors">Services</Link>
            
            <Link to="/contact" className="flex items-center text-yellow-400 hover:text-yellow-300 font-medium transition-colors">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Get Estimate
            </Link>

            <a href="tel:3132732100" className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-4 py-2 rounded font-bold flex items-center transition-colors">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              (313) 273-2100
            </a>

            {/* Admin Link with Text */}
            <Link to="/admin" className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="font-medium">Admin</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg className="h-8 w-8" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-navy-800 border-t border-navy-700">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-navy-700 hover:text-yellow-400">Home</Link>
            <Link to="/inventory" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-navy-700 hover:text-yellow-400">Inventory</Link>
            <Link to="/services" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-navy-700 hover:text-yellow-400">Services</Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-yellow-400 hover:bg-navy-700">Get Estimate</Link>
            <a href="tel:3132732100" className="block px-3 py-2 rounded-md text-base font-bold bg-yellow-500 text-slate-900 mt-2 text-center">
              Call (313) 273-2100
            </a>
            <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-red-600 hover:bg-red-700 mt-4">
              Admin Portal
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;