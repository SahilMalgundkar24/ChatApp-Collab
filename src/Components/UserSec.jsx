import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  setDoc,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/config";
import { useChatStore } from "../lib/chatStore";
import { compareAndCombineUid } from "../lib/functions";

const UserSec = () => {
  const [chatList, setchatList] = useState([]);
  const [search, setSearch] = useState("");
  const [user] = useAuthState(auth);
  const { changeChat, chatID } = useChatStore();
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "friendList", user.uid), (doc) => {
      setchatList(doc.data());
      console.log(doc.data());
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
          await updateDoc(doc(db, "friendList", user.uid), {
            list: arrayUnion(userData), // Add the new item using arrayUnion
          });
          console.log("Item added successfully!");
          const friendData = {
            email: user.email,
            uid: user.uid,
            username: user.displayName,
          };
          await updateDoc(doc(db, "friendList", userData.uid), {
            list: arrayUnion(friendData), // Add the new item using arrayUnion
          });
          const combinedID = compareAndCombineUid(user.uid, userData.uid);
          await setDoc(doc(db, "chats", combinedID), {
            chatId: combinedID,
            messages: [],
          });
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

  const handleSelect = async (chat) => {
    const combinedID = compareAndCombineUid(user.uid, chat.uid);

    await changeChat(combinedID, chat);
    console.log(user.uid, chat.uid);
    setSelectedChat(chat.uid);

  };
  return (
    <>
      <div className="h-full w-1/4 mainBg flex flex-col">
        <div className="w-full height10 flex mt-2 px-5 justify-center text-white items-center title text-6xl">
          ChatterBox
        </div>

        <div className="w-full px-2 scrollabe height70 overflow-y-scroll ">
          {chatList?.list?.map((chat) => (
            <div
              key={chat.uid}
              className={`w-full h-12 mb-2 hover:bg-slate-500 poppins-bold flex text-white items-center text-lg px-5 rounded-lg ${
                selectedChat === chat.uid ? 'bg-slate-500' : ''
              }`}
              onClick={() => handleSelect(chat)}
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
                placeholder="Enter username"
                className=" h-3/4 w-3/4 p-2 border rounded-lg"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className=" w-1/5 h-3/4 hover:bg-slate-300 color3 rounded-lg poppins"
                onClick={handleSearch}
              >
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="w-full height10 flex items-center justify-center px-4 py-2">
          <button
            className="w-full h-full hover:bg-slate-300 color3 rounded-lg poppins"
            onClick={signout}
          >
            Signout
          </button>
        </div>
      </div>
    </>
  );
};

export default UserSec;
