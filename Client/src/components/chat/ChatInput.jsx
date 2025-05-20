import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/config";

const ChatInput = ({ roomId, currentUser }) => {
  const [text, setText] = useState("");

  const handleSend = async () => {

    
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
    <div className="flex p-2 border-t  bg-[#b4c0b2]">
      <input
        type="text"
        className="flex-1 p-2 rounded bg-[#faf3dd] text-black focus:outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSend} className="ml-2 px-4 py-2 bg-[#f2c078] text-black rounded">
        Send
      </button>
    </div>
  );
};

export default ChatInput;
