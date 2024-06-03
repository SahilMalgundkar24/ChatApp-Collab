import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/config";
import { IoIosNotifications } from "react-icons/io";

const UserSec = ({onuserclick}) => {
  const [user] = useAuthState(auth);
  const [chatList, setchatList] = useState([]);
  const [search, setSearch] = useState("");

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

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", search));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert("user found");
        const userData = querySnapshot.docs[0].data();
        try {
          const docRef = doc(db, "friendList", user.uid);
          await updateDoc(docRef, {
            list: arrayUnion(userData), // Add the new item using arrayUnion
          });
          console.log("Item added successfully!");
        } catch (error) {
          console.error("Error adding item:", error);
        }
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
          {chatList?.list?.map((chat) => (
            <div
              key={chat.uid}
              className="w-full h-12 hover:bg-black text-white poppins flex items-center text-xl px-5 "
              onClick={onuserclick}
            >
              {chat.username}
            </div>
          ))}
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
      </div>
    </>
  );
};

export default UserSec;
