import React, { useEffect, useState } from "react";
import { ChatState } from "../../../context/ChatProvider";
import "./AcessChat.css";

import axios from "axios";
import {
  isSameSender,
  isLastMessage,
  isSameSenderMargin,
  isSameUser,
} from "../../../context/ChatLogics";
const AccessChat = ({ messages, setMessages }) => {
  //   const [messages, setMessages] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const fetchMessages = async () => {
    // console.log()
    if (!selectedChat) {
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `https://codeclash-server.onrender.com/api/v1/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      // console.log("------------selected chats-----------");
      // console.log(selectedChat);
      //   console.log(data[0].content);
      //   console.log(data[1].content);
      //   setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
      }}
      className="chatBox"
    >
      {messages ? (
        messages.map((m, i) => (
          <div className="right" style={{ display: "flex" }} key={m._id}>
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user.data.user._id ? "#081736" : "#050A1D"
                }`,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                marginLeft: isSameSenderMargin(
                  messages,
                  m,
                  i,
                  selectedChat.users[0]._id
                ),
                marginTop: isSameUser(messages, m, i, selectedChat.users[0]._id)
                  ? 5
                  : 10,
              }}
            >
              <h6>{m.sender.name}</h6>

              <p>{m.content}</p>
            </span>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AccessChat;
