import React, { useState } from "react";

export function ToDoList() {
  const [tasks, setTasks] = useState([]); // for task list
  const [input, setInput] = useState(""); //input for the new task
  const [editIndex, setEditIndex] = useState(null);
  const [editInput, setEditInput] = useState("");

  const addTask = () => {
    if (input.trim() !== "") {
      //Ensures that empty tasks (spaces) aren't added.
      setTasks((prevState) => [...prevState, input]); // Add new task/input to array
      setInput(""); // Clear the input after adding the task
    }
  };

  const clearTasks = () => {
    setTasks([]);
  };

  const deleteTask = (index) => {
    setTasks((prevState) => prevState.filter((_, i) => i !== index));
  };

  const editTask = (index) => {
    setEditIndex(index);
    setEditInput(tasks[index]);
  };

  const saveTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = editInput;
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditInput("");
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleEditInputChange = (e) => {
    setEditInput(e.target.value);
  };

  return (
    <>
      <div className="container">
        <h2>Get Things Done!</h2>
        <input
          type="text"
          value={input}
          onChange={handleInputChange} //update input
          placeholder="What is your task today?"
        />
        <button className="btn addTask" onClick={addTask}>
          Add task
        </button>
        <button className="btn" onClick={clearTasks}>
          Clear
        </button>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {editIndex === index ? (
                <>
                  <input
                    className="editInput"
                    type="text"
                    value={editInput}
                    onChange={handleEditInputChange}
                  />
                  <span
                    className="icon edit-icon"
                    onClick={() => saveTask(index)}
                  >
                    <i className="fa-solid fa-floppy-disk"></i>
                  </span>
                </>
              ) : (
                <>
                  {task}
                  <div className="icons">
                    <span
                      className="icon edit-icon"
                      onClick={() => editTask(index)}
                    >
                      <i className="fa-solid fa-pen"></i>
                    </span>
                    <span
                      className="icon edit-icon"
                      onClick={() => deleteTask(index)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </span>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
