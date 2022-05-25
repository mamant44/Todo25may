import React, { useEffect, useState } from 'react'

import './App.css';
import Todo from './Todo'
import TodoForm from './TodoForm'
import axios from 'axios'

const API_TODOS = 'https://jsonplaceholder.typicode.com/todos'

const useTodos = ( ) => {
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || []);

    useEffect(() => {
        if(todos.length === 0){
            axios.get(API_TODOS).then((resp) => {
                const allTasks = resp.data.map(({title, id, completed}) => ({name: title, id, complete: completed}));
                setTodos(allTasks);
            });
        }
    }, []);

    return {todos, setTodos};
}

const AppContext = React.createContext()

function App() {
  const {todos, setTodos} = useTodos();

  const addTask = (userInput) => {
      if(userInput) {
          const newItem = {
              id: Math.random().toString(36).substring(2,9),
                  task: userInput,
                  complete: false
          }
          const newTodos = [...todos, newItem]

          // TODO: move this logic when user leave from page
          localStorage.setItem("todos", JSON.stringify(newTodos))
          setTodos(newTodos)
      }
  }
  const removeTask = (id) => {
      setTodos([...todos.filter((todo) => todo.id !== id)])
  }
  const handleToggle = (id) => {
      setTodos([...todos.map((todo) =>
          todo.id === id ? {...todo, complete: !todo.complete} : {...todo})
  ])}
  return (
    <div className="App">
      <header>
        <h1> Todo-list: {todos.length}</h1>
      </header>
      <TodoForm addTask={addTask}/>
      {todos.map((todo) => {
        return (
            <Todo
                todo={todo}
                key={todo.id}
                toggleTask={handleToggle}
                removeTask={removeTask}
            />
        )
      })}
    </div>
  );
}

export default function AppWithContext(){
    return <AppContext.Provider value={"TodoList"}><App/></AppContext.Provider>
}
