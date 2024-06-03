import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/config";
import { IoIosNotifications } from "react-icons/io";

const UserSec = () => {
  const [user] = useAuthState(auth);
  const [chatList, setchatList] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "friendList", user.uid), (doc) => {
      setchatList(doc.data());
    });
    return () => {
      unsubscribe();
    };
  }, [user.uid]);

  const signout = () => {
    auth.signOut();
  };

  const [adduser, setadduser] = useState(false);
  const [search, setSearch] = useState("");
  const [showmodal, setshowmodal] = useState(false);

  const modalclicked = () => {
    setshowmodal(!showmodal);
  };

  const buttonclicked = () => {
    setadduser(!adduser);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", search));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert("user found");
        console.log(querySnapshot.docs[0].data());
      } else {
        alert("user not found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="h-full w-1/4 color1 flex flex-col">
        <div className="w-full height10 flex mt-2 px-5 poppins-bold text-2xl text-white">
          Chatting App
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
            <div className="w-full h-full flex justify-between">
              <input
                type="text"
                placeholder="Enter username to add a friend"
                className=" h-3/4 w-3/4 p-2 border rounded-lg"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className=" w-1/5 h-3/4 color3 rounded-lg text-white poppins"
                onClick={handleSearch}
              >
                Add
              </button>
            </div>
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
              <div className="text-white poppins text-xl">Anushka</div>
              <button className=" color6 p-1 w-20 rounded-lg">Accept</button>
            </div>

            <div className="w-full h-12 hover:bg-black flex justify-between items-center px-5 ">
              <div className="text-white poppins text-xl">Rupali</div>
              <button className=" color6 p-1 w-20 rounded-lg">Accept</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserSec;
