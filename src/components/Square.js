import React from "react";

const Square = ({ value, onClick }) => {
  return (
    <button
      className="aspect-square bg-blue-300 border border-white text-lg sm:text-2xl font-bold flex items-center justify-center hover:bg-blue-400 hover:cursor-pointer"
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;
