import React, { useEffect, useState,useRef } from 'react';
import { AdminApi } from '../Authentication/Axios';


const AdminMessagesTab = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);

  

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        const response = await AdminApi.get('api/Review/');
        
        // Ensure the response matches the expected structure
        const formattedMessages = response.map(msg => ({
          ...msg,
          created: new Date(msg.created),
          isRead: msg.isRead || false
        }));

        setMessages(formattedMessages);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
        setError('Failed to load messages. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    intervalRef.current = setInterval(fetchMessages, 5000);

    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, []);

  const markAsRead = async(id) => {
    try{
      setIsLoading(true);

     const res=await AdminApi.patch(`api/Review/?reviewId=${id}`,{isRead:true})
     console.log(res)
      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, isRead: true } : msg
      ));
      setError(null);

    }catch(error){
      setError('Failed to Mark as Read. Please try again.');
    }finally {
      setIsLoading(false);
    }
  };

  const deleteMessage = async(id) => {
    try{
      setIsLoading(true);

     const res=await AdminApi.delete(`api/Review/?reviewId=${id}`)
     console.log(res)
     setMessages(messages.filter(msg => msg.id !== id));
     
      setError(null);

    }catch(error){
      setError('Failed to Mark as Read. Please try again.');
    }finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <p>Loading messages...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Client Messages</h2>
      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-500">
          <thead>
            <tr className="bg-gray-500">
              <th className="border p-2">Name</th>
              <th className="border p-2">Phone Number</th>
              <th className="border p-2">Email</th>
              <th className="border p-2 w-1/3">Message</th>
              <th className="border p-2">Created</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr 
                key={msg.id} 
                className={`border ${!msg.isRead ? 'bg-gray-500' : 'bg-gray-800'}`}
              >
                <td className="border p-2">{msg.name}</td>
                <td className="border p-2">{msg.phone}</td>
                <td className="border p-2">{msg.email}</td>
                <td className="border p-2 truncate">{msg.message}</td>
                <td className="border p-2">
                  {msg.created.toLocaleDateString()}
                </td>
                <td className="border p-2">
                  <div className="flex space-x-2">
                    {!msg.isRead && (
                      <button 
                        className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                        onClick={() => markAsRead(msg.id)}
                      >
                        Mark Read
                      </button>
                    )}
                    <button 
                      className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                      onClick={() => deleteMessage(msg.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminMessagesTab;