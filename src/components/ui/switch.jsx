import React from "react";

const Switch = ({ checked, onCheckedChange }) => {
  return (
    <label
      className="relative inline-flex items-center cursor-pointer"
      aria-label="Toggle dark mode"
    >
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={(e) => {
          if (typeof onCheckedChange === "function") {
            onCheckedChange(e.target.checked);
          } else {
            console.warn("onCheckedChange is not a function");
          }
        }}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 dark:bg-gray-700 peer-checked:bg-blue-600 rounded-full peer relative transition-colors duration-300">
        <div className="absolute top-[2px] left-[2px] h-5 w-5 bg-white border border-gray-300 rounded-full transition-transform duration-300 peer-checked:translate-x-full"></div>
      </div>
    </label>
  );
};

export default Switch;
