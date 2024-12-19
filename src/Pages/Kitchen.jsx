import React, { useState, useEffect } from 'react';
import { ClientApi } from '../Authentication/Axios';
import Navbar from '../Components/Navbar';

function Kitchen({ isSideBar, displaySideBar }) {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await ClientApi.get(`add/Order/?isStaff=${1}`);
      console.log(response)
      // Only update if new data is available
      if (response.length > orders.length) {
        setOrders(response);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchOrders();

    // Set up periodic polling every 5 seconds
    const intervalId = setInterval(fetchOrders, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Categorize orders
  const categorizeOrders = () => {
    const categorizedOrders = {};

    // Sort orders by date
    const sortedOrders = [...orders].sort((a, b) => 
      new Date(b.created) - new Date(a.created)
    );

    sortedOrders.forEach(order => {
      // Extract date
      const orderDate = new Date(order.created).toLocaleDateString();

      if (!categorizedOrders[orderDate]) {
        categorizedOrders[orderDate] = {};
      }

      // Categorize by phone number
      if (!categorizedOrders[orderDate][order.phoneNumber]) {
        categorizedOrders[orderDate][order.phoneNumber] = {};
      }

      // Aggregate food items
      order.foodNames.forEach(food => {
        const foodName = food.name;
        if (!categorizedOrders[orderDate][order.phoneNumber][foodName]) {
          categorizedOrders[orderDate][order.phoneNumber][foodName] = {
            totalQuantity: 0,
            location: order.location,
            isPaid: order.isPaid,
            status: order.status,
            orders: []
          };
        }
        
        categorizedOrders[orderDate][order.phoneNumber][foodName].totalQuantity += 
          (food.count || food.quantity || 1);
        
        categorizedOrders[orderDate][order.phoneNumber][foodName].orders.push(order);
      });
    });

    return categorizedOrders;
  };

  const renderCategorizedOrders = () => {
    const categorizedOrders = categorizeOrders();

    return Object.entries(categorizedOrders).map(([date, phoneNumbers]) => (
      <div key={date} className="mb-6">
        <h2 className="text-xl font-bold mb-4">{date}</h2>
        {Object.entries(phoneNumbers).map(([phoneNumber, foodItems]) => (
          <div key={phoneNumber} className="mb-4">
            <h3 className="text-lg font-semibold">Phone: {phoneNumber}</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 ">
                  <th className="border p-2 text-black">Food Name</th>
                  <th className="border p-2 text-black">Total Quantity</th>
                  {/* <th className="border p-2 text-black">Location</th> */}
                  {/* <th className="border p-2 text-black">Paid Status</th> */}
                  {/* <th className="border p-2 text-black">Order Status</th> */}
                </tr>
              </thead>
              <tbody>
                {Object.entries(foodItems).map(([foodName, foodData]) => (
                  <tr key={foodName} className="hover:bg-gray-600">
                    <td className="border p-2">{foodName}</td>
                    <td className="border p-2">{foodData.totalQuantity}</td>
                    {/* <td className="border p-2">{foodData.location}</td> */}
                    {/* <td className="border p-2">
                      <span className={`
                        ${foodData.isPaid ? 'text-green-600' : 'text-red-600'}
                        font-semibold
                      `}>
                        {foodData.isPaid ? 'Paid' : 'Unpaid'}
                      </span>
                    </td> */}
                    {/* <td className="border p-2">{foodData.status}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className='h-screen overflow-hidden w-screen'>
      <Navbar isSideBar={isSideBar} displaySideBar={displaySideBar}/>
      <div className="p-6 overflow-y-auto h-[calc(100vh-64px)]">
        <h1 className="text-2xl font-bold mb-6">Kitchen Orders</h1>
        {orders.length > 0 ? (
          renderCategorizedOrders()
        ) : (
          <p className="text-gray-500">No orders available</p>
        )}
      </div>
    </div>
  );
}

export default Kitchen;