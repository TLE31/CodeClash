import React, { useEffect, useState } from "react";
import { ChatState } from "../../../context/ChatProvider";
import axios from "axios";
// import ChatNameAvatar from "./ChatNameAvatar/ChatNameAvatar";
import "./ChatName.css";
const ChatName = () => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const fetchChats = async () => {
    // console.log(user);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
      };

      const { data } = await axios.get(
        "https://codeclash-server.onrender.com/api/v1/admin/all-chats",
        config
      );
      console.log(data);
      setChats(data.chats);
    } catch (error) {
      console.log(error);
      // alert(error);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);
  return (
    <div>
      {/* {chats && chats.map((chat) => <div className="myChats">{chat.name}</div>)} */}
      {chats.length > 0 ? (
        chats.map((chat) => (
          <div
            className="myChats"
            key={chat._id}
            onClick={() => {
              setSelectedChat(chat);
              console.log(chat._id);
            }}
            style={{
              cursor: "pointer",
              background: `${selectedChat === chat ? "#232828" : "#463F3F"}`,
              color: `${selectedChat === chat ? "white" : "white"}`,
            }}
          >
            <p className="text">{chat.users[1].name}</p>
            <p className="text">{chat.users[0].name}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ChatName;
