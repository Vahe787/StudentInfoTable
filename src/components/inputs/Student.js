import React from "react";

const Student = ({ stud, handleClick }) => {
  return (
    <input
      value={stud}
      onChange={handleClick}
      className="text-2xl shadow-xl text-gray-500 text-center p-2 border outline-none placeholder-gray-300"
      placeholder="Enter Student Name..."
    />
  );
};

export default Student;
