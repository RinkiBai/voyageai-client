import React from "react";

const Switch = ({ isOn, handleToggle, onLabel = "On", offLabel = "Off" }) => {
  return (
    <div className="flex items-center">
      <span className="mr-2 text-sm text-gray-600 dark:text-gray-300">
        {offLabel}
      </span>
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isOn}
          onChange={handleToggle}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-300 rounded-full relative transition-colors duration-300 peer-checked:bg-blue-600">
          <div className="absolute top-[2px] left-[2px] bg-white border rounded-full h-5 w-5 transition-all duration-300 peer-checked:translate-x-5" />
        </div>
      </label>
      <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
        {onLabel}
      </span>
    </div>
  );
};

export default Switch;
