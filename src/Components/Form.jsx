import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ClientApi } from '../Authentication/Axios';
import { useAuth } from '../Authentication/AuthProvider';
import Cookies from 'js-cookie'

const AuthForm = ({handleCloseOverlay,setIsOrderConfirming,showOverlay,setShowOverlay,triggerError}) => {
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const {loginClient,setClient,setClientAuthorized}=useAuth()
  const [loading,setLoading]=useState(false)


  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        setLoading(true)

        const response=await ClientApi.post('api/token/',{username:formData.username,password:formData.password})
        loginClient(response.refresh,response.access)
      setClient(response)
      setClientAuthorized(true)
      setShowOverlay(false)
      setIsOrderConfirming(true)
      
      if (response.ok) {
          // Handle successful login (e.g., redirect, store token)
          console.log('Login successful');
        } else {
            // Handle login error
            console.error('Login failed');
        }
        setLoading(false)

    } catch (error) {
        if(!error.response){
            triggerError('Check you Internet connection and try again')
        }else if(error.response){
            triggerError('Invalid credentials')
            
        }else {
            triggerError('Server Error ,try again later')

        }
        setLoading(false)

        console.error('Login error:', error);
    }
};

  // Handle create account submission
  const handleCreateAccount = async (e) => {
      e.preventDefault();
      setLoading(true)
    try {
        const response=await ClientApi.post('register/client/',{username:formData.username,password:formData.password,email:formData.email})
        console.log(response)
        loginClient(response.refresh,response.access)
        setClient(response)
        setClientAuthorized(true)
        setShowOverlay(false)
        setIsOrderConfirming(true)
      

      if (response.ok) {
        // Handle successful registration
        console.log('Account created successfully');
      } else {
        // Handle registration error
        console.error('Registration failed');
      }
      setLoading(false)
    } catch (error) {
        if(!error.response){
            triggerError('Check you Internet connection and try again')
        }else if(error.response.data['username']){
            triggerError('A user with this username already exist')
            
        }else {
            triggerError('Server Error ,try again later')

        }
        setLoading(false)

      console.error('Registration error:', error);
    }
  };

  // Close overlay
 
  // Toggle between login and create account
  const toggleAuthMode = () => {
    setIsCreateAccount(!isCreateAccount);
  };

  // If overlay is closed, return null
  if (showOverlay==false) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white p-8 rounded-lg shadow-xl w-96">
        {/* Close Button */}
        <button 
          onClick={handleCloseOverlay} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        {/* Form Title */}
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          {isCreateAccount ? 'Create Account' : 'Login'}
        </h2>

        {/* Form */}
        <form onSubmit={isCreateAccount ? handleCreateAccount : handleLogin}>
          {/* Username Input */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 text-white font-serif font-medium border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email Input (only for create account) */}
          {isCreateAccount && (
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border text-white font-serif font-medium  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border text-white font-serif font-medium  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          {!loading?<button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            {isCreateAccount ? 'Create Account' : 'Login'}
          </button>:
            <div className="fa-3x flex justify-center">     <i className="fas fa-circle-notch fa-spin text-black self-center "></i></div>
          }



        </form>

        {/* Toggle Between Login and Create Account */}
        <div className="text-center mt-4">
          <button
            onClick={toggleAuthMode}
            className="text-blue-500 hover:underline"
          >
            {isCreateAccount 
              ? 'Already have an account? Login' 
              : 'Need an account? Create one'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;