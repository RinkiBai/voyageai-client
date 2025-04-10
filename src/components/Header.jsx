// src/components/Header.jsx
import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-900 shadow-md">
      <Link to="/" className="text-xl font-bold text-blue-600 dark:text-white">
        🚖 VoyageAI
      </Link>
      <DarkModeToggle />
    </header>
  );
};

export default Header;
