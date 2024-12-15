import React from 'react';
import { ChefHat, Heart, Trophy } from 'lucide-react';
import Navbar from '../Components/Navbar';

const AboutPage = ({displaySideBar,isSideBar}) => {
  return (
    <div className='h-screen overflow-hidden w-screen'>
      <Navbar isSideBar={isSideBar} displaySideBar={displaySideBar}/>
    <div className="container mx-auto px-4 py-8 bg-white h-full overflow-y-auto rounded-md">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Culinary Journey</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A passion for Cakes, a commitment to quality, and a love for bringing people together around the table.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <img 
              src="https://buildeo.co.uk/wp-content/uploads/2022/02/5-Restaurant-Interior-Design-Ideas-for-2022.jpg" 
              alt="Restaurant Interior" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2010, our restaurant began as a small family-owned kitchen with a simple dream: to create memorable dining experiences through exceptional Cakes and warm hospitality.
            </p>
            <p className="text-gray-600">
              What started as a local neighborhood spot has grown into a beloved dining destination, but our core values remain the same - fresh ingredients, creative cuisine, and genuine care for our guests.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-slate-200 p-8 rounded-lg mb-12">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <ChefHat className="mx-auto mb-4 text-blue-600" size={48} />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Craftsmanship</h3>
              <p className="text-gray-600">
                We believe in the art of cooking, treating each dish as a masterpiece crafted with precision and passion.
              </p>
            </div>
            <div className="text-center">
              <Heart className="mx-auto mb-4 text-red-600" size={48} />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Community</h3>
              <p className="text-gray-600">
                Supporting local farmers, engaging with our neighborhood, and creating a welcoming space for all.
              </p>
            </div>
            <div className="text-center">
              <Trophy className="mx-auto mb-4 text-yellow-600" size={48} />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Quality</h3>
              <p className="text-gray-600">
                We source the finest ingredients and continuously innovate to deliver an unparalleled dining experience.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className='mb-24 bg-slate-200 p-6 rounded-md'>
          <h2 className="text-3xl font-semibold text-center text-gray-800 md:mb-8">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <img 
                src="/src/assets/Images/alpha himself.jpg" 
                alt="Head Chef" 
                className="rounded-full w-48 h-48 mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-black">Brian Albert</h3>
              <p className="text-gray-600">Executive Chef</p>
            </div>
            <div className="text-center">
              <img 
                src="/src/assets/Images/edited boy.png" 
                alt="Restaurant Manager" 
                className="rounded-full w-48 h-48 mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800">Alpha </h3>
              <p className="text-gray-600">General Manager</p>
            </div>
            <div className="text-center">
              <img 
                src="/src/assets/Images/IMG-20240301-WA0014~3.jpg" 
                alt="Sous Chef" 
                className="rounded-full w-48 h-48 mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold  text-gray-800">Wilson </h3>
              <p className="text-gray-600">Sous Chef</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AboutPage;