import React, { useState } from 'react';
import { ChefHat, Calendar, Tag, MessageCircle, Book, Quote } from 'lucide-react';

const RestaurantBlog = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const blogPosts = [
    {
      id: 1,
      title: "The Art of Culinary Innovation",
      author: "Chef Maria Rodriguez",
      date: "June 15, 2024",
      excerpt: "Exploring the delicate balance between traditional techniques and modern creativity in our kitchen.",
      categories: "Chef's Corner",
      imageUrl: "/api/placeholder/800/500",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Sustainable Sourcing: Our Commitment",
      author: "David Chen, Sourcing Manager",
      date: "May 22, 2024",
      excerpt: "How we're revolutionizing our ingredient procurement to support local farmers and reduce environmental impact.",
      categories: "Sustainability",
      imageUrl: "/api/placeholder/800/500",
      readTime: "4 min read",
    },
    {
      id: 3,
      title: "Behind the Scenes: Kitchen Secrets",
      author: "Executive Chef Thomas Williams",
      date: "April 10, 2024",
      excerpt: "An insider's look at the intricate processes that transform raw ingredients into culinary masterpieces.",
      categories: "Chef's Corner",
      imageUrl: "/api/placeholder/800/500",
      readTime: "6 min read",
    }
  ];

  const categories = [
    'All', 
    "Chef's Corner", 
    "Culinary Arts", 
    "Sustainability", 
    "Community", 
    "Kitchen Insights"
  ];

  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.categories.includes(activeCategory));

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-yellow-50 py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Savory Stories <ChefHat className="inline-block ml-2" size={40} />
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover the passion, creativity, and stories behind our culinary journey
        </p>
      </div>

      {/* Category Filter */}
      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300
                ${activeCategory === category 
                  ? 'bg-yellow-400 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-yellow-100'}
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div 
            key={post.id} 
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Post Image */}
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-48 object-cover"
            />

            {/* Post Content */}
            <div className="p-6">
              {/* Categories */}
              <div className="flex gap-2 mb-3">
                {post.categories.map((cat) => (
                  <span 
                    key={cat} 
                    className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full"
                  >
                    <Tag className="inline-block mr-1" size={12} /> {cat}
                  </span>
                ))}
              </div>

              {/* Post Title */}
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                {post.title}
              </h2>

              {/* Post Excerpt */}
              <p className="text-gray-600 mb-4">
                {post.excerpt}
              </p>

              {/* Post Meta */}
              <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  {post.date}
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle size={16} />
                  {post.comments} Comments
                </div>
                <div className="flex items-center gap-2">
                  <Book size={16} />
                  {post.readTime}
                </div>
              </div>

              {/* Read More Button */}
              <button className="mt-4 w-full bg-yellow-400 text-white py-2 rounded-md hover:bg-yellow-500 transition-colors">
                Read Full Story
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Quote Section */}
      <div className="bg-yellow-50 py-16 mt-12 text-center">
        <Quote className="mx-auto text-yellow-400 mb-4" size={50} />
        <blockquote className="text-2xl italic text-gray-700 max-w-2xl mx-auto px-4">
          "Cooking is an art, a passion that transforms simple ingredients into memories that last a lifetime."
        </blockquote>
        <p className="mt-4 text-gray-600">- Chef Maria Rodriguez</p>
      </div>

      {/* Newsletter Signup */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Stay Connected with Our Culinary Journey
        </h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Subscribe to our newsletter and get exclusive insights, recipes, and stories delivered straight to your inbox.
        </p>
        <div className="max-w-md mx-auto flex">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-grow px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button className="bg-yellow-400 text-white px-6 py-3 rounded-r-md hover:bg-yellow-500 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantBlog;