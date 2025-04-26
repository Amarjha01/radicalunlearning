import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaCheck, FaPlus } from 'react-icons/fa';
import API from '../../common/apis/ServerBaseURL';

// Mock API endpoint for demonstration purposes
const API_URL = 'https://jsonplaceholder.typicode.com/todos';



export default function TodoApp() {
  const [todos, setTodos] = useState([
    // Dummy data
    { id: 1, title: 'Complete React project', completed: false },
    { id: 2, title: 'Learn Tailwind CSS', completed: true }
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const addtodos = async (todos) => {
    try {
      const response = await axios.post(API.addtodos.url, { newtodo: todos }, {
        withCredentials: true
      });
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error in addtodos:", error);
    }
  };
  

  // Fetch todos (simulated with dummy data)
  useEffect(() => {
    console.log('Todo component mounted');
    // In a real app, we would fetch todos here
    // fetchTodos();
  }, []);

  // const fetchTodos = async () => {
  //   try {
  //     setIsLoading(true);
  //     const response = await axios.get(API_URL);
  //     setTodos(response.data.slice(0, 5)); 
  //     setIsLoading(false);
  //   } catch (err) {
  //     setError('Failed to fetch todos');
  //     setIsLoading(false);
  //     console.error(err);
  //   }
  // };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    try {
      setIsLoading(true);
      // In a real app, we would save to the server
      const response = await axios.post(API_URL, {
        title: newTodo,
        completed: false
      });
      
      
      setTodos([
        ...todos, 
        { id: Date.now(), title: newTodo, completed: false }
      ]);
      
      setNewTodo('');
      setIsLoading(false);
      console.log('Todo added (simulated)', response.data);
    } catch (err) {
      setError('Failed to add todo');
      setIsLoading(false);
      console.error(err);
    }
  };

  // const toggleComplete = async (id) => {
  //   try {
  //     const todoToToggle = todos.find(todo => todo.id === id);
  //     await axios.put(`${API_URL}/${id}`, {
  //       ...todoToToggle,
  //       completed: !todoToToggle.completed
  //     });
      
    
  //     setTodos(todos.map(todo => 
  //       todo.id === id ? { ...todo, completed: !todo.completed } : todo
  //     ));
      
  //     console.log(`Todo ${id} toggled (simulated)`);
  //   } catch (err) {
  //     setError('Failed to update todo');
  //     console.error(err);
  //   }
  // };

  // const deleteTodo = async (id) => {
  //   try {
  //     await axios.delete(`${API_URL}/${id}`);
      
  //     // Remove locally
  //     setTodos(todos.filter(todo => todo.id !== id));
  //     console.log(`Todo ${id} deleted (simulated)`);
  //   } catch (err) {
  //     setError('Failed to delete todo');
  //     console.error(err);
  //   }
  // };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">My Todo List</h1>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={addTodo} className="flex mb-6">
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
          onClick={addtodos}
        >
          <FaPlus className="mr-1" /> Add
        </button>
      </form>
      
      {isLoading ? (
        <div className="text-center p-4">Loading...</div>
      ) : (
        <ul className="space-y-2">
          {todos.map(todo => (
            <li 
              key={todo.id} 
              className={`flex items-center justify-between p-3 border rounded-md transition-all ${
                todo.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center">
                <button
                  onClick={() => toggleComplete(todo.id)}
                  className={`mr-3 w-6 h-6 rounded-full flex items-center justify-center ${
                    todo.completed ? 'bg-green-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  {todo.completed && <FaCheck size={12} />}
                </button>
                <span className={`${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {todo.title}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
                aria-label="Delete task"
              >
                <FaTrash />
              </button>
            </li>
          ))}
          
          {todos.length === 0 && (
            <div className="text-center p-4 text-gray-500">No tasks yet. Add one above!</div>
          )}
        </ul>
      )}
      
      <div className="mt-4 text-sm text-gray-500 text-center">
        {todos.length > 0 && (
          <p>{todos.filter(t => t.completed).length} of {todos.length} tasks completed</p>
        )}
      </div>
    </div>
  );
}