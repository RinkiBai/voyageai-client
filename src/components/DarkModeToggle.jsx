import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const DarkModeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <Sun className="text-yellow-500" />
      <Switch checked={darkMode} onCheckedChange={toggleTheme} />
      <Moon className="text-gray-800 dark:text-white" />
    </div>
  );
};

export default DarkModeToggle;
