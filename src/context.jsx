import { useState } from "react";
import { createContext } from "react";
import { message } from "antd";
export const MESSAGE_API_CONTEXT = createContext({
  success: (content) => {},
  error: (content) => {},
  info: (content) => {},
  warning: (content) => {},
});

export const USER_PROFILE_CONTEXT = createContext({
  userProfile: null,
  setUserProfile: (userProfile) => {},
});
export function ContextWrapper({ children }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [userProfile, setUserProfile] = useState(null);
  return (
    <MESSAGE_API_CONTEXT.Provider value={messageApi}>
      <USER_PROFILE_CONTEXT.Provider value={{ userProfile, setUserProfile }}>
        {contextHolder}
        {children}
      </USER_PROFILE_CONTEXT.Provider>
    </MESSAGE_API_CONTEXT.Provider>
  );
}
