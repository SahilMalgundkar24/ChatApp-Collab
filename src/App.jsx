import React from "react";
import "./index.css";
import HomePage from "./Components/HomePage";
import LoginSign from "./Components/LoginSign";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";

const App = () => {
  const [user, loading] = useAuthState(auth);
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="lds-dual-ring text-4xl">LOADINGGGGG</div>
        </div>
      ) : user ? (
        <HomePage />
      ) : (
        <LoginSign />
      )}
    </>
  );
};

export default App;
