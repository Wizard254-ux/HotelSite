import React, { useState,useEffect,useRef } from 'react';
import Navbar from '../Components/Navbar';
import MenuItemOverlay from '../Components/MenuItemDetails';
import OrderConfirmationOverlay from '../Components/OrderConfirmationOverlay';
import { ClientApi } from '../Authentication/Axios';
import { AdminApi } from './../Authentication/Axios';
import { useAuth } from '../Authentication/AuthProvider';
import AuthForm from '../Components/Form';
import Alert from '../Components/Alert';

const RestaurantMenu = ({displaySideBar,isSideBar}) => {
    
  // Sample menu data
  const [menuData,setMenudata] =useState([])

  // Cart state
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isOrderConfirming, setIsOrderConfirming] = useState(false);
  const [filteredItems,setFilterdItems]=useState([])
  const [total, setTotal] = useState(0);
    const [showOverlay, setShowOverlay] = useState(false);
  
    const {isClientAuthorized}=useAuth()
  
    const handleCloseOverlay = () => {
      setShowOverlay(false);
    };
  



  // const filteredItems = menuData[selectedCategory].filter((item) =>
  //   item.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  

  // Filter items based category and search term


  const imageRefs = useRef([]);
  const [visibleImages, setVisibleImages] = useState({});

  useEffect(() => {
    // Create the Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        const newVisibleImages = {};

        entries.forEach((entry) => {
          // Use the entry's target ID to track individual image visibility
          newVisibleImages[entry.target.id] = entry.isIntersecting && entry.intersectionRatio >= 0.3;
        });

        // Update state with new visibility information
        setVisibleImages(prev => ({
          ...prev,
          ...newVisibleImages
        }));
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // 30% visibility threshold
      }
    );

    // Observe all image refs
    imageRefs.current.forEach((ref, index) => {
      if (ref) {
        // Add unique ID to each image
        ref.id = `menu-image-${index}`;
        observer.observe(ref);
      }
    });

    // Cleanup observer
    return () => {
      observer.disconnect();
    };
  }, [filteredItems]);

 useEffect(()=>{
       const fetchFoodItems=async()=>{
           try{
            const response = await ClientApi.get('add/foodItem/')
            console.log(response)
            setMenudata(response['Data']) 
            setFilterdItems(response['Data'])           
           }catch(error){
            console.log(error)
           }
       };fetchFoodItems()
    },[])


  
    useEffect(() => {
      const filterItems = () => {
        let filtered = menuData;
    
        if (selectedCategory) {
          filtered = filtered.filter((item) => item.categoryName === selectedCategory);
        }
    
        if (searchTerm) {
          filtered = filtered.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
    
        setFilterdItems(filtered);
      };
    
      filterItems();
    }, [menuData, selectedCategory, searchTerm]);
  // Add item to cart
  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  // Calculate total
  useEffect(() => {
    const calculatedTotal = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);
    setTotal(calculatedTotal);
}, [cart]);

  const openItemDetails = (item) => {
    setSelectedItem(item);
  };

  // Close item details overlay
  const closeItemDetails = () => {
    setSelectedItem(null);
  };

  const handleConfirmOrder = () => {
    if(!isClientAuthorized){
      setShowOverlay(true)
      console.log(showOverlay)
      return
    }
    setIsOrderConfirming(true);
  };

  const resetMenuItems=()=>{
     setFilterdItems(menuData)
     setSelectedCategory(null)
     setSearchTerm('')
  }

  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const triggerError = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };
  
  return (
    <div className='h-screen overflow-hidden w-screen'>
    <Navbar isSideBar={isSideBar} displaySideBar={displaySideBar}/>
     {/* Render the overlay if an item is selected */}
     {selectedItem && (
        <MenuItemOverlay 
          item={selectedItem} 
          onClose={closeItemDetails} 
        />
      )}


{showAlert && (
        <Alert
          message={alertMessage}
          type="error"
          onClose={() => setShowAlert(false)}
        />
      )}

      <AuthForm triggerError={triggerError} setIsOrderConfirming={setIsOrderConfirming}  handleCloseOverlay={handleCloseOverlay} showOverlay={showOverlay} setShowOverlay={setShowOverlay}/> 

      {isOrderConfirming && (
    <OrderConfirmationOverlay 
      cart={cart} 
      total={total} 
      setCart={setCart}
      setTotal={setTotal}
      onClose={() => setIsOrderConfirming(false)}
    />
  )}

    <div className=" h-full overflow-hidden w-full  border-t-2  border-yellow-400  text-blac pb-8 pt-1 flex flex-row gap-8">

        <div className='flex  w-[30%] gap-2 md:gap-4  flex-col h-[100%] '>
          {!isClientAuthorized&&
        <button
        onClick={()=>setShowOverlay(true)} 
     className="w-full max-w-[20rem] self-center h-9 rounded-md   bg-slate-400 text-white  flex items-center justify-center font-bold shadow-md hover:bg-black">
       Login
     </button>
    }
        <button
        onClick={resetMenuItems} 
     className="w-full max-w-[20rem] self-center h-10 rounded-md   bg-yellow-400 text-white  flex items-center justify-center font-bold shadow-md hover:bg-yellow-500">
       Reset Menu
     </button>

      {/* Menu categories */}
      <div className="bg-gray-500 p-4 md:h-[35%] max-w-[20rem] w-full self-center overflow-y-auto h-[33%] rounded-lg">
        <h1 className="text-xl font-bold border-b-2 border-yellow-400 mb-2 text-black">Categories</h1>
        <ul className="space-y-2">
         {[...new Set(menuData.map(category => category.categoryName))].map((categoryName, index) => (
  <li
    key={index}  // Using index as key since the category name is unique now
    style={{ fontWeight: 500, fontSize: 18 }}
    className={`cursor-pointer hover:bg-gray-200 px-4 py-1 hover:text-black bg-gray-400 rounded-md ${
      selectedCategory === categoryName ? 'bg-yellow-400 text-white' : ''
    }`}
    onClick={() => setSelectedCategory(categoryName)}
  >
    {categoryName}
  </li>
))}
        </ul>
      </div>

        {/* Cart */}
        <div className="bg-gray-500 h-[49%] md:h-[42%] self-center w-full max-w-[20rem] overflow-y-auto p-4   rounded-lg">
           
        <h2 className="text-xl font-bold  border-b-2 border-yellow-400 text-black"> Cart <i className="fa-solid fa-cart-shopping"></i></h2>
        {cart.length === 0 ? (
          <p style={{fontWeight:500}} className='mt-2'>Your cart is empty.</p>
        ) : (
          <div className='mt-2'>
            <ul className="">
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <div>
                    <h4 className="text-base font-medium">{item.name}</h4>
                    <p className="text-white">${item.price.toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t pt-4 mt-2 mb-10">
              <p className="text-lg font-medium">Total: ksh {total}</p>
              <button     onClick={handleConfirmOrder}
                className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-1 px-4 rounded-md mt-2">
                Confirm 
              </button>
            </div>
          </div>
        )}
      </div>
      </div>


      {/* Menu items */}
      <div className="col-span-2 w-[70%] flex flex-col pr-11 md:pr-0">
      <input
          type="text"
          placeholder="Search menu items..."
          className="bg-gray-500 text-white p-2 rounded-lg  mb-4 "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex flex-row flex-wrap gap-4 justify-center items-center  overflow-y-auto">
          {filteredItems.map((item, index) => (
            <div key={index} className="flex flex-col w-72 h-72 items-center">
                    <img 
                  ref={(el) => {
                    // Create a mutable array of refs
                    imageRefs.current[index] = el;
                  }}
                  src={`${AdminApi.defaults.baseURL+item.image}`} 
                  alt={item.name} 
                  onClick={() => openItemDetails(item)} 
                  className={`
                    w-full h-32 object-cover rounded-lg mb-2 md:mr-0 
                    transform duration-500  hover:scale-110
                    ${visibleImages[`menu-image-${index}`] ? 'scale-100' : 'scale-0'}
                  `} />
                 <h3 className="text-lg font-medium">{item.name}</h3>
              <p className="text-gray-500">ksh {item.price.toFixed(2)}</p>
              <button
                className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-2 px-4 rounded-md mt-2"
                onClick={() => addToCart(item)}
              >
                Add to Cart
              </button>
          </div>
        ))}
      </div>

    
    </div>
    </div>
    </div>
  );
};

export default RestaurantMenu;