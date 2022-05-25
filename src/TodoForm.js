import {useState} from "react";
import './App.css';

function TodoForm ({addTask}) {
    const [userInput, setUserInput] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        addTask(userInput)
        setUserInput("")
    }
    const handleChange = (e) => {
        setUserInput(e.currentTarget.value)
    }
    const handleKeyPress = (e) => {
        if(e.key === "Enter") {
            handleSubmit(e)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
           <input value={userInput}
                  type="text"
                  onChange={handleChange}
                  onKeyDown={handleKeyPress}
                  placeholder="Enter value..."
           />
           <button>Save</button>

        </form>
    )
}

export default TodoForm