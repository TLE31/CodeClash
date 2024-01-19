import React, { useState } from "react";
import ChatName from "./Name/ChatName";
import { ChatState } from "../../context/ChatProvider";
// import { ChatState } from "../../context/ChatProvider";
import "./Chat.css";
import AccessChat from "./AccessChat/AccessChat";
// import MessageBox from "./MessageBox/MessageBox";
import axios from "axios";
const AdminChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const handleclick = async () => {
    console.log(selectedChat);

    try {
      if (newMessage) {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "https://codeclash-server.onrender.com/api/v1/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        console.log(data);

        setMessages([...messages, data]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="chat-box">
      <div className="chatName">
        <ChatName />
      </div>
      <div className="chats">
        <div className="showChat">
          <AccessChat messages={messages} setMessages={setMessages} />
        </div>
      </div>
    </div>
  );
};

export default AdminChat;
