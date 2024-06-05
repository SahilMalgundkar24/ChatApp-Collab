import React, { useState } from "react";
import { auth, db, storage } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const LoginSign = () => {
  const [logEmail, setlogEmail] = useState("");
  const [logPass, setlogPass] = useState("");
  const [signUser, setsignUser] = useState("");
  const [signEmail, setsignEmail] = useState("");
  const [signPass, setsignPass] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const signup = async () => {
    let user;
    let userUrl;
    await createUserWithEmailAndPassword(auth, signEmail, signPass)
      .then(async (userCredential) => {
        // Signed up
        user = userCredential.user;
        console.log("", user);
        try {
          const storageRef = ref(storage, `profilePicture/${user.uid}.jpg`);
          await uploadBytes(storageRef, selectedImage);
          await getDownloadURL(storageRef).then(async (url) => {
            userUrl = url;
          });
          await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            username: signUser,
            uid: user.uid,
            profilePicture: userUrl,
          });
          await setDoc(doc(db, "friendList", user.uid), {
            list: [],
          });
        } catch (e) {
          alert(e);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const login = () => {
    signInWithEmailAndPassword(auth, logEmail, logPass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user.photoURL);
        // ...
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center mainBg">
        <div className="color3 shadow-lg rounded-lg flex w-3/4 max-w-4xl">
          {/* Login Section */}
          <div className="w-1/2 p-8">
            <h2 className="text-2xl text-white font-bold mb-6 ">Login</h2>
            <form>
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setlogEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="********"
                  onChange={(e) => setlogPass(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={login}
                >
                  Login
                </button>
              </div>
            </form>
          </div>

          {/* Sign Up Section */}
          <div className="w-1/2 p-8 color2 text-white rounded-r-lg">
            <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
            <form>
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="new-Username"
                >
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="new-username"
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setsignUser(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="new-email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="new-username"
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setsignEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="new-password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="new-password"
                  type="password"
                  placeholder="********"
                  onChange={(e) => setsignPass(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="new-password"
                >
                  Choose Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="bg-white text-blue-500 hover:bg-gray-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={signup}
                >
                  Signup
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSign;
