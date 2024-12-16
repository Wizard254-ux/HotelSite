import React, { useState } from 'react';
import { useAuth } from '../Authentication/AuthProvider';
import { ClientApi } from '../Authentication/Axios';
const OrderConfirmationOverlay = ({ cart, total, onClose,setCart,setTotal }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isInitiating,setInitiating]=useState(false)
  const [tableNo,setTabelNo]=useState('')
  const [location,setLocatiion]=useState('')
      const {Client}=useAuth()
  
  const tableNumbers=[
    1,2,3,4,5,6,
  ]

  // Group cart items by name and count
  const groupedItems = cart.reduce((acc, item) => {
    const existing = acc.find(groupedItem => groupedItem.name === item.name);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ ...item, count: 1 });
    }
    return acc;
  }, []);

  // Phone number validation
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    // Basic phone number validation (10 digits)
    setIsPhoneValid(/^\d{10}$/.test(value));
  };

  // location  validation
  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocatiion(value);
  };



  

  // Payment initiation handler
  const handlePayment =async () => {
    if (isPhoneValid) {
      setInitiating(true)
      // TODO: Implement actual payment logic
      console.log('grouped items',groupedItems,Client)
      const data={
        'foodNames':JSON.stringify(groupedItems),
        'phoneNumber':phoneNumber,
        'totalAmount':parseInt(total),
        'isDeliverd':0,
        'location':location,
        'tableNo':1,
        'isPaid':0,
        'status':'Order Placed',
        'user':Client.userId
        
      }
      console.log('my data ',data)

      try {
        const res = await ClientApi.post('add/Order/',data)
        console.log(res)
        setCart([])
        setTotal(0)
        setInitiating(false)
        onClose()
     
      }
      catch(error){
          console.error('Error fetching categories:', error)
          setInitiating(false)
          alert(`A problem occured during processing payment please try again: ${phoneNumber}`);
      }
     
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-500 text-white p-8 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
       {!isInitiating?
       <>
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">Order Summary</h2>
        
        <div className="mb-4">
          {groupedItems.map((item, index) => (
            <div key={index} className="flex justify-between mb-2">
              <span>{item.name} {item.count > 1 ? `x${item.count}` : ''}</span>
              <span>ksh {(item.price * item.count).toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="font-bold text-xl flex justify-between border-t pt-2 mb-4">
          <span>Total</span>
          <span>ksh {total}</span>
        </div>

        {/* Phone Number Input */}
        <div>

        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block mb-2">
            Enter Phone Number for Payment
          </label>
          <input 
            type="tel"
            id="phone"
            value={phoneNumber}
            onChange={handlePhoneChange}
            placeholder="10 digit phone number"
            className="w-full p-2 border font-semibold rounded bg-gray-700 text-white"
            maxLength="10"
          />
          {phoneNumber && !isPhoneValid && (
            <p className="text-red-500 text-sm mt-1">
              Please enter a valid 10-digit phone number
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block mb-2">
            Enter Location
          </label>
          <input 
            id="location"
            value={location}
            onChange={handleLocationChange}
            placeholder="Enter location"
            className="w-full p-2 border font-semibold bg-gray-700 rounded text-white"
          />

        </div>

        {/* Payment Button */} 
        <button 
          onClick={handlePayment}
          disabled={!isPhoneValid}
          style={{fontSize:17}}
          className={`w-full py-3  rounded-lg ${
            isPhoneValid
              ? 'bg-green-500 hover:bg-green-600 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Initiate Payment
        </button>

        {/* Close Button */}
        <button 
        style={{fontSize:18}}
          onClick={onClose}
          
          className="w-full font-semibold  mt-2 py-2 bg-gray-600 rounded-lg hover:text-black hover:bg-gray-300"
        >
          Close
        </button></>
        :
        <div className="flex items-center justify-center min-h-full bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg text-center">
          <div className="flex justify-center mb-4">
          <i className="fas fa-mobile-alt text-blue-500 text-6xl animate-pulse"></i>
  
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800">
            Waiting for Confirmation
          </h2>
          
          <p className="text-gray-600 mb-6">
            Please check your phone to confirm the payment
          </p>
          
          <div className="flex items-center justify-center space-x-4 bg-gray-100 p-4 rounded-lg">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-700 font-medium">
              Processing payment...
            </span>
          </div>
        </div>
      </div>
        }
      </div>
    </div>
  );
};

export default OrderConfirmationOverlay;