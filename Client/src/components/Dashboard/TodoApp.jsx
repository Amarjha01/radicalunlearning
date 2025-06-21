import { useState, useEffect } from 'react';
import { FaTrash, FaCheck, FaPlus, FaRegCircle, FaTasks } from 'react-icons/fa';
import API from '../../common/apis/ServerBaseURL';
import axios from 'axios'
import { showNetworkErrorToast } from '../../utils/Notification';
export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addtodo = async (e) => {
    if (e) e.preventDefault();

    if (!newTodo.trim()) {
      setError("Goal cannot be empty.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Using axios as in your original code
      const response = await axios.post(API.addtodos.url, { newtodo: newTodo.trim() }, {
        withCredentials: true
      });

      if (response.status === 200) {
        await fetchtodos();
        setNewTodo('');
      }
    } catch (error) {
      console.error("Error in addtodos:", error);
      setError("Failed to add goal. Please try again.");
       if (error.message === "Network Error") {
        showNetworkErrorToast(
          "Your Network connection Is Unstable OR Disconected"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchtodos = async () => {
    try {
      const response = await axios.get(API.fetchtodos.url, {
        withCredentials: true
      });
      
      if (response.status === 200) {
        setTodos(response.data.data.todos);
      }
    } catch (error) {
       if (error.message === "Network Error") {
              showNetworkErrorToast(
                "Your Network connection Is Unstable OR Disconected"
              );
            }
      console.error("Error fetching todos:", error);
      setError("Failed to load todos.");
    }
  };

  useEffect(() => {
    fetchtodos();
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
       if (error.message === "Network Error") {
        showNetworkErrorToast(
          "Your Network connection Is Unstable OR Disconected"
        );
      }
    }
  };

  const toggleComplete = async (todoid) => {
    try {
      const response = await axios.put(API.toggleTodoComplete.url, {
        todoid: todoid
      }, {
        withCredentials: true
      });

      if (response.status === 200) {
        fetchtodos();
      }
    } catch (err) {
       if (error.message === "Network Error") {
        showNetworkErrorToast(
          "Your Network connection Is Unstable OR Disconected"
        );
      }
      console.error("Failed to toggle todo:", err);
    }
  };

  // Handle input keypress
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addtodo();
    }
  };

  // Count completed todos
  const completedCount = todos.filter(todo => todo?.completed).length;
  const totalCount = todos.length;
  const percentComplete = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="min-h-screen  p-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-[] rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#b4c0b2] px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white flex items-center">
              <FaTasks className="mr-2" />
              My Goals
            </h1>
            {totalCount > 0 && (
              <div className="bg-white/20 rounded-lg px-3 py-1 text-xs font-medium text-white">
                {completedCount}/{totalCount} tasks
              </div>
            )}
          </div>
          
          {totalCount > 0 && (
            <div className="mt-3">
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-[#faf3dd] h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${percentComplete}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      
        <div className="p-6">
          {/* Error message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-4 flex items-start">
              <span className="mr-2">⚠️</span>
              <span>{error}</span>
            </div>
          )}
          
          {/* Add todo input */}
          <div className="flex mb-6 shadow-sm">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type here to create a goal."
              className="flex-1 p-3 border border-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button 
              onClick={addtodo} 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 rounded-r-lg hover:opacity-90 transition-opacity flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <FaPlus />
              )}
            </button>
          </div>

          {/* Todo list */}
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
            {todos.map((todo, index) => (
              <div 
                key={index}
                className={`group flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                  todo?.completed 
                    ? 'bg-[#868674] border border-blue-100' 
                    : 'bg-[#f2c078] border border-gray-100 hover:border-blue-200 hover:shadow-md'
                }`}
              >
                <div className="flex items-center">
                  <button
                    onClick={() => toggleComplete(todo?._id)}
                    className={`flex-shrink-0 w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
                      todo?.completed 
                        ? 'bg-blue-500 text-white' 
                        : 'border-2 border-gray-300 text-transparent hover:border-blue-400'
                    } transition-colors`}
                  >
                    {todo?.completed ? <FaCheck size={10} /> : <FaRegCircle size={10} className="opacity-0 group-hover:opacity-100 text-gray-400" />}
                  </button>
                  
                  <span className={`text-gray-800 font-medium ${todo?.completed ? 'line-through text-gray-400' : ''}`}>
                    {todo?.text}
                  </span>
                </div>
                
                <button
                  onClick={() => deleteTodo(todo?._id)}
                  className="p-2 text-[#ff6b6b] hover:text-red-500 rounded-full transition-colors  group-hover:opacity-100 cursor-pointer"
                  aria-label="Delete task"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            ))}

            {/* Empty state */}
            {todos.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <FaTasks className="text-blue-300 text-2xl" />
                </div>
                <p className="text-gray-500 font-medium">No tasks yet</p>
                <p className="text-gray-400 text-sm mt-1">Add your first goal above</p>
              </div>
            )}
          </div>
          
          {/* Status footer */}
          {todos.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  {completedCount} of {totalCount} completed
                </span>
                <span className="text-blue-600 font-medium">
                  {percentComplete}%
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}