import React, { useState, useEffect } from "react";

const Alert = ({ message, type = "error", onClose, duration = 5000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose && onClose();
      }, duration);
      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [duration, onClose]);

  if (!visible || !message) return null;

  return (
    <div
      className={`fixed top-[4%] rounded-lg  left-[40%] w-[300px] mx-auto self-center z-50 p-4 ${
        type === "error" ? "bg-red-500 text-white" : "bg-green-500 text-white"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-lg font-serif">{message}</span>
        <button
          onClick={() => {
            setVisible(false);
            onClose && onClose();
          }}
          className="ml-4 font-bold text-lg"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Alert;
