"use client";

import { useState, useEffect } from "react";

// core data shape used throughout the app
export type Task = {
  id: string;
  title: string;
  description: string;
};

// attempt to load from localStorage; fall back to defaults
function loadTasks(): Task[] {
  try {
    const stored = localStorage.getItem("tasks");
    if (stored) return JSON.parse(stored) as Task[];
  } catch {
    // ignore malformed data
  }
  return [
    {
      id: crypto.randomUUID(),
      title: "Tea",
      description: "have tea in morning",
    },
    {
      id: crypto.randomUUID(),
      title: "Coffee",
      description: "or, have coffee in morning",
    },
    {
      id: crypto.randomUUID(),
      title: "Biscuit",
      description: "and have Biscuits along with tea/coffee",
    },
  ];
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());
  const [editing, setEditing] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState(false);

  // keep localStorage in sync whenever tasks change
  useEffect(() => {
    if (tasks.length) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleSave = (task: Task) => {
    setTasks((prev) => {
      const exists = prev.find((t) => t.id === task.id);
      if (exists) {
        return prev.map((t) => (t.id === task.id ? task : t));
      }
      return [...prev, task];
    });
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAdd = () => {
    setEditing({ id: crypto.randomUUID(), title: "", description: "" });
    setShowForm(true);
  };

  const handleEdit = (task: Task) => {
    setEditing(task);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col py-6 px-10 bg-white text-black sm:items-start">
        <h1 className="text-3xl mb-4">Task Manager</h1>

        {showForm && (
          <TaskForm
            initial={editing!}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}

        <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />

        {!showForm && (
          <button
            onClick={handleAdd}
            className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
          >
            + Add Task
          </button>
        )}
      </main>
    </div>
  );
}

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="text-gray-600">No tasks yet.</p>;
  }

  return (
    <ul className="space-y-4 w-full">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center justify-between rounded border p-4"
        >
          <div>
            <p className="font-semibold">{task.title}</p>
            <p className="text-sm text-gray-700">{task.description}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(task)}
              className="text-blue-600 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

interface TaskFormProps {
  initial: Task;
  onSave: (task: Task) => void;
  onCancel: () => void;
}

export function TaskForm({ initial, onSave, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(initial.title);
  const [description, setDescription] = useState(initial.description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...initial, title: title.trim(), description: description.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 w-full space-y-4">
      <div>
        <label className="block font-medium">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded border px-2 py-1"
          required
        />
      </div>
      <div>
        <label className="block font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded border px-2 py-1"
          rows={3}
        />
      </div>
      <div className="flex space-x-2">
        <button
          type="submit"
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-500"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
