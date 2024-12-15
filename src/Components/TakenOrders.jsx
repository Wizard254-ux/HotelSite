import React, { useEffect, useState } from 'react';

const TakenOrders = ({delivedOrders}) => {
  const [searchTerm,setSearchTerm]=useState('')
   const [allOrders, setAllOrders] = useState([]);
   const [viewOrders, setViewOrders] = useState([]);

   useEffect(()=>{
    setAllOrders(delivedOrders)
    setViewOrders(delivedOrders)
   },[])

   const handleSearchChange = (e) => {
    const value = e.target.value;
    // alert(searchTerm)

    

    setSearchTerm(value);
    if (searchTerm.trim()===''){
        setViewOrders(allOrders)
        return
    }
    let data = allOrders.filter((item) =>item.phoneNumber.includes(value.toLowerCase())||item.itemId.toLowerCase().includes(value.toLowerCase()));
    setViewOrders(data)
    
    

  }  
  const clearSearch = () => {
    setSearchTerm('');
    setViewOrders(allOrders); // Reset to original orders

  };
   
  
    return (
      <>
       <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Search Orders</h1>
      <div className="relative">
        <input 
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Type Order id or PhoneNumber to Search"
          className="w-full px-4 py-2 pl-10 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
       
        <i style={{fontSize:20}} className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        {searchTerm && (
          <button 
            onClick={clearSearch} 
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <i style={{fontSize:20}} className="fa-solid fa-x text-gray-400 hover:text-gray-600"></i>
          </button>
        )}
      </div>

    </div>
      <div>
        
        <h2 className="text-2xl font-semibold mb-4">Paid Orders</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-red-500 text-white">
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">foods</th>
              <th className="border p-2 text-right ">Total</th>
              <th className="border p-2 text-right ">Order Id</th>
              <th className="border p-2 text-right ">Client No</th>
            </tr>
          </thead>
          <tbody>
            {viewOrders.map((order) => (
              <tr key={order.id}>
                <td className="border p-2">{order.id}</td>
                <td className="border p-2">{order.date}</td>
                <td className="border p-2">
                  {order.foods.map(item => 
                    `${item.name} (x${item.quantity})`
                  ).join(', ')}
                </td>
                <td className="border p-2 text-right">Ksh {order.total.toFixed(2)}</td>
                <td className="border p-2 text-right font-semibold text-xl">{order.itemId}</td>
                <td className="border p-2 text-right font-semibold text-xl">{order.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </>
    );
  };

  export default TakenOrders