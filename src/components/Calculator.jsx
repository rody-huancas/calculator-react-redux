import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidSun } from "react-icons/bi";
import { PiMoonStarsFill } from "react-icons/pi";
import {
  updateValue,
  setOperator,
  calculateResult,
  clear,
} from "../store/calculatorSlice";
import { buttons } from "../helpers/buttons";

const Calculator = () => {
  const dispatch = useDispatch();
  const { currentValue } = useSelector((state) => state.calculator);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentOperation, setCurrentOperation] = useState("");

  const handleButtonClick = (value) => {
    if (value === ".") {
      if (!currentValue.includes(".")) {
        dispatch(updateValue(currentValue + value));
        setCurrentOperation(currentOperation + value);
      }
    } else if (!isNaN(value)) {
      dispatch(
        updateValue(currentValue === "0" ? value : currentValue + value)
      );
      setCurrentOperation(currentOperation + value);
    } else if (value === "=") {
      dispatch(calculateResult());
      setCurrentOperation("");
    } else if (value === "C") {
      dispatch(clear());
      setCurrentOperation("");
    } else {
      if (currentValue !== "0" && /[-+*/%]$/.test(currentValue)) {
        const lastNumber = currentValue.split(/[-+*/%]/).slice(-1)[0];
        const result = eval(currentValue.slice(0, -lastNumber.length)) || 0;
        dispatch(updateValue(result + value));
        setCurrentOperation(result + value);
      } else {
        dispatch(setOperator(value === "x" ? "*" : value));
        setCurrentOperation(currentOperation + value);
      }
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    isDarkMode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [isDarkMode]);

  return (
    <>
      <main
        className={`w-full h-screen flex justify-center items-center ${
          isDarkMode ? "dark" : ""
        }`}
      >
        <div className="w-[350px] h-[600px] bg-[#0d192b] dark:bg-[#f9f9f9] rounded-2xl shadow-lg flex flex-col justify-between transition-all duration-500 ease-in-out">
          <div className="dark:text-[#0d192b] text-white p-5 flex justify-end text-xl">
            <button onClick={toggleDarkMode}>
              {isDarkMode ? <BiSolidSun /> : <PiMoonStarsFill />}
            </button>
          </div>
          <div className="w-full h-[200px] p-5 flex flex-col items-end gap-3">
            <p className="text-white text-right">{currentOperation}</p>
            <input
              type="text"
              value={currentValue}
              readOnly
              className="w-full dark:text-[#eb6d6d] text-white bg-transparent font-medium text-5xl text-right outline-none"
            />
          </div>
          <div className="dark:bg-[#f6f2f8] bg-[#1c2130] h-[100%] rounded-2xl grid grid-cols-4 gap-3 p-5">
            {buttons.map((button) => (
              <button
                className={`text-xl font-medium ${
                  button.category === "special"
                    ? "text-[#ffcd00] dark:text-[#0f13b7]"
                    : button.category === "normal"
                    ? "text-[#eb6d6d] text-3xl dark:text-[#1b2a5f]"
                    : "text-[#fff] dark:text-[#0d192b]"
                } ${
                  button.category === "wide"
                    ? "row-span-2 text-[#fff] bg-[#eb6d6d] dark:bg-[#1b2a5f] dark:text-white"
                    : "col-span-1"
                } rounded-lg text-[#292d36]`}
                key={button.value}
                onClick={() => handleButtonClick(button.value)}
              >
                {button.value}
              </button>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Calculator;
