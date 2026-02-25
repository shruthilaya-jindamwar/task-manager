"use client";

import { InputEvent, useState } from "react";

export default function Home() {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const [arr, setArr] = useState([
    "buy vegetables", //
    "buy books",
    "buy pens",
    "buy pencils",
    "buy tv",
  ]);

  const onNewTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value);
  };

  const onClickAdd = () => {
    setArr([
      ...arr,
     newTaskTitle
    ]);

    setNewTaskTitle("")
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">


        <div>
          Task list
          <ul>
            {arr.map((item) => {
              return <li key={item}># {item} </li>;
            })}
          </ul>
        </div>

        <div>
          Enter a task title:
          <input
            onChange={onNewTaskChange}
            className="border-2 border-amber-50"
          ></input>
          <button onClick={onClickAdd} className="border-2 border-amber-500">
            Add
          </button>
        </div>
      </main>
    </div>
  );
}
