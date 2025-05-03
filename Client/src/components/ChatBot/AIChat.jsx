import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import API from "../../common/apis/ServerBaseURL";
const AIChat = () => {
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState(() => {
    const saved = localStorage.getItem("ai-chat-history");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new message appears
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    localStorage.setItem("ai-chat-history", JSON.stringify(responses));
  }, [responses]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { role: "user", content: message };
    setLoading(true);
    setResponses((prev) => [...prev, userMsg]);
    setMessage("");

    try {
      const res = await axios.post(
        API.askai.url,
        { message },
        { withCredentials: true }
      );

      if (res.data.success) {
        const aiMsg = { role: "ai", content: res.data.response };
        setResponses((prev) => [...prev, aiMsg]);
      }
    } catch (error) {
      console.error("AI chat error:", error);
      setResponses((prev) => [
        ...prev,
        { role: "ai", content: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setResponses([]);
    localStorage.removeItem("ai-chat-history");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-indigo-100">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold ml-3 text-indigo-800">AI Assistant</h2>
        </div>
        <button
          onClick={clearChat}
          className="px-3 py-1 text-sm rounded-full transition-all bg-red-50 text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Clear History
        </button>
      </div>

<div className="bg-white rounded-lg shadow-inner h-96 overflow-y-auto mb-4 p-4">
  {responses.length === 0 ? (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
      <svg className="w-16 h-16 mb-2 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
      </svg>
      <p className="font-medium">Start a conversation</p>
      <p className="text-sm">Ask anything to get started</p>
    </div>
  ) : (
    <>
      {responses.map((msg, i) => (
        <div
          key={i}
          className={`mb-4 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`p-3 text-start rounded-2xl max-w-[85%] whitespace-pre-wrap ${
              msg.role === "user"
                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-br-none shadow-md"
                : "bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200"
            }`}
          >
            {msg.content}
          </div>
        </div>
      ))}
      {loading && (
        <div className="flex justify-start mb-4">
          <div className="bg-gray-100 text-gray-500 p-3 rounded-2xl rounded-bl-none border border-gray-200 flex items-center space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </>
  )}
</div>


      <div className="relative">
        <textarea
          className="w-full border-2 text-black border-indigo-100 rounded-lg py-3 px-4 pr-12 resize-none focus:outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200"
          rows={2}
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !message.trim()}
          className={`absolute right-2 bottom-2 rounded-full p-2 ${
            !message.trim() || loading
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md hover:shadow-lg"
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AIChat;