// src/components/ProfilePicUpload.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "../axios"; // custom axios instance with baseURL
import toast from "react-hot-toast";

const ProfilePicUpload = ({ currentPic, name = "User", onUpload }) => {
  const [previewPic, setPreviewPic] = useState(null);
  const [file, setFile] = useState(null);

  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setPreviewPic(URL.createObjectURL(selected));
  };

  const handleImageUpload = async () => {
    if (!file) return toast.error("No image selected");

    const formData = new FormData();
    formData.append("profilePic", file); // <-- important: match your multer field name

    try {
      const res = await axios.post("/api/users/upload-profile-pic", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // adjust if using context/cookies
        },
      });

      toast.success("Profile picture updated!");
      if (onUpload) onUpload(res.data.profilePic);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 mb-6">
      <motion.img
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        src={
          previewPic ||
          currentPic ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`
        }
        alt="Profile"
        className="w-28 h-28 rounded-full object-cover shadow"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="text-sm"
      />
      <button
        onClick={handleImageUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload Picture
      </button>
    </div>
  );
};

export default ProfilePicUpload;
