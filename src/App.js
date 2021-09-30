import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function App() {
  const storage = JSON.parse(localStorage.getItem("todos"));
  const [todos, setTodos] = useState(storage);
  const [input, setInput] = useState("");
  const [editTodo, setEditTodo] = useState("");
  const [updateTodo, setUpdateTodo] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    const todo = {
      id: Math.floor(Math.random() * 99),
      title: input,
    };
    setTodos([...todos, todo]);

    setInput("");
  };
  console.log(todos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const submitEdit = (id) => {
    setEditTodo(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.title = updateTodo;
        } else {
          return todo;
        }
        setUpdateTodo("");
      })
    );
  };
  return (
    <div className="todo">
      <h1>Todo List</h1>
      <form className="form">
        <input
          type="text"
          className="input-todo"
          placeholder="Add Todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <button disabled={!input} onClick={addTodo} className="todo-add">
          Add Todo
        </button>
      </form>
      <div className="todo-list">
        <div className="tod">
          {todos.map((todo) => (
            <div key={todo.id} className="todo-id">
              {editTodo === todo.id ? (
                <input
                  className="updated-todo"
                  type="text"
                  placeholder="Updated Todo"
                  value={updateTodo}
                  onChange={(e) => setUpdateTodo(e.target.value)}
                />
              ) : (
                <div className="todo-title">{todo.title}</div>
              )}

              <button
                onClick={() => deleteTodo(todo.id)}
                className="todo-delete"
              >
                <DeleteIcon></DeleteIcon>
              </button>
              <button
                className="todo-edit"
                onClick={() => setEditTodo(todo.id)}
              >
                <EditIcon></EditIcon>
              </button>
              <button
                className="submitBtn"
                onClick={() => submitEdit(todo.id)}
                disabled={!updateTodo}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
