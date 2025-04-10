import { useEffect, useState } from "react";
import axios from "../../axios";
import toast from "react-hot-toast";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get("/api/users/settings");
        const { notifications, language } = res.data;
        setNotifications(notifications);
        setLanguage(language);
      } catch (err) {
        toast.error("Failed to load settings");
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    try {
      await axios.put("/api/users/settings", { notifications, language });
      toast.success("Settings saved!");
    } catch (err) {
      toast.error("Failed to save settings");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">User Settings</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-300">Email Notifications</span>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          </label>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Preferred Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-2 rounded border bg-gray-100 dark:bg-gray-800 dark:text-white"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="es">Spanish</option>
            {/* Add more languages as needed */}
          </select>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-4"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
