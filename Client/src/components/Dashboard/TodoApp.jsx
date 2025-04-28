import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaCheck, FaPlus } from 'react-icons/fa';
import API from '../../common/apis/ServerBaseURL';




export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  console.log(todos);
  
  const [newTodo, setNewTodo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
   console.log('set todo', newTodo);


const addtodo = async (e) => {
  e.preventDefault(); // Prevent form submission reload

  if (!newTodo.trim()) {
    setError("Todo cannot be empty.");
    return;
  }

  try {
    setIsLoading(true);
    setError(null);

    const response = await axios.post(API.addtodos.url, { newtodo: newTodo.trim() }, {
      withCredentials: true
    });

    if (response.status === 200) {
      await fetchtodos();
      setNewTodo(''); // Clear input
    }
  } catch (error) {
    console.error("Error in addtodos:", error);
    setError("Failed to add todo. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  
const fetchtodos = async () =>{
  const response = await axios.get(API.fetchtodos.url,{
    withCredentials:true
  })
  console.log('todos resp', response);
  if(response.status === 200){
    setTodos(response.data.data.todos)
  }
}
  useEffect(() => {
    fetchtodos()
  }, []);


  const deleteTodo = async (todoid) => {
    try {
      const response = await axios.delete(API.deletetodos.url, {
        data: { todoid },           
        withCredentials: true      
      });

  
      if (response.status === 200) {
        setTodos(response.data.todos);
      }
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  };
  
  const toggleComplete = async (todoid) => {
    console.log('log toggle', todoid);
    
    try {
      const response = await axios.put(API.toggleTodoComplete.url, {
        todoid: todoid
      }, {
        withCredentials: true
      });
  
      if (response.status === 200) {
        fetchtodos(); // Re-fetch updated todos
      }
    } catch (err) {
      console.error("Failed to toggle todo:", err);
    }
  };
  


  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">My Goals</h1>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={addtodo} className="flex mb-6">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit" 
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 flex items-center justify-center"
          disabled={isLoading}
        >
          <FaPlus className="mr-1" /> Add
        </button>
      </form>


      {todos.map((todo, index) => (
  <li 
    key={index}
    className="flex items-center justify-between p-4 mb-3 bg-white rounded-lg shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-all duration-200"
  >
    <div className="flex items-center">
      <span className="flex items-center justify-center w-8 h-8 mr-4 text-sm font-bold text-blue-500 bg-blue-100 rounded-full">
        {index + 1}
      </span>
      <span className={`text-gray-800 font-medium ${todo?.completed ? 'line-through text-gray-400' : ''}`}>
        {todo?.text}
      </span>
    </div>
    
    <div className="flex space-x-2">
      <button
        onClick={() => toggleComplete(todo?._id)}
        className={`p-2 rounded-full ${todo?.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'} hover:opacity-80 transition-colors`}
        aria-label={todo?.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        <FaCheck size={14} />
      </button>
      <button
        onClick={() => deleteTodo(todo?._id)}
        className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
        aria-label="Delete task"
      >
        <FaTrash size={14} />
      </button>
    </div>
  </li>
))}

{todos.length === 0 && (
  <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
    <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
    <p className="text-gray-500 font-medium">No tasks yet. Add one above!</p>
  </div>
)}

      
      <div className="mt-4 text-sm text-gray-500 text-center">
        {todos.length > 0 && (
          <p>{todos.filter(t => t.completed).length} of {todos.length} tasks completed</p>
        )}
      </div>
    </div>
  );
}