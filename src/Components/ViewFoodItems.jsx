import React, { useState,useEffect } from 'react';
import { AdminApi } from '../Authentication/Axios';
import { useAuth } from '../Authentication/AuthProvider';
const ViewFoodItems = ({setFoodItems,foodItems}) => {
    const {setFoodItemsClient} = useAuth()

  
    const handleRemoveFoodItem = async(itemId) => {
      try{
        const response = await AdminApi.delete(`add/foodItem/?itemId=${itemId}`)
        console.log(response)
        setFoodItems(prev => prev.filter(item => item.id !== itemId)); 
        setFoodItemsClient(prev => prev.filter(item => item.id !== itemId)); 
       }catch(error){
        console.log(error)
       }
    };
  
    const handleRemoveAllFoodItems = async() => {
      // Confirm before removing all items
      if (window.confirm('Are you sure you want to remove all food items?')) {
        try{
          const response = await AdminApi.delete(`add/foodItem/`)
          console.log(response)
          setFoodItems([]);
          setFoodItemsClient([]);
         }catch(error){
          console.log(error)
         }
      }
    };
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Food Items</h2>
          {foodItems.length > 0 && (
            <button 
              onClick={handleRemoveAllFoodItems}
              className="bg-blue-600 text-white px-4 py-2 font-semibold rounded hover:bg-red-600"
            >
              Remove All Items
            </button>
          )}
        </div>
        
        {foodItems.length === 0 ? (
          <p className="text-center text-gray-400">No food items added yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {foodItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-gray-700 rounded-lg overflow-hidden shadow-md"
              >
                <img 
                  src={`${AdminApi.defaults.baseURL+item.image}`}
                  alt={item.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-gray-300 mb-2">Category: {item.categoryName}</p>
                  <p className="text-green-400 font-semibold mb-4">
                    ${item.price.toFixed(2)}
                  </p>
                  <button 
                    onClick={() => handleRemoveFoodItem(item.id)}
                    className="w-full bg-blue-600 font-semibold text-white py-2 rounded hover:bg-red-600"
                  >
                    Remove Item
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default ViewFoodItems