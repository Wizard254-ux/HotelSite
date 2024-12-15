import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ClientApi } from '../Authentication/Axios';
import Navbar from '../Components/Navbar';
const MyOrders = ({displaySideBar,isSideBar}) => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const intervalRef = useRef(null);
  const isFirstRender = useRef(true);

  // Fetch orders with interval polling
  const fetchOrders = useCallback(async () => {

    try {
      const response = await ClientApi.get('add/Order/');
      
      // Check for first render
      if (isFirstRender.current) {
        isFirstRender.current = false;
        setOrders(response);
        setFilteredOrders(response);
      }

      // Update orders
      setOrders(response);
      setFilteredOrders(response);

    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }, []);

  // Set up interval polling
  useEffect(() => {
    // Initial fetch
    fetchOrders();

    // Start interval polling
    intervalRef.current = setInterval(fetchOrders, 60000);

    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchOrders]);

  // Search functionality
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      setFilteredOrders(orders);
      return;
    }

    const filtered = orders.filter((order) => 
      order.phoneNumber.includes(value.toLowerCase()) || 
      order.orderId.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
    setFilteredOrders(orders);
  };

  return (
    <div className='h-screen overflow-hidden w-screen'>
      <Navbar isSideBar={isSideBar} displaySideBar={displaySideBar}/>
    <div className="p-4 overflow-y-auto h-full">

      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-4 text-center">My Orders</h1>
        
        <div className="relative mb-4">
          <input 
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search Order ID or Phone Number"
            className="w-full px-4 py-2 pl-10 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          
          {searchTerm && (
            <button 
              onClick={clearSearch} 
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <i className="fa-solid fa-x text-gray-400 hover:text-gray-600"></i>
            </button>
          )}
        </div>

        <span className='font-semibold text-lg'>Total Orders: {filteredOrders.length}</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Items</th>
              <th className="border p-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-500">
                <td className="border p-2">{order.orderId}</td>
                <td className="border p-2">{order.created.slice(0,10)}</td>
                <td className="border p-2">{order.location || 'N/A'}</td>
                <td className="border p-2">
                  <span className={`
                    px-2 py-1 rounded 
                    ${order.status === 'Delivered' ? 'bg-green-200 text-green-800' : 
                      order.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : 
                      'bg-blue-200 text-blue-800'}
                  `}>
                    {order.status || 'Unknown'}
                  </span>
                </td>
                <td className="border p-2">
                  {order.foodNames.map(item => 
                    `${item.name} (x${item.count})`
                  ).join(', ')}
                </td>
                <td className="border p-2 text-right">Ksh {parseFloat(order.totalAmount).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default MyOrders;