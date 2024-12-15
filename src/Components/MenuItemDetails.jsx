import React, { useState } from 'react';
// import { X } from 'lucide-react';
import { AdminApi } from '../Authentication/Axios';

const MenuItemOverlay = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-700 rounded-lg shadow-xl max-w-md w-full p-6 relative">
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 hover:bg-white bg-black p-1 rounded-md  text-white hover:text-gray-900"
        >
          
          <i style={{fontSize:20}} className="fa-solid fa-x hover:text-black"></i>    
             </button>

        {/* Item Image */}
        <img  
          src={`${AdminApi.defaults.baseURL+item.image}`} 

          alt={item.name} 
          className="w-full h-64 object-cover rounded-lg mb-4"
        />

        {/* Item Details */}
        <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
        
        {/* Price */}
        <p className="text-xl text-yellow-600 font-semibold mb-4">ksh {item.price.toFixed(2)}</p>
        
        {/* Description */}
        <div className="mb-4">
          <h3 className="font-bold text-lg mb-2">About This Dish</h3>
          <p className="text-yellow-700">
            {getItemDescription('default')}
          </p>
        </div>

        {/* Nutritional Info */}
        <div>
          <h3 className="font-bold text-lg mb-2">Nutritional Highlights</h3>
          <ul className="list-disc list-inside text-white">
            {getNutritionalInfo(item.name).map((info, index) => (
              <li key={index}>{info}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Helper function to generate descriptions
const getItemDescription = (itemName) => {
  const descriptions = {
    
    'default': 'A delicious dish carefully prepared to satisfy your culinary cravings.'
  };

  return descriptions[itemName] || descriptions['default'];
};

// Helper function to generate nutritional info
const getNutritionalInfo = (itemName) => {
  const nutritionInfo = {
    'default': [
      'Nutritional information varies',
      'Consult with our staff for details'
    ]
  };

  return nutritionInfo[itemName] || nutritionInfo['default'];
};

export default MenuItemOverlay;