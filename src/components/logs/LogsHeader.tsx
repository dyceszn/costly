import React from "react";
import Logo from "../search/Logo";

const LogsHeader = () => {
  return (
    <div className="flex flex-col gap-12 items-center">
      <h1 className="text-lg md:text-2xl">Share on</h1>
      <Logo />
    </div>
  );
};

export default LogsHeader;
