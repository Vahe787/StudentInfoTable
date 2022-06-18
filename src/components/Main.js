import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "./Header";

const Main = () => {
  const [stud, setStud] = useState("");
  let [count, setCount] = useState(0);
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const saveStud = () => {
    if (stud) {
      count++;
      const newStud = {
        id: uuidv4(),
        stud,
        count,
      };
      setItems((items) => [...items, newStud]);
    } else {
      alert("Enter Something...");
    }

    setCount(count);
    setStud("");
  };

  const handleStud = (e) => {
    setStud(e.target.value);
  };

  return (
    <div>
      <Header saveStud={saveStud} handleStud={handleStud} />
      <div className="flex justify-center pb-5">
        <div className="shadow-xl border-2 mt-10 bg-slate-600 overflow-x-auto h-96 w-96">
          {items.map((el) => {
            return (
              <ol key={el.id} className="flex justify-center">
                <li className="text-2xl text-white">{`${el.count}.`}</li>
                <li className="text-2xl text-white ml-2">{el.stud}</li>
              </ol>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Main;
