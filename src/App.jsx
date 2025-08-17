import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, Trash2, CheckCircle } from "lucide-react";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: input }]);
    setInput("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex flex-col items-center p-6 text-white">
      {/* Header */}
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold flex items-center gap-2 mb-6"
      >
        <CheckCircle className="text-green-300" /> Task Manager
      </motion.h1>

      {/* Input */}
      <div className="flex gap-2 w-full max-w-md">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg text-black"
          placeholder="Add a new task..."
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={addTask}
          className="px-4 py-2 bg-green-500 rounded-lg flex items-center gap-1 font-semibold"
        >
          <PlusCircle /> Add
        </motion.button>
      </div>

      {/* Task List */}
      <ul className="mt-6 w-full max-w-md space-y-3">
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.li
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="bg-white text-black p-3 rounded-lg flex justify-between items-center shadow"
            >
              {task.text}
              <motion.button
                whileHover={{ scale: 1.2, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => deleteTask(task.id)}
                className="text-red-500"
              >
                <Trash2 />
              </motion.button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

export default App;
