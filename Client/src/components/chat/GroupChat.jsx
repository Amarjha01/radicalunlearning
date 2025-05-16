import { auth } from "../../firebase/config";
import useChatMessages from "../../hooks/useChatMessages";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
const GroupChat = ({ roomId = "general" }) => {
    const messages = useChatMessages(roomId);

    const dispatch = useDispatch();
    
    const user = useSelector((state) => state.user?.userData?.user);

console.log("chatgroup" , user);


  if (!user) return <p>Please sign in to join the chat.</p>;

  return (
    <div className="flex flex-col h-[80vh] w-[75vw] shadow rounded-lg max-w-[1680px] mx-auto">
      <div className="flex-1 p-4 overflow-y-auto space-y-2">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} currentUserId={user.email} />
        ))}
      </div>
      <ChatInput roomId={roomId} currentUser={user} />
    </div>
  );
};

export default GroupChat;
