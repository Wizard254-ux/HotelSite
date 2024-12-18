import { useState } from 'react'
import './index.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Menu from './Pages/Menu'
import Admin from './Pages/Admin'
import AdminLogin from './Pages/Login'
import { AuthProvider } from './Authentication/AuthProvider'
import ProtectedRoute from './Authentication/ProtectedRoute'
import RestaurantBlog from './Pages/Blog'
import AboutPage from './Pages/AboutUs'
import ContactPage from './Pages/ContactUs'
import MyOrders from './Pages/MyOrders'
import NotFoundPage from './Pages/NotFound'
import Kitchen from './Pages/Kitchen'
function App() {
  const [count, setCount] = useState(0)
  const [isSideBar,displaySideBar]=useState(false)
 

  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path='/'  element={<Home isSideBar={isSideBar} displaySideBar={displaySideBar}/>}/>
        <Route path='/Menu' element={<Menu displaySideBar={displaySideBar} isSideBar={isSideBar}/>}/>
        <Route path="/Admin" element={
                            <ProtectedRoute>
                                <Admin isSideBar={isSideBar} displaySideBar={displaySideBar} />
                            </ProtectedRoute>
                        } 
                    />
      
        <Route path='/AdminLogin' element={<AdminLogin displaySideBar={displaySideBar} isSideBar={isSideBar}/>}/>
        <Route path='/Blog' element={<RestaurantBlog displaySideBar={displaySideBar} isSideBar={isSideBar}/>}/>
        <Route path='/AboutUs' element={<AboutPage displaySideBar={displaySideBar} isSideBar={isSideBar}/>}/>
        <Route path='/ContactUs' element={<ContactPage displaySideBar={displaySideBar} isSideBar={isSideBar}/>}/>
        <Route path='/MyOrders' element={<MyOrders displaySideBar={displaySideBar} isSideBar={isSideBar}/>}/>
        <Route path='/Kitchen' element={<Kitchen displaySideBar={displaySideBar} isSideBar={isSideBar}/>}/>
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App
