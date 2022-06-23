import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import CheckBox from "./checkBox/CheckBox";
import Header from "./Header";
import Button from "./Button";
import { randomIntFromInterval } from "./helper/randomIntFromInterval";
import Delete from "./icons/Delete";
import Evulate from "./icons/Evulate";
import ChangeRate from "./icons/ChangeRate";

const textButtonClassNames =
  "  pr-5 pl-5 pt-2 pb-3 shadow-xl text-gray-500 border transition hover:bg-blue-400";

const Main = () => {
  const [stud, setStud] = useState("");
  let [count, setCount] = useState(0);
  const [group1, setGroup1] = useState([]);
  const [group2, setGroup2] = useState([]);
  const [isPresent] = useState(false);
  const [rate, setRate] = useState("");
  const [isChanged] = useState(false);
  let [countForShuffle, setCountForShuffle] = useState(0);
  const [groupsDifferenceValue, setGroupsDifferenceValue] = useState("");
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
      setItems((prevState) => [...prevState, { ...newStud }]);
    } else {
      alert("Enter Something...");
    }

    setCount(count);
    setStud("");
  };

  const handleStud = (e) => {
    setStud(e.target.value);
  };

  const handleIsPresent = (id, checked) => {
    const checkedItem = items.findIndex((el) => el.id === id);
    const updateItems = [...items];
    updateItems[checkedItem].isPresent = checked;

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
    let team1 = [];
    let team2 = [];

    let team1Sum = 0;
    let team2Sum = 0;

    // updateItems.map((el) => {
    //   if (el.isPresent) {
    //     studArr.push(parseFloat(el.rate));
    //   }
    // });

    const studArr = items.filter((el) => el.isPresent);

    if (studArr.length > 0) {
      studArr.sort((a, b) => Number(a.rate) - Number(b.rate)).reverse();
      console.log(studArr);
      studArr.forEach((el) => {
        if ((!team1Sum && !team2Sum) || team1Sum === team2Sum) {
          team1.push({ stud: el.stud, rate: Number(el.rate) });
          team1Sum += Number(el.rate);
        } else if (team1Sum < team2Sum) {
          team1.push({ stud: el.stud, rate: Number(el.rate) });
          team1Sum += Number(el.rate);
        } else if (team2Sum < team1Sum) {
          team2.push({ stud: el.stud, rate: Number(el.rate) });
          team2Sum += Number(el.rate);
        }
      });
    }

    setGroup1(team1);
    setGroup2(team2);
  };

  const shuffleStud = () => {
    if (group1.length && group2.length) {
      const iterationCount = group1.length * group2.length;

      while (true) {
        if (countForShuffle > iterationCount) {
          break;
        }

        const random1 = randomIntFromInterval(0, group1.length - 1);
        const random2 = randomIntFromInterval(0, group2.length - 1);

        const sumOfNewGroup1 = group1.reduce((acc, item, index) => {
          if (index === random1) {
            acc += group2[random2].rate;
          } else {
            acc += item.rate;
          }
          return acc;
        }, 0);

        const sumOfNewGroup2 = group2.reduce((acc, item, index) => {
          if (index === random2) {
            acc += group1[random1].rate;
          } else {
            acc += item.rate;
          }
          return acc;
        }, 0);

        if (
          sumOfNewGroup1 - sumOfNewGroup2 <= groupsDifferenceValue &&
          sumOfNewGroup1 - sumOfNewGroup2 >= -groupsDifferenceValue
        ) {
          console.log(sumOfNewGroup1, sumOfNewGroup2);
          const newGroup1 = [...group1];
          const newGroup2 = [...group2];

          newGroup1[random1] = group2[random2];
          newGroup2[random2] = group1[random1];

          setGroup1(newGroup1);
          setGroup2(newGroup2);

          break;
        }
      }
      countForShuffle++;
    }

    setCountForShuffle(countForShuffle);
  };

  const deleteStud = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div>
      <Header saveStud={saveStud} handleStud={handleStud} stud={stud} />
      <div className="flex justify-center pb-5">
        <div className="shadow-xl border-2 mt-10  overflow-x-auto h-96 w-2/5">
          {items.map((el) => {
            return (
              <div key={el.id} className="flex">
                <div className="pl-5">
                  <ol className="flex justify-start">
                    <CheckBox
                      checked={el.isPresent}
                      onChange={(e) => handleIsPresent(el.id, e.target.checked)}
                    />

                    <li className="text-2xl text-slate- mt-3">{`${el.count}.`}</li>
                    <li className="text-2xl text-slate-600 ml-2 mt-3">
                      {el.stud}
                    </li>
                    <p className="text-2xl text-slate-600 ml-5 mt-3">
                      {el.rate}
                    </p>
                    <div
                      style={{
                        display: el.isChanged ? "block" : "none",
                        marginTop: 5,
                      }}
                    >
                      <input
                        value={rate}
                        className="shadow-xl w-20 ml-5 mt-3 text-gray-500 text-center border outline-none placeholder-gray-300"
                        onChange={(e) => setRate(e.target.value)}
                      />
                      <Button
                        handleClick={() => evaluateStud(el.id)}
                        className="ml-3 font-bold transition hover:text-green-400 transition hover:scale-150"
                        icon={<ChangeRate />}
                      />
                    </div>
                  </ol>
                </div>
                <div className="ml-auto pr-5 mt-4">
                  <Button
                    handleClick={() => isEvaluateStud(el.id)}
                    className="mr-2 font-bold transition hover:text-green-400 transition hover:scale-125"
                    icon={<Evulate />}
                  />
                  <Button
                    handleClick={() => deleteStud(el.id)}
                    className="font-bold transition hover:text-red-600 transition hover:scale-125"
                    icon={<Delete />}
                  />
                </div>
              </div>
            );
          })}
          <div className="flex justify-end pr-5 mt-10">
            <Button
              handleClick={divideToGroup}
              className="mb-5 pr-5 pl-5 pt-2 pb-3 shadow-xl text-gray-500 border transition hover:bg-blue-400"
              text="Divide To Group"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center pb-5">
        <div className="shadow-xl border-2  mt-10 pl-20 pr-20 overflow-x-auto h-96 w-2/5 text-2xl text-slate-600">
          <div className="flex justify-center">
            <div>
              <p className="font-bold ml-2">Team 1</p>
              {group1.map((el) => {
                return (
                  <ul key={el.rate} className="flex justify-center">
                    <li>{el.stud}</li>
                    <li className="ml-2 text-green-400">{el.rate}</li>
                  </ul>
                );
              })}
            </div>
            <div className="ml-auto">
              <input
                value={groupsDifferenceValue}
                onChange={(e) =>
                  setGroupsDifferenceValue(Number(e.target.value))
                }
                className="w-20 shadow-xl text-gray-500 text-center border outline-none placeholder-gray-300"
                placeholder="Value..."
              />
            </div>
            <div className="ml-auto">
              <p className="font-bold ml-2">Team 2</p>
              {group2.map((el) => {
                return (
                  <ul key={el.rate} className="flex justify-center">
                    <li>{el.stud}</li>
                    <li className="ml-2 text-green-400">{el.rate}</li>
                  </ul>
                );
              })}
            </div>
          </div>
          {group1.length > group2.length || group1.length < group2.length ? (
            <div className="flex justify-end mt-10 invisible">
              <Button
                handleClick={shuffleStud}
                className={textButtonClassNames}
                text="Shuffle"
              />
            </div>
          ) : (
            <div className="flex justify-end mt-10 visible">
              <Button
                handleClick={shuffleStud}
                className={textButtonClassNames}
                text="Shuffle"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
