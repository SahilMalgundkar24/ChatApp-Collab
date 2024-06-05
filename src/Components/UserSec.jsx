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
import { GiHamburgerMenu } from "react-icons/gi";
import { IconContext } from "react-icons/lib";
import { MdEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const UserSec = () => {
  const [chatList, setchatList] = useState([]);
  const [search, setSearch] = useState("");
  const [user] = useAuthState(auth);
  const { changeChat, chatID } = useChatStore();
  const [selectedChat, setSelectedChat] = useState(null);
  const [usermenu, setusermenu] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "friendList", user.uid),
      async (doc) => {
        let friendList = [];
        const friendUidList = doc.data().list;
        console.log(friendUidList);

        // Create an array of promises
        const promises = friendUidList.map(async (friend) => {
          const userRef = collection(db, "users");
          const q = query(userRef, where("uid", "==", friend.uid));
          const querySnapshot = await getDocs(q);
          return querySnapshot.docs[0].data();
        });

        // Wait for all promises to resolve
        friendList = await Promise.all(promises);
        console.log(friendList);

        setchatList(friendList);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user.uid]);
  useEffect(() => {
    console.log(chatList);
  }, [chatList]);

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
        const userData = {
          uid: querySnapshot.docs[0].data().uid,
        };
        try {
          await updateDoc(doc(db, "friendList", user.uid), {
            list: arrayUnion(userData), // Add the new item using arrayUnion
          });
          console.log("Item added successfully!");
          const friendData = {
            uid: user.uid,
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

  const menuclicked = () => {
    setusermenu(!usermenu);
  };
  return (
    <>
      <div className="h-full w-1/4 mainBg flex flex-col">
        <div className="w-full height10 flex mt-2 px-5 justify-between items-center">
          <div className="text-white title text-6xl">ChatterBox</div>
          <div>
            <IconContext.Provider value={{ color: "white", size: "30px" }}>
              {usermenu ? <RxCross2 onClick={menuclicked} /> : <GiHamburgerMenu onClick={menuclicked} />}
            </IconContext.Provider>
          </div>
        </div>

        <div className="w-full px-2 scrollabe height80 overflow-y-scroll ">
          {chatList?.map((chat) => (
            <div
              key={chat.uid}
              className={`w-full h-14 mb-2 hover:bg-slate-500 poppins-bold flex text-white items-center text-lg px-5 rounded-lg ${
                selectedChat === chat.uid ? "bg-slate-500" : ""
              }`}
              onClick={() => handleSelect(chat)}
            >
              <div className="h-10 w-10 bg-white mr-5 rounded-full">
                <img
                  src={chat.profilePicture}
                  alt="user"
                  className="h-full w-full rounded-full"
                />
              </div>
              <div>{chat.username}</div>
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
      </div>

      {usermenu && (
        <div className="absolute inset-0 h-70 mt-20 w-1/4 mainBg flex flex-col px-3">
          <div className="w-full h-full flex flex-col items-center text-white px-5 ">
            <div className=" w-24 h-24 mt-2 mb-3 flex items-center justify-center px-5 bg-slate-500 poppins-bold text-lg rounded-full">

            </div>
            <div className="w-full justify-center poppins-bold text-xl flex">
              <div>user</div>
              <div className="mt-1">
                <MdEdit />
              </div>
            </div>
          </div>
          <div
            className="w-full h-14 mb-2 hover:bg-slate-500 poppins-bold flex text-white items-center text-lg px-5 rounded-lg"
            onClick={signout}
          >
            Signout
          </div>
        </div>
      )}
    </>
  );
};

export default UserSec;
