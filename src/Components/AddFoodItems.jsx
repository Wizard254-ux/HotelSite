import React, { useEffect, useState } from 'react';
import { AdminApi } from '../Authentication/Axios';
import { useAuth } from '../Authentication/AuthProvider';


const AddFoodItem = ({foodCategories,setFoodCategories}) => {
    const {setFoodCategoriesClient} = useAuth()

    const [previewUrl, setPreviewUrl] = useState(null);
    
    const [foodItem, setFoodItem] = useState({
      id: Date.now(),
      name: '',
      price: '',
      category: '',
      image: null
    });
    const [newCategory, setNewCategory] = useState('');
    const [loading,setLoading]=useState(false)

  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFoodItem(prev => ({
        ...prev,
        [name]: value
      }));

    };
    
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
          setFoodItem(prev => ({
            ...prev,
            image: file
          }));

          const fileUrl=URL.createObjectURL(file)
          setPreviewUrl(fileUrl)
        }
      };
  
    const handleRemoveImage = () => {
      setFoodItem(prev => ({
        ...prev,
        image: null
      }));
      
      const fileInput = document.getElementById('image-upload');
      if (fileInput) {
        fileInput.value = '';
      }
    };
  
    const handleAddCategory =async (e) => {
      e.preventDefault();
      
      // Trim and validate new category
      const trimmedCategory = newCategory.trim();
      
      if (!trimmedCategory) {
        alert('Category name cannot be empty');
        return;
      }
      
      // Check if category already exists
      if (foodCategories.some(cat => cat.name.toLowerCase() === trimmedCategory.toLowerCase())) {
        alert('This category already exists');
        return;
      }
      
      try{
      // Add new category
      const res = await AdminApi.post('api/category/',{categoryName:trimmedCategory})
      console.log('reponse',res)
      setFoodCategories(prev => [...prev, {name:res.categoryName,id:res.id}]);
      setFoodCategoriesClient(prev => [...prev, {name:res.categoryName,id:res.id}]);
      setNewCategory(''); // Reset input
      }catch(error){
        console.log(error)
        return;
      }
    };
  
    const handleDeleteCategory = async(category) => {
      // Confirm before deleting
      if (window.confirm(`Are you sure you want to delete the category "${category.name}"?`)) {
        // Remove the category

        try{
            const res = await AdminApi.delete(`api/category/?categoryId=${category.id}`)
           console.log(res)
        setFoodCategories(prev => prev.filter(cat => cat.id !== category.id));
        setFoodCategoriesClient(prev => prev.filter(cat => cat.id !== category.id));
        }catch(error){
            console.log(error)
        }
        
        // If the current food item's category is being deleted, reset its category
        setFoodItem(prev => ({
          ...prev,
          category: prev.category.id === category.id ? '' : prev.category
        }));
      }
    };
  
        const handleSubmit = async (e) => {
            e.preventDefault();

            
            // Create FormData for file upload
            const formData = new FormData();
            formData.append('name', foodItem.name);
            formData.append('price', parseInt(foodItem.price));
            formData.append('category', foodItem.category);
            
            // If image is a File object, append it
            if (foodItem.image instanceof File) {
              formData.append('image', foodItem.image);
            }
           setLoading(true)
            try {
              // Send to backend
              const response = await AdminApi.post('add/foodItem/', formData,)
              console.log('Response:', response);
          
              // Reset form after successful submission
              setFoodItem({
                id: Date.now(),
                name: '',
                price: '',
                category: '',
                image: null
              });
          
              // Reset file input
              const fileInput = document.getElementById('image-upload');
              if (fileInput) {
                fileInput.value = '';
              }
          
              setLoading(false)
              alert('Food Item Added Successfully');
            } catch (error) {
              console.error('Error adding food item:', error);
              setLoading(false)
              alert('Failed to add food item');
            }
          };
  
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Add New Food Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Food Name</label>
            <input 
              name="name"
              value={foodItem.name}
              onChange={handleInputChange}
              placeholder="Enter food name"
              required
              className="w-full px-3 py-2 border rounded text-white"
            />
          </div>
          
          <div>
            <label className="block mb-2">Price</label>
            <input 
              name="price"
              type="number"
              value={foodItem.price}
              onChange={handleInputChange}
              placeholder="Enter price"
              required
              className="w-full px-3 py-2 border rounded text-white"
            />
          </div>
          
          <div>
            <label className="block mb-2">Category Management</label>
            <div className="flex space-x-2 mb-2">
              <input 
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="New category name"
                className="flex-grow px-3 py-2 border rounded text-white"
              />
              <button 
                type="button"
                onClick={handleAddCategory}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Category
              </button>
            </div>
            <div className="mb-2">
              <label className="block mb-1">Existing Categories</label>
              <div className="flex flex-wrap gap-2">
                {foodCategories.map(category => (
                  <div 
                    key={category.id} 
                    className="flex items-center bg-gray-700 rounded px-2 py-1"
                  >
                    <span className="mr-2">{category.name}</span>
                    <button 
                      type="button"
                      onClick={() => handleDeleteCategory(category)}
                      className="text-red-400 hover:text-red-600"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <select 
              name="category"
              value={foodItem.category}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded text-gray-600"
            >
              <option value="">Select a category</option>
              {foodCategories.map(category => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block mb-2">Food Image</label>
            <input 
              id="image-upload"
              type="file" 
              accept="image/*"
              onChange={handleImageUpload}
              required
              className="w-full px-3 py-2 border rounded"
            />
            {foodItem.image && (
              <div className="mt-2 flex items-center">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="max-w-[200px] rounded mr-2"
                />
                <button 
                  type="button"
                  onClick={handleRemoveImage}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>
          {!loading?
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Add Food Item
          </button>:            <div className="fa-3x flex justify-center">     <i className="fas fa-circle-notch fa-spin text-black self-center "></i></div>
        }
        </form>
      </div>
    );
  };

  export default AddFoodItem;