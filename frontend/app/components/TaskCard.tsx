"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function TaskCard({ task, onDelete, onEdit }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editCategory, setEditCategory] = useState(task.category);

  const handleSave = () => {
    onEdit(task.id, {
      title: editTitle,
      category: editCategory,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditCategory(task.category);
    setIsEditing(false);
  };

  const categoryColors: any = {
    work: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
    urgent: "from-red-500/20 to-orange-500/20 border-red-500/30",
    personal: "from-purple-500/20 to-pink-500/20 border-purple-500/30",
  };

  const categoryBadgeColors: any = {
    work: "bg-gradient-to-r from-blue-500 to-cyan-500",
    urgent: "bg-gradient-to-r from-red-500 to-orange-500",
    personal: "bg-gradient-to-r from-purple-500 to-pink-500",
  };

  return (
    <motion.div
      layout
      className={`relative overflow-hidden bg-gradient-to-br cursor-pointer ${
        categoryColors[task.category] || categoryColors.work
      } backdrop-blur-xl p-6 rounded-2xl shadow-2xl border transition-all duration-300 hover:shadow-3xl hover:scale-[1.02]`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Ambient glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl opacity-20 blur-xl -z-10" />

      {isEditing ? (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full bg-black/30 backdrop-blur-md text-white p-3 rounded-xl text-lg font-bold border border-white/10 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
            placeholder="Task title"
          />

          <div className="flex justify-between items-center pt-2">
            <select
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              className="bg-black/40 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm font-medium border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer transition-all"
            >
              <option value="work">Work</option>
              <option value="urgent">Urgent</option>
              <option value="personal">Personal</option>
            </select>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCancel}
                className="text-gray-300 text-sm font-medium cursor-pointer hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/10"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium cursor-pointer px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Save
              </motion.button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
            {task.title}
          </h3>

          <div className="flex justify-between items-center">
            <span
              className={`text-xs font-bold text-white px-3 py-1.5 rounded-full ${
                categoryBadgeColors[task.category] || categoryBadgeColors.work
              } shadow-lg`}
            >
              {task.category.toUpperCase()}
            </span>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsEditing(true)}
                className="text-blue-300 text-sm font-medium cursor-pointer hover:text-blue-200 transition-colors"
              >
                ✏️ Edit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDelete(task.id)}
                className="text-red-300 text-sm font-medium cursor-pointer hover:text-red-200 transition-colors"
              >
                🗑️ Delete
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
