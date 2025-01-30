import React, { useState } from "react";

export default function ListForm() {
  const [list, setList] = useState([]); 
  const [task, setTask] = useState(""); 



  function handleList(e) {
    e.preventDefault();
    if (task.trim() === "") return; 
    setList([...list, { text: task, isDone: false }]);
    setTask(""); 
  }


  function toggleCheck(index) {
    setList(
      list.map((item, i) => i === index ? { ...item, isDone: !item.isDone } : item));
  }

  return (
    <>
      <form onSubmit={handleList}>
        <input type="text" onChange={(e) => setTask(e.target.value)} value={task}/>
        <br />
        <button className="btn">Add</button>
        <br />
      </form>
      
      <ul>
        {list.map((item, i) => (
          <li key={i} style={{ textDecoration: item.isDone ? "line-through" : "none" }}>
            {item.text}
            <input
              type="checkbox"
              checked={item.isDone}
              onChange={() => toggleCheck(i)}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
