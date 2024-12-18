import React, { useState, useEffect, useRef, useCallback } from 'react';
import ViewOrders from '../Components/ViewOrders';
import ViewFoodItems from '../Components/ViewFoodItems';
import { useAuth } from '../Authentication/AuthProvider';
import AddFoodItem from '../Components/AddFoodItems';
import TakenOrders from '../Components/TakenOrders';
import { AdminApi } from '../Authentication/Axios';
import AdminMessagesTab from '../Components/ClientMessages';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('add-food');
  const [delivedOrders, setDeliverdorders] = useState([]);
  const [orderData, setData] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newOrdersCount, setNewOrdersCount] = useState(0);
  const audioRef = useRef(null);
  const isFirstRender = useRef(true);
  const intervalRef = useRef(null);
  const [unseenOrders,setUnseenOrders]=useState(0)
  const [tone,setTone]=useState(false)
  const {logout}=useAuth()

  
  // Audio Notification Handler
  const playNotificationSound = useCallback(() => {
    try {
      if (audioRef.current) {
        const audioElement = audioRef.current;
       if (audioElement.src){

         audioRef.current.currentTime = 0;
         audioRef.current.play()
         setTone(true)
           .catch(error => {
             console.error('Error playing audio:', error);
           });
         setTimeout(()=>{
          audioRef.current.pause()
          audioRef.current.currentTime=0;
          setTone(false)
         },50000)
       }else {
        console.error('No valid audio source');
      }
       }
    } catch (error) {
      console.error('Notification sound error:', error);
    }
  }, []);

  // Fetch Food Items
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await AdminApi.get('add/foodItem/');
        setFoodItems(response['Data'] || []);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };
    fetchFoodItems();
  }, []);

  // Fetch Food Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await AdminApi.get('api/category/');
        const myList = res['Data']?.map(item => ({
          name: item.categoryName,
          id: item.id
        })) || [];
        setFoodCategories(myList);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Orders Polling
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await AdminApi.get('add/Order/');
        console.log(response)
        // Set order data
        setData(response);

        // Check for new orders
        if (isFirstRender.current) {
          isFirstRender.current = false;
          setOrders(response);
        } else if (response.length > orders.length) {
          const newOrders = response.length - orders.length;
          setNewOrdersCount(newOrders);
          if(activeTab!=='view-orders'){
            setUnseenOrders(newOrders)
          }
          playNotificationSound();

        }

        // Update orders
        setOrders(response);

      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    // Start interval polling
    intervalRef.current = setInterval(fetchOrders, 5000);

    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [playNotificationSound, orders]);

  useEffect(()=>{
    
 if(activeTab=='view-orders'&&unseenOrders>0){
  setUnseenOrders(0)
 }
  },[activeTab])

  const handleTone=()=>{
    setTone(false)
    const audioElement = audioRef.current;
    audioElement.pause();
    audioElement.currentTime=0;
  }

  return (
    <div className="h-screen mx-auto p-6 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef} 
        src="/src/assets/Audio/christmas-14272.mp3"
        preload="auto"
        onError={(e) => console.error('Audio error:', e)}
        

      />

      <div className="h-[24%] sm:h-[18%]">
        <div className='flex flex-row justify-between px-4'>
          <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
          <h1 className='text-3xl font-bold mb-6 text-blue-500'>Welcome Mugo</h1>
          <span  onClick={handleTone} className='bg-white fixed hover:cursor-pointer text-black h-8 w-9  sm:h-11 sm:w-11 rounded-full right-9 flex justify-center '><i className={`fa-solid ${tone?'fa-play':'fa-pause'} text-black self-center`}></i></span>
        </div>
        
        <div className="flex mb-4  overflow-x-auto">
          {[
            { key: 'add-food', label: 'Add Food Item' },
            { key: 'view-food', label: 'View Food Items' },
            { key: 'view-orders', label: 'View Orders' },
            { key: 'served-orders', label: 'View Served Orders' },
            { key: 'Reviews', label: 'Reviews' }
          ].map(({ key, label }) => (
            <button 
              key={key}
              className={`px-4 font-semibold py-2 mr-2 relative z-10 ${
                activeTab === key 
                  ? (key === 'served-orders' ? 'bg-red-500' : 'bg-blue-500') + ' text-white'
                  : 'bg-gray-200 text-black'
              }`}
              onClick={() => setActiveTab(key)}
            >
              {label}
              {label==='View Orders'?<span className={`absolute  transform duration-300 ease-in-out bg-blue-500 top-1 rounded-full w-[22%] z-50 right-1 ${activeTab=='view-orders'&&'bg-white text-black'}`}>{unseenOrders}</span>:''}
            </button>
          ))}
            {true&&
        <button onClick={logout}><span  className=" hover:cursor-pointer block py-3 px-4 md:bg-red-400 hover:bg-red-600 hover:text-black text-xl rounded-md transition-colors duration-300"><i className="fa fa-sign-out" aria-hidden="true"></i> Logout
</span></button>}
        </div>
      </div>
      
      <div className="bg-gray-600 h-[79%] sm:h-[84%] shadow-md rounded-lg p-6 flex-1 overflow-y-auto">
        {activeTab === 'add-food' && (
          <AddFoodItem 
            foodCategories={foodCategories} 
            setFoodCategories={setFoodCategories}
          />
        )}
        {activeTab === 'view-food' && (
          <ViewFoodItems 
            foodItems={foodItems} 
            setFoodItems={setFoodItems}
          />
        )}
        {activeTab === 'view-orders' && (
          <ViewOrders 
            data={orderData} 
            delivedOrders={delivedOrders} 
            setDeliverdorders={setDeliverdorders} 
          />
        )}
        {activeTab === 'served-orders' && (
          <TakenOrders delivedOrders={delivedOrders}/>
        )}
        {activeTab === 'Reviews' && (
          <AdminMessagesTab delivedOrders={delivedOrders}/>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;