import React, { useState } from "react";
import UserSec from "./UserSec";
import MessageSec from "./MessageSec";
import Emptysection from "./Emptysection";

function HomePage() {
  const[empty,setempty]=useState(false);

  const usersecclicked=()=>{
    setempty(true);
  }
  return (

    <div className="h-screen w-screen flex">
      <UserSec onuserclick={usersecclicked} />
      {empty?<MessageSec/> : <Emptysection/>}
    </div>
  );
}

export default HomePage;
