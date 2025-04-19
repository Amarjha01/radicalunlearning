import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

const useChatMessages = (roomId) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!roomId) return;

    const q = query(
      collection(db, `chatRooms/${roomId}/messages`),
      orderBy("createdAt", "asc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
    });

    return () => unsub();
  }, [roomId]);

  return messages;
};

export default useChatMessages;
