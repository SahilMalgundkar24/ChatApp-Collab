import React, { useState } from "react";
import { IoIosNotifications } from "react-icons/io";

const UserSec = () => {
  const signout = () => {
    auth.signOut();
    
  };
  const [adduser, setadduser] = useState(false);
  const [showmodal,setshowmodal]=useState(false);

  const modalclicked = ()=>{
    setshowmodal(!showmodal)
  }

  const buttonclicked = () => {
    setadduser(!adduser);
  };
  return (
    <>
      <div className="h-full w-1/4 color1 flex flex-col">
        <div className="w-full height10 flex justify-between mt-2 px-5 poppins-bold text-2xl text-white">
          <div>
            Chatting App
          </div>
          <div onClick={modalclicked}>
            <IoIosNotifications />
          </div>
        </div>
        <div className="w-full scrollabe height70 overflow-y-scroll ">
          <div className="w-full h-12 hover:bg-black text-white poppins flex items-center text-xl px-5 ">
            Tejas Gawde
          </div>
          <div className="w-full h-12 hover:bg-black text-white poppins flex items-center text-xl px-5 ">
            Sahil Malgundkar
          </div>
          
          
        </div>

        <div className="w-full height10 flex flex-col items-center justify-center px-3 py-2">
          <div className="w-full h-full">
            {adduser && (
              <div className="w-full h-full flex justify-between">
                <input
                  type="text"
                  placeholder="Enter username to add a friend"
                  className=" h-3/4 w-3/4 p-2 border rounded-lg"
                />
                <button className=" w-1/5 h-3/4 color3 rounded-lg text-white poppins">
                  Add
                </button>
              </div>
            )}
          </div>
          
        </div>


        <div className="w-full height10 flex items-center justify-center px-4 py-2">
          <button
            className="w-full h-full color3 rounded-lg text-white poppins"
            onClick={signout}
          >
            signout
          </button>
        </div>
        

        {showmodal && (
          <div className="absolute inset-0 h-70 mt-16 w-1/4 color1 flex flex-col">
            <div className="w-full h-12 hover:bg-black flex justify-between items-center px-5 ">
              <div className="text-white poppins text-xl">
                Anushka
              </div>
              <button className=" color6 p-1 w-20 rounded-lg">
                Accept
              </button>
            </div>
            

            <div className="w-full h-12 hover:bg-black flex justify-between items-center px-5 ">
              <div className="text-white poppins text-xl">
                Rupali(Lmao)
              </div>
              <button className=" color6 p-1 w-20 rounded-lg">
                Accept
              </button>
            </div>

          </div>
        )}
      </div>
    </>
  );
};

export default UserSec;
