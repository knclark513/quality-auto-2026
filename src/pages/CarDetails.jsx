import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Gauge, Car, Armchair, Zap, Fuel, Hash, Phone } from 'lucide-react';

const VehicleDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    // Fetch with cache busting to ensure we get the latest data
    fetch(import.meta.env.BASE_URL + 'inventory.json?t=' + new Date().getTime())
      .then((res) => res.json())
      .then((data) => {
        const foundCar = data.find((c) => c.id === parseInt(id));
        setCar(foundCar);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load vehicle:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading vehicle details...</div>;
  if (!car) return <div className="p-8 text-center">Vehicle not found. <Link to="/inventory" className="text-blue-600 underline">Back to Inventory</Link></div>;

  // Helper to safely get images (handles your new array structure)
  const images = car.images && car.images.length > 0 ? car.images : ['/api/placeholder/800/600'];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link to="/inventory" className="inline-flex items-center text-gray-600 hover:text-yellow-500 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Inventory
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            
            {/* Left Column: Image Gallery */}
            <div className="bg-gray-100 relative group">
              <div className="aspect-w-4 aspect-h-3 bg-gray-200 relative h-96 lg:h-full">
                <img 
                  src={import.meta.env.BASE_URL + images[activeImage].replace(/^\//, '')} 
                  alt={`${car.year} ${car.make} ${car.model}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Image Navigation Arrows (Only show if multiple images) */}
                {images.length > 1 && (
                  <>
                    <button 
                      onClick={() => setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      &lt;
                    </button>
                    <button 
                      onClick={() => setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      &gt;
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`w-16 h-12 border-2 rounded overflow-hidden ${activeImage === idx ? 'border-yellow-400' : 'border-white/50'}`}
                    >
                      <img src={import.meta.env.BASE_URL + img.replace(/^\//, '')} className="w-full h-full object-cover" alt="thumbnail" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Details */}
            <div className="p-8 lg:p-10 flex flex-col">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  {/* DYNAMIC STATUS BADGE */}
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    car.status === 'Available' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {car.status}
                  </span>
                  <span className="text-gray-400 text-sm">Stock #{car.id}</span>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {car.year} {car.make} {car.model}
                </h1>
                <p className="text-2xl font-bold text-yellow-600">${car.price}</p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8 bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Year</p>
                    <p className="font-semibold text-gray-900">{car.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Gauge className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Mileage</p>
                    <p className="font-semibold text-gray-900">{car.mileage}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Car className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Exterior</p>
                    <p className="font-semibold text-gray-900">{car.exterior}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Armchair className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Interior</p>
                    <p className="font-semibold text-gray-900">{car.interior}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Engine</p>
                    <p className="font-semibold text-gray-900">{car.engine}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Fuel className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Fuel Type</p>
                    <p className="font-semibold text-gray-900">{car.fuel}</p>
                  </div>
                </div>
                <div className="col-span-2 flex items-center gap-3 pt-2 border-t border-gray-200 mt-2">
                  <Hash className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase">VIN</p>
                    <p className="font-mono text-sm text-gray-900">{car.vin}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Vehicle Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {car.description || "No description available for this vehicle."}
                </p>
              </div>

              {/* Features List - STRICTLY from JSON */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Key Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                  {car.features && car.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Button */}
              <div className="mt-auto">
                <a href="tel:3132732100" className="w-full bg-gray-900 text-white py-4 rounded-lg font-bold flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <Phone className="w-5 h-5 mr-2" />
                  Contact Us About This Car
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;