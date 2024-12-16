import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import Navbar from '../Components/Navbar';
import { AdminApi } from '../Authentication/Axios';

const ContactPage = ({displaySideBar,isSideBar}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    isRead:0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // In a real application, you'd send this data to a backend
    try{
    const response=await AdminApi.post('api/Review/',formData)
    console.log(response)
    alert('Message sent! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      isRead:0
    });
  }catch(error){
    console.log(error)
  }
  };

  return (
    <div className='h-screen overflow-hidden w-screen'>
      <Navbar isSideBar={isSideBar} displaySideBar={displaySideBar}/>
    <div className="container mx-auto px-4 py-8 h-full overflow-y-auto ">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Contact Information</h2>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <Phone className="mr-3 text-blue-600" />
              <span className='text-slate-600'> +254113765336</span>
            </div>
            
            <div className="flex items-center text-slate-700">
              <Mail className="mr-3 text-blue-600" />
              <span className='text-slate-600'>info@Mugomarblesbakerye.com</span>
            </div>
            
            <div className="flex items-center text-slate-500">
              <MapPin className="mr-3 text-blue-600" />
              <span>  Machakos Town,Machakos </span>
            </div>
            
            <div className="flex items-center">
              <Clock className="mr-3 text-blue-600" />
              <div className='text-slate-600'>
                <p>Mon-Thu: 6am - 11pm</p>
                <p>Fri-Sat: 6am - 11pm</p>
                <p>Sun: 6pm - 11pm</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-16">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Send Us a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded text-black"
                placeholder="Your Name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded text-black"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block mb-2">Phone (Optional)</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded text-black"
                placeholder="(123) 456-7890"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block mb-2">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full p-2 border rounded text-black"
                placeholder="Tell us how we can help you..."
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ContactPage;