import React, { useState } from "react";
import UserSec from "./UserSec";
import MessageSec from "./MessageSec";
import Emptysection from "./Emptysection";
import { useChatStore } from "../lib/chatStore";

function HomePage() {
  const [empty, setempty] = useState(false);
  const { chatID } = useChatStore();

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
