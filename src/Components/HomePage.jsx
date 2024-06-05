import React, { useState, useEffect } from "react";
import UserSec from "./UserSec";
import MessageSec from "./MessageSec";
import Emptysection from "./Emptysection";
import { useChatStore } from "../lib/chatStore";

function HomePage() {
  const { chatID } = useChatStore();

  return (
    <div className="h-screen w-screen flex">
      <UserSec />
      {chatID ? <MessageSec /> : <Emptysection />}
    </div>
  );
}

export default HomePage;
