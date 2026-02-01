import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Car, 
  Phone, 
  User, 
  Mail, 
  MessageSquare, 
  Camera, 
  Upload, 
  X 
} from 'lucide-react';

const Services = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { hash } = useLocation();

  // Scroll to the estimate section if the URL has #estimate
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Small delay ensures render is complete
      }
    }
  }, [hash]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (fileName) => {
    setSelectedFiles(selectedFiles.filter(file => file.name !== fileName));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("This is a demo! In the real app, these photos would be sent to the shop owner.");
  };

  const services = [
    {
      id: 1,
      title: "Collision Repair",
      description: "Full structural repairs using OEM specifications.",
    },
    {
      id: 2,
      title: "Custom Paint & Refinish",
      description: "Computerized color matching and climate-controlled booths.",
    },
    {
      id: 3,
      title: "Paintless Dent Repair",
      description: "Remove minor dings and hail damage without sanding.",
    },
    {
      id: 4,
      title: "Frame Straightening",
      description: "Laser-measured frame alignment.",
    },
    {
      id: 5,
      title: "Bumper Repair",
      description: "Plastic welding and reconditioning.",
    },
    {
      id: 6,
      title: "Glass Replacement",
      description: "Windshield and window replacement.",
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header */}
      <div className="bg-navy-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Collision & Body Services</h1>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-gold-500">
              <div className="mb-4 bg-navy-50 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-navy-900">
                {service.id}
              </div>
              <h3 className="text-2xl font-bold text-navy-900 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* NEW ESTIMATE SECTION */}
      <div id="estimate" className="max-w-7xl mx-auto px-4 scroll-mt-28">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: How It Works */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-navy-900 mb-6">How It Works</h2>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold-500 text-white flex items-center justify-center font-bold text-lg">1</div>
                  <div>
                    <h3 className="font-bold text-navy-900">Fill Out Form</h3>
                    <p className="text-sm text-gray-600">Enter your contact info and vehicle details.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold-500 text-white flex items-center justify-center font-bold text-lg">2</div>
                  <div>
                    <h3 className="font-bold text-navy-900">Upload Photos</h3>
                    <p className="text-sm text-gray-600">Take clear photos of all visible damage.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold-500 text-white flex items-center justify-center font-bold text-lg">3</div>
                  <div>
                    <h3 className="font-bold text-navy-900">Get Estimate</h3>
                    <p className="text-sm text-gray-600">We'll contact you with a preliminary quote.</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-gray-100">
                <p className="text-gray-600 mb-2">Prefer to call?</p>
                <div className="flex items-center text-gold-600 font-bold text-xl">
                  <Phone className="mr-2" size={24} />
                  (313) 273-2100
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: The Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Contact Info */}
                <div>
                  <div className="flex items-center gap-2 mb-4 text-navy-900">
                    <User className="text-gold-500" size={20} />
                    <h3 className="text-xl font-bold">Contact Information</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input 
                        type="text" 
                        required 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 outline-none text-gray-900 bg-white" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                      <input 
                        type="text" 
                        required 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 outline-none text-gray-900 bg-white" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                        type="text" 
                        required 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 outline-none text-gray-900 bg-white" 
                      />
                  </div>
                </div>

                {/* Vehicle Info */}
                <div>
                  <div className="flex items-center gap-2 mb-4 text-navy-900">
                    <Car className="text-gold-500" size={20} />
                    <h3 className="text-xl font-bold">Vehicle Information</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Year *</label>
                      <input 
                        type="text" 
                        required 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 outline-none text-gray-900 bg-white" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Make *</label>
                      <input 
                        type="text" 
                        required 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 outline-none text-gray-900 bg-white" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Model *</label>
                      <input 
                        type="text" 
                        required 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 outline-none text-gray-900 bg-white" 
                      />
                    </div>
                  </div>
                </div>

                {/* Damage Description */}
                <div>
                  <div className="flex items-center gap-2 mb-4 text-navy-900">
                    <MessageSquare className="text-gold-500" size={20} />
                    <h3 className="text-xl font-bold">Damage Description</h3>
                  </div>
                  <textarea 
                    rows="4" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 outline-none text-gray-900 bg-white"
                    placeholder="Please describe the damage (location, severity, how it happened)..."
                  ></textarea>
                </div>

                {/* Photo Upload */}
                <div>
                  <div className="flex items-center gap-2 mb-4 text-navy-900">
                    <Camera className="text-gold-500" size={20} />
                    <h3 className="text-xl font-bold">Upload Photos</h3>
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors relative text-gray-900 bg-white">
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-600 font-medium">Click to upload photos</p>
                    <p className="text-sm text-gray-400 mt-1">Take clear photos of all visible damage</p>
                  </div>

                  {/* File Preview List */}
                  {selectedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span className="text-sm text-gray-600 truncate">{file.name}</span>
                          <button 
                            type="button"
                            onClick={() => removeFile(file.name)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button type="submit" className="w-full bg-gold-500 text-navy-900 font-bold py-4 rounded-lg hover:bg-gold-400 transition-colors text-lg shadow-md">
                  Submit Estimate Request
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Services;