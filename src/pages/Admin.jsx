import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Save, Upload, Lock, Edit, X } from 'lucide-react';

const Admin = () => {
  // --- AUTH STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // --- INVENTORY STATE ---
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadingImg, setUploadingImg] = useState(false);
  
  // Track if we are editing an existing car (null = adding new)
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [newCar, setNewCar] = useState({
    year: '', make: '', model: '', price: '', mileage: '',
    status: 'Available', exterior: '', interior: '',
    engine: '', fuel: 'Gasoline', vin: '',
    description: '',
    features: [],
    images: []
  });
  const [featureInput, setFeatureInput] = useState('');

  // 1. Load Inventory on Mount
  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'inventory.json?t=' + new Date().getTime())
      .then(res => res.json())
      .then(data => {
        setInventory(data);
        setLoading(false);
      })
      .catch(err => console.error("Error loading inventory:", err));
  }, []);

  // 2. Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(import.meta.env.BASE_URL + 'login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput })
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        setLoginError('');
      } else {
        setLoginError('Incorrect Password');
      }
    } catch (error) {
      setLoginError('Login system error');
    }
  };

  // 3. Handle Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImg(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(import.meta.env.BASE_URL + 'upload_image.php', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      
      if (data.success) {
        setNewCar(prev => ({
          ...prev,
          images: [...prev.images, data.filepath]
        }));
      } else {
        alert("Upload failed: " + data.message);
      }
    } catch (error) {
      console.error("Upload error", error);
      alert("Error uploading image");
    } finally {
      setUploadingImg(false);
    }
  };

  // 4. Handle Edit Click
  const handleEdit = (car) => {
    setNewCar(car); // Fill form with car data
    setEditingId(car.id); // Set mode to Edit
    window.scrollTo(0, 0); // Scroll to top
  };

  // 5. Handle Cancel Edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setNewCar({
      year: '', make: '', model: '', price: '', mileage: '',
      status: 'Available', exterior: '', interior: '',
      engine: '', fuel: 'Gasoline', vin: '', description: '',
      features: [], images: []
    });
  };

  // 6. Handle Save (Add OR Update)
  const handleSaveVehicle = () => {
    let updatedInventory;

    if (editingId) {
      // UPDATE EXISTING
      updatedInventory = inventory.map(c => 
        c.id === editingId ? { ...newCar, id: editingId } : c
      );
    } else {
      // ADD NEW
      const id = inventory.length > 0 ? Math.max(...inventory.map(c => c.id)) + 1 : 1;
      const carToAdd = { ...newCar, id };
      updatedInventory = [...inventory, carToAdd];
    }
    
    setInventory(updatedInventory);
    saveInventory(updatedInventory);
    handleCancelEdit(); // Reset form
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this vehicle?')) {
      const updated = inventory.filter(c => c.id !== id);
      setInventory(updated);
      saveInventory(updated);
    }
  };

  const saveInventory = (data) => {
    fetch(import.meta.env.BASE_URL + 'save_inventory.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(() => alert('Inventory Saved!'))
      .catch(err => alert('Save failed'));
  };

  // --- RENDER: LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <div className="flex justify-center mb-4">
            <Lock className="w-12 h-12 text-yellow-500" />
          </div>
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Admin Access</h2>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Enter Password"
              className="w-full p-3 border rounded mb-4 text-gray-900 bg-white"
            />
            {loginError && <p className="text-red-500 text-sm mb-4 text-center">{loginError}</p>}
            <button type="submit" className="w-full bg-gray-900 text-white py-3 rounded font-bold hover:bg-gray-800">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- RENDER: DASHBOARD ---
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Inventory Manager</h1>
      
      {/* FORM SECTION */}
      <div className={`bg-white p-6 rounded-lg shadow-md mb-8 border-t-4 ${editingId ? 'border-blue-500' : 'border-green-500'}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {editingId ? `Editing Vehicle #${editingId}` : 'Add New Vehicle'}
          </h2>
          {editingId && (
            <button onClick={handleCancelEdit} className="text-gray-500 hover:text-gray-700 flex items-center text-sm">
              <X className="w-4 h-4 mr-1" /> Cancel Edit
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input placeholder="Year" value={newCar.year} onChange={e => setNewCar({...newCar, year: e.target.value})} className="p-2 border rounded text-gray-900 bg-white" />
          <input placeholder="Make" value={newCar.make} onChange={e => setNewCar({...newCar, make: e.target.value})} className="p-2 border rounded text-gray-900 bg-white" />
          <input placeholder="Model" value={newCar.model} onChange={e => setNewCar({...newCar, model: e.target.value})} className="p-2 border rounded text-gray-900 bg-white" />
          <input placeholder="Price" value={newCar.price} onChange={e => setNewCar({...newCar, price: e.target.value})} className="p-2 border rounded text-gray-900 bg-white" />
          <input placeholder="Mileage" value={newCar.mileage} onChange={e => setNewCar({...newCar, mileage: e.target.value})} className="p-2 border rounded text-gray-900 bg-white" />
          <input placeholder="VIN" value={newCar.vin} onChange={e => setNewCar({...newCar, vin: e.target.value})} className="p-2 border rounded text-gray-900 bg-white" />
          <input placeholder="Exterior Color" value={newCar.exterior} onChange={e => setNewCar({...newCar, exterior: e.target.value})} className="p-2 border rounded text-gray-900 bg-white" />
          <input placeholder="Interior Color" value={newCar.interior} onChange={e => setNewCar({...newCar, interior: e.target.value})} className="p-2 border rounded text-gray-900 bg-white" />
          <input placeholder="Engine" value={newCar.engine} onChange={e => setNewCar({...newCar, engine: e.target.value})} className="p-2 border rounded text-gray-900 bg-white" />
          
          {/* Status Dropdown */}
          <select 
            value={newCar.status} 
            onChange={e => setNewCar({...newCar, status: e.target.value})}
            className="p-2 border rounded text-gray-900 bg-white"
          >
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <textarea 
          placeholder="Vehicle Description" 
          value={newCar.description} 
          onChange={e => setNewCar({...newCar, description: e.target.value})} 
          className="w-full p-2 border rounded mb-4 text-gray-900 bg-white h-24"
        />

        {/* IMAGE UPLOAD SECTION */}
        <div className="mb-4 p-4 bg-gray-50 rounded border border-dashed border-gray-300">
          <label className="block text-sm font-bold text-gray-700 mb-2">Vehicle Photos</label>
          <div className="flex items-center gap-4">
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploadingImg}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
            />
            {uploadingImg && <span className="text-blue-600 font-bold animate-pulse">Uploading...</span>}
          </div>
          
          <div className="flex gap-2 mt-3 overflow-x-auto">
            {newCar.images.map((img, idx) => (
              <div key={idx} className="relative w-20 h-20 flex-shrink-0">
                <img src={import.meta.env.BASE_URL + img.replace(/^\//, '')} alt="preview" className="w-full h-full object-cover rounded border" />
                <button 
                  onClick={() => setNewCar(prev => ({...prev, images: prev.images.filter((_, i) => i !== idx)}))}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURES SECTION */}
        <div className="mb-4">
          <div className="flex gap-2 mb-2">
            <input 
              placeholder="Add Feature (e.g. Bluetooth)" 
              value={featureInput} 
              onChange={e => setFeatureInput(e.target.value)} 
              className="flex-1 p-2 border rounded text-gray-900 bg-white"
            />
            <button 
              onClick={() => {
                if(featureInput) {
                  setNewCar({...newCar, features: [...newCar.features, featureInput]});
                  setFeatureInput('');
                }
              }}
              className="bg-gray-200 px-4 rounded hover:bg-gray-300 text-gray-800"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {newCar.features.map((f, i) => (
              <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center">
                {f} <button onClick={() => setNewCar({...newCar, features: newCar.features.filter((_, idx) => idx !== i)})} className="ml-2 text-red-500 font-bold">×</button>
              </span>
            ))}
          </div>
        </div>

        <button 
          onClick={handleSaveVehicle} 
          className={`w-full py-3 rounded font-bold text-white flex items-center justify-center gap-2 ${editingId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {editingId ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />} 
          {editingId ? 'Update Vehicle' : 'Add Vehicle to Inventory'}
        </button>
      </div>

      {/* INVENTORY LIST */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inventory.map((car) => (
              <tr key={car.id}>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">#{car.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">{car.year} {car.make} {car.model}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">${car.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${car.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {car.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-3">
                    <button onClick={() => handleEdit(car)} className="text-blue-600 hover:text-blue-900 flex items-center">
                      <Edit className="w-4 h-4 mr-1" /> Edit
                    </button>
                    <button onClick={() => handleDelete(car.id)} className="text-red-600 hover:text-red-900 flex items-center">
                      <Trash2 className="w-4 h-4 mr-1" /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;