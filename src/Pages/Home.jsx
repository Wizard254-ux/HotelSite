import { useState } from "react"
import Navbar from "../Components/Navbar"
import { useNavigate } from "react-router-dom"

const Home=({isSideBar,displaySideBar})=>{
    const navigate=useNavigate()

    return(
        <div className="Homebody">
        <header>

       <Navbar isSideBar={isSideBar} displaySideBar={displaySideBar} />

      </header>
    
      <main>
        <section className="hero">
          <h1 className="p-0 m-0">Join Us For Delicious Yummy Cakes </h1>
          
          <div className="social-icons flex justify-center space-x-6">
      <a href="#" className="text-yellow-400 hover:text-white transition duration-300 text-2xl">
        <i style={{fontSize:30}} className=" fab fa-twitter"></i>
      </a>
      <a href="#" className="text-yellow-400 hover:text-white transition duration-300 text-2xl">
        <i style={{fontSize:30}} className="fab fa-facebook-f"></i>
      </a>
      <a href="#" className="text-yellow-400 hover:text-white transition duration-300 text-2xl">
        <i style={{fontSize:30}} className="fab fa-instagram"></i>
      </a>
      <a href="#" className="text-yellow-400 hover:text-white transition duration-300 text-2xl">
        <i style={{fontSize:30}} className="fab fa-youtube"></i>
      </a>
    </div>
          
          <p style={{maxWidth:'40rem'}} className="font-semibold">Welcome to <span style={{color:'#ffd700', fontWeight:600, fontSize:25}}>Alpha BakeHouse</span> where flavors meet perfection. Indulge in our exquisite culinary creations, crafted with the highest-quality ingredients and inspired by traditions from around the world. Whether you're craving a cozy dinner, or a refreshing drink, we promise an unforgettable dining experience. Your table awaits!</p>          <div className="buttons">
            <span onClick={()=>navigate('/Menu')} className="book-table hover:scale-110 hover:cursor-pointer transform ease-in-out duration-300" >Book a Table</span>
            <span  onClick={()=>navigate('/Menu')} className="menu hover:scale-110 transform ease-in-out hover:cursor-pointer duration-300">Our Menu</span>
          </div>
        </section>
      </main>

  <div className="  text-center m">

    <p  className="text-yellow-300 text-xl mt-4">© 2024 Your Company Name. All rights reserved.</p>
  </div>

      </div>
       )
}

export default Home