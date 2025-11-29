import React from "react";
import SendingMethods from "./components/SendingMethods";

const SettingPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5">
      <div className="border shadow bg-white p-4 m-2 rounded-sm col-span-3">
        <SendingMethods />
      </div>
    </div>
  );
};

export default SettingPage;
