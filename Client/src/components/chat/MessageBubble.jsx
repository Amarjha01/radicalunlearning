import { useState } from "react";

const MessageBubble = ({ message, currentUserId }) => {
  const isOwn = message.senderEmail === currentUserId;
  const [showTime, setShowTime] = useState(false);
  
  // Set text color based on role
  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "text-red-400";
      case "educator":
        return "text-green-400";
      case "learner":
        return "text-yellow-400";
      default:
        return "text-white";
    }
  };
  
  // Format time to be more readable
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Check if the message contains a URL
  const containsUrl = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return urlRegex.test(text);
  };
  
  // Render message text with clickable links
  const renderMessageText = (text) => {
    if (!containsUrl(text)) return text;
    
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return parts.map((part, i) => {
      if (urlRegex.test(part)) {
        return (
          <a key={i} href={part} className="text-blue-200 underline break-all" target="_blank" rel="noopener noreferrer">
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className={`flex mb-2 ${isOwn ? "justify-end" : "justify-start"}`}>
      {!isOwn && (
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-1 overflow-hidden flex-shrink-0">
          {message.senderAvatar ? (
            <img src={message.senderAvatar} alt={message.senderName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-600 font-medium">{message.senderName.charAt(0)}</span>
          )}
        </div>
      )}
      
      <div 
        className={`max-w-xs lg:max-w-md rounded-2xl px-3 py-2 shadow ${
          isOwn 
            ? "bg-blue-600 rounded-br-none" 
            : "bg-gray-700 rounded-bl-none"
        }`}
        onClick={() => setShowTime(!showTime)}
      >
        <div className="flex justify-between items-baseline mb-1">
          <p className={`text-xs font-semibold ${getRoleColor(message.senderRole)}`}>
            {message.senderName}
          </p>
          {showTime && (
            <span className="text-xs ml-2 opacity-70">
              {formatTime(message.createdAt)}
            </span>
          )}
        </div>
        
        <p className="text-sm md:text-base break-words text-start">{renderMessageText(message.text)}</p>
        
        {!showTime && (
          <span className="text-xs block text-right opacity-70 mt-1">
            {formatTime(message.createdAt)}
          </span>
        )}
        
        {message.isRead && isOwn && (
          <div className="flex justify-end mt-1">
            <svg className="w-4 h-4 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
            </svg>
          </div>
        )}
      </div>
      
      {isOwn && (
        <div className="w-8 h-8 rounded-full bg-blue-300 flex items-center justify-center ml-1 overflow-hidden flex-shrink-0">
          {message.senderAvatar ? (
            <img src={message.senderAvatar} alt="You" className="w-full h-full object-cover" />
          ) : (
            <span className="text-blue-700 font-medium">Y</span>
          )}
        </div>
      )}
    </div>
  );
};

export default MessageBubble;