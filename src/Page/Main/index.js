import React from 'react';
import {Outlet} from "react-router-dom";
import TabBar from "../../Components/TabBar";

const Main = () => {
  return (
    <>
      <TabBar/>
      <div className="pr-5 pl-5 pb-5 flex-container">
          <Outlet/>
      </div>
    </>
  );
};

export default Main;
