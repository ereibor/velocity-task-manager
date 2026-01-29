"use client";
import { useEffect, useState } from "react";
import { pb } from "../libs/pocketbase";
import TaskCard from "./TaskCard";
import { AnimatePresence, motion } from "framer-motion";

export default function TaskList() {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const records = await pb.collection("tasks").getFullList();
      setTasks(records);
    };

    load();

    pb.collection("tasks").subscribe("*", () => {
      load();
    });
  }, []);

  const deleteTask = async (id: string) => {
    await pb.collection("tasks").delete(id);
  };

  const editTask = async (id: string, data: any) => {
    await pb.collection("tasks").update(id, data);
  };

  return (
    <div className="space-y-4 mt-8">
      {tasks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16 px-6 bg-gradient-to-br from-gray-800/20 to-gray-900/20 backdrop-blur-xl rounded-3xl border border-white/10"
        >
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-2xl font-bold text-white mb-2">No tasks yet</h3>
          <p className="text-gray-400">
            Create your first task to get started!
          </p>
        </motion.div>
      ) : (
        <AnimatePresence mode="popLayout">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TaskCard task={task} onDelete={deleteTask} onEdit={editTask} />
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
}
