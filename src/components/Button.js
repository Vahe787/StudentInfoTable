import React from "react";

const Button = ({ handleClick, text, icon, className }) => {
  return (
    <button onClick={handleClick} className={className}>
      {text}
      {icon}
    </button>
  );
};

export default Button;
