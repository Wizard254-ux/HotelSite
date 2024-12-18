import React, { useState } from 'react';

const PaymentOverlay = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  

  const handleOption = (option) => {
    setModalOpen(false);
    if (option === 'delivery') {
      alert('You chose to Pay on Delivery.');
      // Handle Pay on Delivery logic here
    } else if (option === 'now') {
      alert('You chose to Pay Now.');
      // Handle Pay Now logic here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <button
        onClick={() => setModalOpen(true)}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition"
      >
        Open Payment Options
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          {/* Modal */}
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 space-y-6">
            <h2 className="text-xl font-bold text-gray-800 text-center">
              Choose Your Payment Method
            </h2>
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => handleOption('delivery')}
                className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Pay on Delivery
              </button>
              <button
                onClick={() => handleOption('now')}
                className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Pay Now
              </button>
            </div>
            <button
              onClick={() => setModalOpen(false)}
              className="w-full mt-4 px-4 py-2 text-gray-500 hover:text-gray-700 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentOverlay;
