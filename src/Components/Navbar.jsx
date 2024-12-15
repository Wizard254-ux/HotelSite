import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Authentication/AuthProvider'

function Navbar({displaySideBar,isSideBar}) {
    const navigate=useNavigate()
        const {isClientAuthorized,logoutClient}=useAuth()
    

    const goTo=(page)=>{
        navigate(page)
        displaySideBar(false)

    }

  return (
    <>
     {/* Overlay */}
     {isSideBar && (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
            onClick={() => displaySideBar(false)}
        />
    )}
<nav className="flex flex-row justify-between gap-3 items-center px-5 pt-2 pb-4" onClick={(e)=>e.stopPropagation()}>
    <div className="rounded-full justify-center flex flex-row gap-3 items-center">
        <img 
            className="w-[60px] h-[60px] rounded-full bg-transparent" 
            src="https://image.similarpng.com/very-thumbnail/2021/07/Chef-restaurant-logo-illustrations-template-on-transparent-background-PNG.png" 
            alt="" 
        />

    <h1 className="text-3xl  font-bold tracking-wide">Alpha Bakehouse
    </h1>
    </div> 


    <ul className={`
        md:flex md:flex-row md:bg-transparent md:relative md:w-auto md:h-auto md:justify-center md:space-x-6 md:py-4
        fixed top-0 left-0 h-full w-[50%] bg-black justify-start z-50 md:z-0
        flex flex-col 
        transform transition-transform duration-300
        ${isSideBar ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
    `}>
        <li><span onClick={()=>goTo('/')}  className="block hover:cursor-pointer py-3 px-4 mt-4 md:mt-0 md:bg-yellow-400 hover:bg-gray-400 hover:text-black text-xl rounded-md transition-colors duration-300">
            <i className="fas fa-home mr-2"></i> Home
        </span></li>
<li onClick={()=>goTo('/Menu')}><span  className="md:buttons hover:cursor-pointer block py-3 px-4 md:bg-yellow-400 hover:bg-gray-400 hover:text-black text-xl rounded-md transition-colors duration-300">      <i className="fas fa-utensils mr-2"></i> Menu
</span></li>    
{/* <li><a  className="md:buttons block py-3 px-4 md:bg-yellow-400 hover:bg-gray-400 hover:text-black text-xl rounded-md transition-colors duration-300">      <i className="fas fa-list mr-2"></i> Categories
</a></li> */}
{/* <li onClick={()=>goTo('/Blog')}><span  className="md:buttons hover:cursor-pointer block py-3 px-4 md:bg-yellow-400 hover:bg-gray-400 hover:text-black text-xl rounded-md transition-colors duration-300">      <i className="fas fa-blog mr-2"></i> Blog
</span></li> */}
        <li onClick={()=>goTo('/AboutUs')}><span  className="md:buttons hover:cursor-pointer block py-3 px-4 w-full md:bg-yellow-400 hover:bg-gray-400 hover:text-black text-xl rounded-md transition-colors duration-300">      <i className="fas fa-info-circle mr-2"></i> About
</span></li>
{/* <li><a  className="block py-3 px-4 hover:bg-gray-400 hover:text-black text-xl transition-colors duration-300">Review</a></li> /}
{/ <li><a  className="block py-3 px-4 hover:bg-gray-400 hover:text-black text-xl transition-colors duration-300">Team</a></li> */}

<li onClick={()=>goTo('/ContactUs')}><span  className="md:buttons hover:cursor-pointer block py-3 px-4 md:bg-yellow-400 hover:bg-gray-400 hover:text-black text-xl rounded-md transition-colors duration-300">      <i className="fas fa-envelope mr-2"></i> Contact
</span></li>

{isClientAuthorized&&
        <li onClick={()=>goTo('/MyOrders')}><span  className="md:buttons hover:cursor-pointer block py-3 px-4 w-full md:bg-yellow-400 hover:bg-gray-400 hover:text-black text-xl rounded-md transition-colors duration-300">      <i className="fas fa-info-circle mr-2"></i> View Orders
</span></li>}
<li onClick={()=>goTo('/Admin')}><span  className="md:buttons hover:cursor-pointer block py-3 px-4 md:bg-yellow-400 hover:bg-gray-400 hover:text-black text-xl rounded-md transition-colors duration-300">      <i class="fa-solid fa-user mr-3"></i>Admin
</span></li>
{isClientAuthorized&&
        <li onClick={logoutClient}><span  className="md:buttons hover:cursor-pointer block py-3 px-4 w-full md:bg-red-400 hover:bg-red-600 hover:text-black text-xl rounded-md transition-colors duration-300">     <i className="fa fa-sign-out mr-2" aria-hidden="true"></i> Logout
</span></li>}

</ul>


    <button 
        onClick={() => displaySideBar(prev => !prev)} 
        className={`mb-6 hover:cursor-pointer md:hidden ${isSideBar==true?'rotate-90':''} transition-transform duration-300`}
    >
        <i className="fa-solid fa-bars text-2xl"></i>
    </button>
</nav>
</>

)
}

export default Navbar