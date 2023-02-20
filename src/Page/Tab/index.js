import React from 'react';
import TabBar from "../../Components/TabBar"
import Main from "../Main";
import {Route, Routes, useNavigate} from "react-router-dom";

const Tab = () => {
  const navigate = useNavigate();
  return (
    <>
      <TabBar/>
      <Routes>
        {/*<Route*/}
        {/*  path="/new_analysis/*"*/}
        {/*  element={<CreateAnalysis to="/new_analysis"/>}*/}
        {/*/>*/}
        <Route
          path="/main"
          element={<Main to="/main"/>}
        />
      </Routes>
    </>
  );
};

export default Tab;
