import React from "react";
import Button from "./Button";
import Student from "./inputs/Student";

const textButtonClassNames =
  "  pr-5 pl-5 pt-2 pb-3 shadow-xl text-gray-500 border transition hover:bg-blue-400";

const Header = ({ handleStud, saveStud, stud }) => {
  return (
    <div className="flex justify-center mt-8">
      <Student handleClick={handleStud} stud={stud} />
      <Button
        handleClick={saveStud}
        className={textButtonClassNames}
        text="Add Player"
      />
    </div>
  );
};

export default Header;
