import React, { useState } from 'react';
import { useAuth } from '../Authentication/AuthProvider';
import { AdminApi } from '../Authentication/Axios';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const {login,setUser}=useAuth()
  const [isLoading,setLoading]=useState(false)

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    // Simple validation
    if (!username || !password) {
      setErrorMessage('Please enter both username and password');
      return;
    }

    setLoading(true)
    try{
        const res=await AdminApi.post('api/token/',{username:username,password:password,isAdmin:true})
        login(res.refresh,res.access)
        console.log(res)
        setLoading(false)
    }catch(error){
        console.log(error)
        if(!error.status){
            setErrorMessage('Check your internet connection and try again');
            
        }else{
            
            setErrorMessage('Incorrect Credentials');
        }
        setLoading(false)
    }



    // if (username === 'admin' && password === 'password123') {
    //   alert('Login Successful!');
    //   // Typically you would redirect to dashboard here
    // } else {
    //   setErrorMessage('Invalid username or password');
    // }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"
      style={{
        backgroundImage: 'linear-gradient(to bottom right, #1e3a8a, #6b21a8, #4338ca)',
        backgroundSize: '400% 400%',
        animation: 'gradient-shift 15s ease infinite'
      }}
    >
      <style jsx>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl border border-white/20 p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-gray-300">Enter your credentials to access the dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg text-center">
              {errorMessage}
            </div>
          )}

          <div className="relative">
            <label className=" text-white mb-2 flex items-center">
            <i className="fas fa-user"></i>
            Username
            </label>
            <input 
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrorMessage('');
              }}
              placeholder="Enter your username"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white 
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                         transition duration-300"
            />
          </div>

          <div className="relative">
            <label className=" text-white mb-2 flex items-center">
            <i className="fas fa-lock"></i>
            Password
            </label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage('');
                }}
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white 
                           placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                           transition duration-300 pr-12"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white 
                           focus:outline-none"
              >
                {showPassword ? <i className="fas fa-eye-slash"></i>
 :<i className="fas fa-eye"></i>
            }
              </button>
            </div>
          </div>

          {/* <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input 
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="mr-2 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="text-gray-300">
                Remember me
              </label>
            </div>
            <a href="#" className="text-blue-300 hover:text-blue-200 transition duration-300">
              Forgot password?
            </a>
          </div> */}

         {!isLoading?
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 
                       transition duration-300 transform hover:scale-[1.02] flex items-center 
                       justify-center space-x-2"
          >
          <i className="fas fa-lock"></i>
          Login
          </button>:
          <div className="fa-3x" className='flex justify-center items-center self-center'>
                  <i className="fas fa-circle-notch fa-spin"></i>
             </div>}

        </form>

        <div className="text-center">
          <p className="text-gray-400 mt-4">
            {/* Don't have an account?  */}
            <a href="#" className="text-blue-300 ml-2 hover:text-blue-200">
              Contact Administrator
            </a>
          </p>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div 
          className="absolute top-10 right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse"
        />
        <div 
          className="absolute bottom-20 left-10 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-pulse"
        />
      </div>
    </div>
  );
};

export default AdminLogin;