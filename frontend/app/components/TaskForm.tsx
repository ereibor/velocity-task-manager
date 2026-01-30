"use client";
import { useState } from "react";
import { pb } from "../libs/pocketbase";
import { motion } from "framer-motion";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("work");

  const createTask = async () => {
    if (!title) return;

    await pb.collection("tasks").create({
      title,
      category,
    });

    setTitle("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      createTask();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="relative overflow-hidden bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/20"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 opacity-50 blur-3xl animate-pulse" />

      <div className="relative space-y-4">
        <div className="space-y-3">
          <input
            className="w-full bg-black/30 backdrop-blur-md text-white placeholder-gray-400 p-4 rounded-2xl text-lg font-semibold border border-white/10 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all shadow-lg"
            placeholder="Enter Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>

        <div className="flex items-center justify-between mb-10">
          <select
            className="bg-black/40 backdrop-blur-md text-white px-4 py-3 rounded-xl font-medium border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 cursor-pointer transition-all shadow-lg"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="work">💼 Work</option>
            <option value="urgent">🔥 Urgent</option>
            <option value="personal">🎯 Personal</option>
          </select>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={createTask}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold px-8 py-3 rounded-xl cursor-pointer shadow-xl hover:shadow-2xl transition-all relative overflow-hidden group"
          >
            <span className="relative z-10">Add Task</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
