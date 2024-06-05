import React, { useState,useEffect } from "react";
import UserSec from "./UserSec";
import MessageSec from "./MessageSec";
import Emptysection from "./Emptysection";
import { useChatStore } from "../lib/chatStore";

function HomePage() {
  const [empty, setempty] = useState(false);
  const { chatID } = useChatStore();

  useEffect(() => {
    // Check for the reload parameter in the URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('reload')) {
      // Remove the reload parameter to avoid an infinite loop
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
      // Reload the page
      window.location.reload();
    }
  }, []);

  const usersecclicked = () => {
    setempty(true);
  };
  return (
    <div className="h-screen w-screen flex">
      <UserSec />
      {chatID ? <MessageSec /> : <Emptysection />}
    </div>
  );
}

export default HomePage;
