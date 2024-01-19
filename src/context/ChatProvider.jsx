import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [openProfile, setOpenProfile] = useState(false);
  const isUserLoggedIn = useRef({});
  const navigate = useNavigate();

  useEffect(() => {
    // const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(userInfo);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log("--------------Global----------------");
    isUserLoggedIn.current = userInfo;
    console.log(isUserLoggedIn.current);
    setUser(userInfo);
    if (!userInfo) {
      // alert("n");
      console.log("you are not logged in");
      navigate("/login");
    } else {
      console.log("you are logged in");
    }
  }, []);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        isUserLoggedIn,
        openProfile,
        setOpenProfile,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
