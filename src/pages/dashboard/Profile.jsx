import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import axios from "../../axios";
import toast from "react-hot-toast";
import ProfilePicUpload from "@/components/ProfilePicUpload";

const Profile = () => {
  const { user, setUser, loading } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");

  // Sync initial form values from context user
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone || "");
      setBio(user.bio || "");
    }
  }, [user]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("/users/update", {
        name,
        email,
        phone,
        bio,
      });
      setUser(res.data.user); // Update context with new user info
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const handleUpload = (newPic) => {
    setUser((prev) => ({ ...prev, profilePic: newPic }));
  };

  if (loading || !user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-8 bg-white dark:bg-gray-900 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">My Profile</h2>

      <ProfilePicUpload
        currentPic={user?.profilePic}
        name={user?.name}
        onUpload={handleUpload}
      />

      <form onSubmit={handleProfileUpdate} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input
            className="w-full px-4 py-2 rounded border bg-gray-100 dark:bg-gray-800 dark:text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            className="w-full px-4 py-2 rounded border bg-gray-100 dark:bg-gray-800 dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
          <input
            className="w-full px-4 py-2 rounded border bg-gray-100 dark:bg-gray-800 dark:text-white"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
          <textarea
            rows={3}
            className="w-full px-4 py-2 rounded border bg-gray-100 dark:bg-gray-800 dark:text-white"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
