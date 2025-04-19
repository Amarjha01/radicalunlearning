import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/config";

const ChatInput = ({ roomId, currentUser }) => {
  const [text, setText] = useState("");
console.log('curruser', currentUser.email);

  const handleSend = async () => {
    console.log('handle send', currentUser);

    
    if (!text.trim()) return;

    await addDoc(collection(db, `chatRooms/${roomId}/messages`), {
        text,
        senderEmail: currentUser.email,
        senderName: currentUser.name,
        senderRole:currentUser.role, 
        createdAt: serverTimestamp(),
      });      

    setText("");
  };

  return (
    <div className="flex p-2 border-t border-gray-700 bg-[#0e142a]">
      <input
        type="text"
        className="flex-1 p-2 rounded bg-gray-800 text-white focus:outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSend} className="ml-2 px-4 py-2 bg-blue-600 text-white rounded">
        Send
      </button>
    </div>
  );
};

export default ChatInput;
