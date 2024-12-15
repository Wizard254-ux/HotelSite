import React, { useState,useEffect } from 'react';
import { AdminApi } from '../Authentication/Axios';

const ViewOrders = ({setDeliverdorders,delivedOrders,data}) => {
   const [searchTerm,setSearchTerm]=useState('')
   const [allOrders, setAllOrders] = useState([]);
   const [viewOrders, setViewOrders] = useState([]);
   const [expandedOrderId, setExpandedOrderId] = useState(null);
   const [selectedStatus, setSelectedStatus] = useState({});

   // Predefined status options
   const statusOptions = ['Packed', 'On Way', 'Delivered'];

   const openItemDetails = (items) => {
      let data=[]
      data = items.map((item)=>
      ({
        id:item.id,
        itemId:item.orderId,
        total:parseFloat(item.totalAmount),
        phoneNumber:item.phoneNumber,
        isDeliverd:item.isDeliverd,
        date:item.created.slice(0,10),
        tableNo:item.tableNo,
        isPaid:item.isPaid,
        location:item.location,
        status: item.status || 'Pending',
        foods:item.foodNames.map((x)=>(
          {
            name:x['name'],
            quantity:x['count']
          }
        ))
      }))
      
      const delivered = data.filter((item) => item.isDeliverd === true);
      const notDelivered = data.filter((item) => item.isDeliverd === false);
      setDeliverdorders(delivered)
      
      setViewOrders(notDelivered)
      setAllOrders(notDelivered)
   };

   useEffect(() => {
      openItemDetails(data);
   }, [data]);

   const handleBtn=async(order,info)=>{
      try{
        if(info==='served'){
          const response = await AdminApi.patch(`add/Order/?orderId=${order.id}`,{isDeliverd:true})
          console.log(response)
          const data = viewOrders.filter((item) => item.id != order.id);
          setDeliverdorders(prev=>[order,...prev])
          setViewOrders(data)
        }else if(info!=='served'&&order.isPaid!==true){
          const response = await AdminApi.patch(`add/Order/?orderId=${order.id}`,{isPaid:true})
          const data=viewOrders.map(item=>
            item.id==order.id?{...item,isPaid:true}:item
          )
          setViewOrders(data)
          console.log(response)
        }
      }catch(error){
        console.log(error)
      }
   }

   // Update order status
   const handleUpdateStatus = async (orderId) => {
     const newStatus = selectedStatus[orderId];
     
     if (!newStatus) {
       alert('Please select a status');
       return;
     }

     try {
       const response = await AdminApi.patch(`add/Order/?orderId=${orderId}`, { status: newStatus });
       
       // Update local state
       const updatedOrders = viewOrders.map(order => 
         order.id === orderId ? { ...order, status: newStatus } : order
       );
       
       setViewOrders(updatedOrders);
       setAllOrders(updatedOrders);
       
       // Reset selected status
       setSelectedStatus(prev => ({...prev, [orderId]: ''}));
       
       alert('Status updated successfully');
     } catch (error) {
       console.error('Error updating status:', error);
       alert('Failed to update status');
     }
   };

   // Handle status dropdown change
   const handleStatusChange = (orderId, status) => {
     setSelectedStatus(prev => ({...prev, [orderId]: status}));
   };

   // Toggle order expansion
   const toggleOrderExpansion = (orderId) => {
     setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
     // Reset status selection when expanding/collapsing
     setSelectedStatus(prev => ({...prev, [orderId]: ''}));
   };

   const handleSearchChange = (e) => {
     const value = e.target.value;
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
       <span className='font-semibold text-lg '>Total Orders : {viewOrders.length}</span>

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
           <tr className="bg-blue-600 text-white">
             <th className="border p-2">Location</th>
             <th className="border p-2">Order ID</th>
             <th className="border p-2">Date</th>
             <th className="border p-2">Items</th>
             <th className="border p-2 text-right">Total</th>
             <th className="border p-2 text-right">Client No</th>
             <th className="border p-2">Actions</th>
           </tr>
         </thead>
         <tbody>
           {viewOrders.map((order) => (
             <>
               <tr key={order.id}>
                 <td className="border p-2">{order.location}</td>
                 <td className="border p-2">{order.itemId}</td>
                 <td className="border p-2">{order.date}</td>
                 <td className="border p-2">
                   {order.foods.map(item => 
                     `${item.name} (x${item.quantity})`
                   ).join(', ')}
                 </td>
                 <td className="border p-2 text-right">Ksh {order.total.toFixed(2)}</td>
                 <td className="border p-2 text-right font-semibold text-xl">{order.phoneNumber}</td>
                 <td className="border p-2">
                   <button 
                     onClick={() => toggleOrderExpansion(order.id)}
                     className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                   >
                     {expandedOrderId === order.id ? 'Hide Details' : 'Show Details'}
                   </button>
                 </td>
                 <td className='mr-2'>
                   {order.isPaid? <button onClick={()=>handleBtn(order,'served')}  className={`bg-blue-500 p-2 md:mt-1 ml-2 font-semibold hover:scale-110 transform ease-in-out duration-300 rounded-full '}`}>Served</button>:
                   <button onClick={()=>handleBtn(order,'paid')} className={`${order.isPaid?'bg-green-600':'bg-red-600'} bg-blue-500 p-2 md:mt-1 ml-2 font-semibold hover:scale-110 transform ease-in-out duration-300 rounded-full`}>Payed</button>}
                 </td>
               </tr>
               {expandedOrderId === order.id && (
                 <tr>
                   <td colSpan="7" className="border p-4 bg-slay-700">
                     <div className="grid grid-cols-2 gap-4">
                       <div>
                         <h3 className="font-bold mb-2">Order Details</h3>
                         <p><strong>Table Number:</strong> {order.tableNo || 'N/A'}</p>
                         <p><strong>Phone Number:</strong> {order.phoneNumber}</p>
                         <p><strong>Payment Status:</strong> {order.isPaid ? 'Paid' : 'Unpaid'}</p>
                         <p><strong>Current Status:</strong> 
                           <span className={`
                             ml-2 px-2 py-1 rounded 
                             ${order.status === 'Delivered' ? 'bg-green-400 text-green-800' : 
                               order.status === 'Packed' ? 'bg-yellow-400 text-yellow-800' : 
                               'bg-blue-200 text-blue-800'}
                           `}>
                             {order.status || 'Pending'}
                           </span>
                         </p>
                       </div>
                       <div>
                         <h3 className="font-bold mb-2">Items Breakdown</h3>
                         {order.foods.map((item, index) => (
                           <div key={index} className="flex justify-between">
                             <span>{item.name}</span>
                             <span>x{item.quantity}</span>
                           </div>
                         ))}
                       </div>
                       <div className="col-span-2 mt-4">
                         <h3 className="font-bold mb-2">Update Order Status</h3>
                         <div className="flex items-center space-x-4">
                           <select 
                             value={selectedStatus[order.id] || 'ono'}
                             onChange={(e) => handleStatusChange(order.id, e.target.value)}
                             className="border rounded p-2 flex-grow text-black"
                           >
                             <option value="">{selectedStatus[order.id]}</option>
                             {statusOptions.map((status) => (
                               <option className='bg-slate-400 text-black' key={status} value={status}>
                                 {status}
                               </option>
                             ))}
                           </select>
                           <button 
                             onClick={() => handleUpdateStatus(order.id)}
                             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                           >
                             Apply Status
                           </button>
                         </div>
                       </div>
                     </div>
                   </td>
                 </tr>
               )}
             </>
           ))}
         </tbody>
       </table>
     </div>
     </>
   );
};

export default ViewOrders;