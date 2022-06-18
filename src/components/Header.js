import React from "react";
import Button from "./Button";
import Student from "./inputs/Student";

const textButtonClassNames =
  "  pr-5 pl-5 pt-2 pb-3 shadow-xl text-gray-500 border transition hover:bg-blue-400";

const Header = ({ handleStud, saveStud }) => {
  return (
    <div className="flex justify-center mt-8">
      <Student handleClick={handleStud} />
      <Button
        handleClick={saveStud}
        className={textButtonClassNames}
        text="Add Students"
      />
    </div>
  );
};

export default Header;
