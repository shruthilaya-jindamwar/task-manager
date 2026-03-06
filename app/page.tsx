"use client";

import { useState } from "react";

type Task = {
  title: string;
  description: string;
};

const tasks = [
  { title: "Tea", description: "have tea in morning" },
  { title: "Coffee", description: "or, have coffee in morning" },
  {
    title: "Biscuit",
    description: "and have Biscuits along with tea/coffee",
  },
];

export default function Home() {
  const [addNewTaskInProgress, setAddNewTaskInProgress] = useState(false);

  const addNewTask = () => {
    setAddNewTaskInProgress(true);
  };

  const saveTask = () => {
    setAddNewTaskInProgress(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans ">
      <main className="flex min-h-screen w-full max-w-3xl flex-col  py-2 px-10 bg-white text-white sm:items-start">
        {addNewTaskInProgress === false && ( //
          <>
            <TaskList tasks={tasks} />

            <button
              onClick={addNewTask}
              className="bg-gray-700 hover:bg-gray-600 cursor-pointer"
            >
              +
            </button>
          </>
        )}

        {addNewTaskInProgress === true && ( //
          <>
            Title: <input className="bg-white border-2 border-amber-800" />
            Description:{" "}
            <input className="bg-white border-2 border-amber-800" />
            <button
              onClick={saveTask}
              className="bg-gray-700 hover:bg-gray-600 cursor-pointer"
            >
              Save
            </button>
          </>
        )}
      </main>
    </div>
  );
}

export function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <div className="bg-gray-800">
      Task List:
      <ul className="list-disc pl-4">
        {tasks.map((item) => {
          return (
            <li key={item.title}>
              <p>{item.title}</p>
              <p> - {item.description}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
