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
const AccessChat = ({ messages, setMessages, socket, selectedChatCompare }) => {
  //   const [messages, setMessages] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const [bool, setBool] = useState(false);
  const fetchMessages = async () => {
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
      socket.emit("join chat", selectedChat._id);
      setMessages(data);
      // console.log(user);
      //   console.log(data[0].content);
      //   console.log(data[1].content);
      //   setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  // useEffect(() => {
  //   fetchMessages();
  // }, [bool]);

  useEffect(() => {
    socket
      ? socket.on("message recieved", (newMessageReceived) => {
          // console.log("oooooooooooooooooooooooooooooooooooooooooooooooo");
          if (
            !selectedChatCompare ||
            selectedChatCompare._id !== newMessageReceived.chat._id
          ) {
            //notification
          } else {
            // console.log("------------received--------------");
            // console.log(newMessageReceived);
            setBool(!bool);
            // Microsoft Edge
            setMessages((messages) => [...messages, newMessageReceived]);

            //Chrome
            // setMessages([...messages, newMessageReceived]);
          }
        })
      : "";
  });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        width: "600px",
      }}
      className="chatBox"
    >
      {messages ? (
        messages.map((m, i) => (
          <div className="right" style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user.data.user._id) ||
              isLastMessage(messages, i, user.data.user._id)) && (
              <div className="profile-pic-2">
                <img src={m.sender.photo} alt="sender-image" />
              </div>
            )}
            <div
              style={{
                backgroundColor: `${
                  m.sender._id === user.data.user._id ? "#1F1212" : "#0F121B"
                }`,
                borderRadius: "20px",
                padding: "10px 20px",
                width: "300px",
                display: "flex",
                height: "auto",
                flexWrap: "wrap",
                marginLeft: isSameSenderMargin(
                  messages,
                  m,
                  i,
                  user.data.user._id
                ),
                marginTop: isSameUser(messages, m, i, user.data.user._id)
                  ? 3
                  : 10,
              }}
            >
              <div className="chat-message-content">
                <p>{m.content}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading..</p>
      )}
    </div>
  );
};

export default AccessChat;
