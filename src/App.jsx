import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SignUp from "./Pages/SignUp";
import Forgot_Password from "./Pages/Forgot_Password";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import Sch_result from "./Pages/Sch_result";
import { ConfigProvider } from "antd";
import { ContextWrapper } from "./context";
function AntDesignConfig({ children }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#143474",
          colorFill: "#b1b1b1",
          // Alias Token
          colorBgContainer: "#f0f8ff",
        },
        components: {},
      }}
    >
      {children}
    </ConfigProvider>
  );
}
const App = () => {
  return (
    <BrowserRouter>
      <AntDesignConfig />
      <ContextWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot_password" element={<Forgot_Password />} />
          <Route path="/search_result" element={<Sch_result />} />
          <Route path="/main_page" element={<Main />} />
        </Routes>
      </ContextWrapper>
      <AntDesignConfig />
    </BrowserRouter>
  );
};

export default App;
