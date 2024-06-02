import React from "react";
import { auth } from "../firebase/config";

const UserSec = () => {
  const signout = () => {
    auth.signOut();
  };
  return (
    <>
      <div className="h-full w-1/4 color1 flex flex-col">
        <div className="w-full height10 text-center mt-2 poppins text-2xl text-white">
          Chatting App
        </div>
        <div className="w-full scrollabe height80 overflow-y-scroll "></div>
        <div className="w-full height10 flex items-center justify-center p-4">
          <button
            className="w-full h-full color3 rounded-lg text-white poppins"
            onClick={signout}
          >
            signout
          </button>
        </div>
        <div className="w-full height10 flex items-center justify-center p-4">
          <button className="w-full h-full color3 rounded-lg text-white poppins">
            Add a User
          </button>
        </div>
      </div>
    </>
  );
};

export default UserSec;
