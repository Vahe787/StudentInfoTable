import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import CheckBox from "./checkBox/CheckBox";
import Header from "./Header";
import Button from "./Button";

const textButtonClassNames =
  "  pr-5 pl-5 pt-2 pb-3 shadow-xl text-gray-500 border transition hover:bg-blue-400";

const Main = () => {
  const [stud, setStud] = useState("");
  let [count, setCount] = useState(0);
  const [group1, setGroup1] = useState([]);
  const [group2, setGroup2] = useState([]);
  const [isPresent] = useState(false);
  const [rate, setRate] = useState(0);
  const [isChanged] = useState(false);
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
        rate,
        isPresent,
        isChanged,
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

  const handleIsPresent = (id) => {
    const checkedItem = items.find((el) => el.id === id);
    const updateItems = [...items];
    if (!checkedItem.isPresent) {
      updateItems.find((el) => el.id === id).isPresent = true;
    } else {
      updateItems.find((el) => el.id === id).isPresent = false;
    }
    setItems(updateItems);
  };

  const isEvaluateStud = (id) => {
    const changedItem = items.find((el) => el.id === id);
    const updateItems = [...items];
    if (!changedItem.isCahnged) {
      updateItems.find((el) => el.id === id).isChanged = true;
    }
    setItems(updateItems);
  };

  const evaluateStud = (id) => {
    const changedItem = items.find((el) => el.id === id);
    const updateItems = [...items];
    if (changedItem.isChanged) {
      updateItems.find((el) => el.id === id).rate = rate;
      updateItems.find((el) => el.id === id).isChanged = false;
    }
    setRate("");
    setItems(updateItems);
  };

  const divideToGroup = () => {
    const studArr = [];
    let team1 = [];
    let team2 = [];

    let team1Sum = 0;
    let team2Sum = 0;

    const updateItems = [...items];

    updateItems.map((el) => {
      if (el.isPresent) {
        studArr.push(parseFloat(el.rate));
      }
    });

    if (studArr.length > 0) {
      studArr.sort().reverse();
      for (let i = 0; i < studArr.length; i++) {
        if ((!team1Sum && !team2Sum) || team1Sum === team2Sum) {
          team1.push(studArr[i]);
          team1Sum += studArr[i];
        } else if (team1Sum < team2Sum) {
          team1.push(studArr[i]);
          team1Sum += studArr[i];
        } else if (team2Sum < team1Sum) {
          team2.push(studArr[i]);
          team2Sum += studArr[i];
        }
      }
    }

    updateItems.map((el) => {
      if (team1.length > 0) {
        for (let i = 0; i < team1.length; i++) {
          if (team1[i] === parseFloat(el.rate)) {
            group1.push(el.stud);
          }
        }
      }

      if (team2.length > 0) {
        for (let i = 0; i < team2.length; i++) {
          if (team2[i] === parseFloat(el.rate)) {
            group2.push(el.stud);
          }
        }
      }
    });

    console.log(team1Sum, team2Sum);

    // console.log(team1, team2);
    // console.log(group1, group2);

    setGroup1((group1) => [...group1]);
    setGroup2((group2) => [...group2]);
  };

  return (
    <div>
      <Header saveStud={saveStud} handleStud={handleStud} />
      <div className="flex justify-center pb-5">
        <div className="shadow-xl border-2 mt-10  overflow-x-auto h-96 w-3/6">
          {items.map((el) => {
            return (
              <div key={el.id} className="flex">
                <div className="pl-5">
                  <ol className="flex justify-start">
                    <button
                      className="mt-2"
                      onClick={() => handleIsPresent(el.id)}
                    >
                      <CheckBox />
                    </button>

                    <li className="text-2xl text-slate-600 mt-3">{`${el.count}.`}</li>
                    <li className="text-2xl text-slate-600 ml-2 mt-3">
                      {el.stud}
                    </li>
                    <p className="text-2xl text-slate-600 mt-3 ml-5">
                      {el.rate}
                    </p>
                    <div
                      style={{
                        display: el.isChanged ? "block" : "none",
                        marginTop: 5,
                      }}
                    >
                      <input
                        className="shadow-xl w-20 ml-5 mt-3 text-gray-500 text-center border outline-none placeholder-gray-300"
                        onChange={(e) => setRate(e.target.value)}
                      />
                      <Button
                        handleClick={() => evaluateStud(el.id)}
                        className="p-1 ml-2 shadow-xl text-gray-500 border transition hover:bg-blue-400"
                        text="Rate"
                      />
                    </div>
                  </ol>
                </div>
                <div className="ml-auto pr-5 mt-2">
                  <Button
                    handleClick={() => isEvaluateStud(el.id)}
                    className={textButtonClassNames}
                    text="Evaluate Students"
                  />
                </div>
              </div>
            );
          })}
          <div className="flex justify-end pr-5 mt-10">
            <Button
              handleClick={divideToGroup}
              className="pr-5 pl-5 pt-2 pb-3 shadow-xl text-gray-500 border transition hover:bg-blue-400"
              text="Divide To Group"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center pb-5">
        <div className="flex shadow-xl border-2 mt-10 pl-20 pr-20 overflow-x-auto h-96 w-3/6 text-2xl text-slate-600">
          <div>
            <p className="font-bold">Team 1</p>
            {group1.map((el) => {
              return (
                <ul key={el} className="flex justify-center">
                  <li>{el}</li>
                </ul>
              );
            })}
          </div>
          <div className="ml-auto">
            <p className="font-bold">Team 2</p>
            {group2.map((el) => {
              return (
                <ul key={el} className="flex justify-center">
                  <li>{el}</li>
                </ul>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
