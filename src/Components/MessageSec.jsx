import React, { useEffect, useRef, useState } from "react";
import { Attach, SendButton } from "../assets";
import Topbar from "./Topbar";
import { useChatStore } from "../lib/chatStore";
import { doc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { IoSend } from "react-icons/io5";

const MessageSec = () => {
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { chatUser, chatID } = useChatStore();
  const messageContainerRef = useRef(null);

  const handleMessageSend = async () => {
    if (newMessage.trim() !== "") {
      const messageData = {
        message: newMessage,
        sender: user.uid,
        timestamp: new Date().getTime(),
      };

      await updateDoc(doc(db, "chats", chatID), {
        messages: arrayUnion(messageData), // Add the new item using arrayUnion
      });
    }
  };

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "chats", chatID), (doc) => {
      console.log(doc.data());
      setMessages(doc.data().messages);
    });

    return () => {
      unsubscribe();
    };
  }, [chatID]);

  return (
    <>
      <div className="h-full w-3/4 flex flex-col px-2">
        <div className="w-full height10 poppins-bold color3">
          <Topbar name={chatUser.username} />
        </div>

        <div
          className="h-full scrollabe w-full height80 pl-10 pr-10 pt-3 overflow-y-scroll"
          ref={messageContainerRef}
        >
          <div className="h-full w-full">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === user.uid ? "justify-end" : "justify-start"
                } mb-4`}
              >
                {message.sender === user.uid ? (
                  <div className="color2 text-white rounded-lg p-3 max-w-sm">
                    {message.message}
                  </div>
                ) : (
                  <div className="color1 rounded-lg p-3 max-w-sm">
                    {message.message}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-auto flex items-center justify-center p-4 pl-10 pr-10">
          <form className="w-full h-full flex color1 rounded-lg pl-5 pr-5 pt-1 pb-1 items-center">
            
            <input
              className="input h-full w-full ml-3"
              type="text"
              placeholder="Type you message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Prevent form submission
                  handleMessageSend(); // Send message
                }
              }}
            />
            <div className="h-full w-10 p-2">
              <IoSend onClick={handleMessageSend}/>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MessageSec;
