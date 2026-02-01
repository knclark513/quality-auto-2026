import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-navy-900 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Column 1: Brand */}
        <div>
          <h3 className="text-xl font-bold text-gold-500 mb-2">Quality Auto Services</h3>
          <p className="text-gray-300 text-sm">
            Restoring vehicles to their former glory with precision and care.
          </p>
        </div>

        {/* Column 2: Contact */}
        <div>
          <h4 className="font-bold mb-2">Contact Us</h4>
          <p className="text-gray-300 text-sm">1234 Auto Park Way</p>
          <p className="text-gray-300 text-sm">Detroit, MI 48200</p>
          <p className="text-gold-500 font-bold mt-2">(313) 555-0123</p>
        </div>

        {/* Column 3: Hours */}
        <div>
          <h4 className="font-bold mb-2">Business Hours</h4>
          <p className="text-gray-300 text-sm">Mon - Fri: 8:00 AM - 6:00 PM</p>
          <p className="text-gray-300 text-sm">Saturday: 9:00 AM - 2:00 PM</p>
          <p className="text-gray-300 text-sm">Sunday: Closed</p>
        </div>
      </div>
      
      <div className="border-t border-navy-800 mt-8 pt-4 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} Quality Auto Services. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;