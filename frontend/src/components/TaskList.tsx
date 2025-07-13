import React, { useEffect, useState } from 'react';
import axios from 'axios';
import type { Task } from '../types';
import TaskForm from './TaskForm';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = () => {
    axios
      .get('http://localhost:3000/api/tasks')
      .then((res) => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching tasks:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleNewTask = (newTask: Task) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const toggleComplete = async (task: Task) => {
    try {
      const updated = { ...task, completed: !task.completed };
      await axios.put(`http://localhost:3000/api/tasks/${task.id}`, updated);
      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, completed: updated.completed } : t
        )
      );
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  if (loading) return <p className="text-gray-600">Loading tasks...</p>;

  return (
    <div className="max-w-xl mx-auto mt-6 bg-white rounded-xl shadow-md p-6 space-y-6">
      <TaskForm onTaskCreated={handleNewTask} />

      <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">Tasks</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm"
            >
              <label className="flex items-center gap-3 flex-grow">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task)}
                  className="h-5 w-5 text-blue-600"
                />
                <div>
                  <p
                    className={`font-medium text-lg ${
                      task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                    }`}
                  >
                    {task.title}
                  </p>
                  <p className="text-sm text-gray-600">{task.description}</p>
                </div>
              </label>
              <button
                onClick={() => handleDelete(task.id)}
                className="text-red-500 hover:text-red-700 text-sm font-semibold"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
