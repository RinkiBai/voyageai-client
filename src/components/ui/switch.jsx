import React from "react";

 const Switch = ({
  isOn,
  handleToggle,
  onLabel = "On",
  offLabel = "Off",
  id = "switch",
  label = "",
}) => {
  return (
    <div className="flex items-center space-x-2">
      {label && (
        <label htmlFor={id} className="text-sm text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <span className="text-sm text-gray-600 dark:text-gray-400">{offLabel}</span>

      <label htmlFor={id} className="relative inline-flex items-center cursor-pointer">
        <input
          id={id}
          type="checkbox"
          checked={isOn}
          onChange={handleToggle}
          className="sr-only peer"
          aria-checked={isOn}
        />
        <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-300">
          <div className="absolute left-[2px] top-[2px] h-5 w-5 bg-white border rounded-full transition-transform duration-300 peer-checked:translate-x-5" />
        </div>
      </label>

      <span className="text-sm text-gray-600 dark:text-gray-400">{onLabel}</span>
    </div>
  );
};

export default Switch;
