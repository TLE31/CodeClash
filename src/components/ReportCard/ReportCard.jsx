import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReportCard.css";

const ReportCard = ({ item }) => {
  const navigate = useNavigate();
  const [color, setColor] = useState(item.isResolved ? item.isResolved : false);
  const handleClick = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
      };

      const { data } = await axios.post(
        "https://codeclash-server.onrender.com/api/v1/report/resolve-discussion",
        { reportId: item._id },
        config
      );
      //   console.log(data);

      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
  const handleChat = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
      };

      const { data } = await axios.post(
        "https://codeclash-server.onrender.com/api/v1/chat",
        { userId: item.sender._id },
        config
      );
      //   console.log(data);
      setColor(true);
      navigate("/chat");
      // console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="reportcard">
      <div className="reportcard-txt">
        <h3>{item.chatId ? item.chatId.chatName : ""}</h3>
        <p>Discription:</p>
        <h3>{item.chatId ? item.chatId.discription : ""}</h3>
        <p>Report arrised by</p>
        <h3>{item.sender ? item.sender.name : ""}</h3>
        <p>Report is</p>
        <h3>{item.content ? item.content : ""}</h3>
      </div>

      <div className="reportcard-button">
        <button className="btn" onClick={handleChat}>
          Chat with the person
        </button>
        <div className="resolved">
          {color ? (
            <button className="btn-cta-green">Solved</button>
          ) : (
            <button className="btn-cta-blue" onClick={handleClick}>
              ReSolve
            </button>
          )}
          {/* <button className="btn-cta-blue">Resolved</button> */}
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
