import React from "react";

const Topbar = (props) => {
  return (
    <>
      <div className="h-full w-full flex items-center pl-10 text-lg">
        {props.name}
      </div>
    </>
  );
};

export default Topbar;
