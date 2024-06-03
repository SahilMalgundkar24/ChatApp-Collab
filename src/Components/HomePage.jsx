import React from "react";
import UserSec from "./UserSec";
import MessageSec from "./MessageSec";

function HomePage() {
  return (
    <div className="h-screen w-screen flex">
      <UserSec />
      <MessageSec />
    </div>
  );
}

export default HomePage;
