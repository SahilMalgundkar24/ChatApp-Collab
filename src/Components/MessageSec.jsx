import React, { useEffect, useRef, useState } from "react";
import { Attach, SendButton } from "../assets";
import Topbar from "./Topbar";
import { useChatStore } from "../lib/chatStore";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

const MessageSec = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { chatUser, chatID } = useChatStore();
  const messageContainerRef = useRef(null);

  const handleMessageSend = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, newMessage]);
      setNewMessage("");
    }
  };

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    let unsubscribe;
    if (chatID) {
      unsubscribe = onSnapshot(doc(db, "chats", chatID), (doc) => {
        setchatList(doc.data());
      });
    }
    return () => {
      unsubscribe();
    };
  }, [chatID]);

  return (
    <>
      <div className="h-full w-3/4 color2 flex flex-col">
        <div className="w-full height10 text-white poppins color5 main-background-effect">
          <Topbar />
        </div>

        <div
          className="h-full scrollabe w-full height80 pl-10 pr-10 pt-3 overflow-y-scroll "
          ref={messageContainerRef}
        >
          <div className="h-full w-full">
            {messages.map((message, index) => (
              <div key={index} className="w-full flex justify-end mb-3">
                <div className="p-3 color6 max-w-3xl break-words rounded-lg text-white poppins">
                  {message}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-auto flex items-center justify-center p-4 pl-10 pr-10">
          <form className="w-full h-full flex color4 rounded-lg pl-10 pr-5 text-white items-center">
            <div className="h-full w-10 p-2">
              <img src={Attach} />
            </div>
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
              <img onClick={handleMessageSend} src={SendButton} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MessageSec;
