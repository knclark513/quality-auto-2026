import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Gauge, Tag } from 'lucide-react';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Smart URL detection
  const rawBase = import.meta.env.BASE_URL;
  const baseUrl = rawBase.endsWith('/') ? rawBase.slice(0, -1) : rawBase;

  useEffect(() => {
    // Added ?t=... to force a fresh load every time
    fetch(import.meta.env.BASE_URL + 'inventory.json?t=' + new Date().getTime())
      .then(res => res.json())
      .then(data => {
        setInventory(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching inventory:", err);
        setLoading(false);
      });
  }, [baseUrl]);

  if (loading) return <div className="text-center py-12">Loading inventory...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">
            Current <span className="text-gold-500">Inventory</span>
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Quality inspected vehicles ready for the road.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {inventory.map((car) => (
            <div key={car.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="h-48 w-full overflow-hidden relative">
                <img 
                  src={car.images && car.images.length > 0 ? `${baseUrl}${car.images[0]}` : `${baseUrl}/placeholder.jpg`} 
                  alt={`${car.year} ${car.make} ${car.model}`} 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  onError={(e) => {e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'}}
                />
                <div className="absolute top-0 right-0 bg-gold-500 text-navy-900 font-bold px-3 py-1 m-2 rounded text-sm">
                  {car.status || 'Available'}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-navy-900 mb-2">
                  {car.year} {car.make} {car.model}
                </h3>
                <div className="text-2xl font-extrabold text-gold-600 mb-4">
                  ${parseInt(car.price).toLocaleString()}
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Gauge className="w-4 h-4 mr-2 text-gold-500" />
                    {car.mileage} mi
                  </div>
                  <div className="flex items-center">
                    <Tag className="w-4 h-4 mr-2 text-gold-500" />
                    {car.status || 'Used'}
                  </div>
                </div>

                <Link to={`/inventory/${car.id}`} className="w-full bg-navy-900 hover:bg-navy-800 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inventory;