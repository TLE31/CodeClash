import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FriendRequest.css";

const FriendRequest = ({ item, setClick, click }) => {
  const navigate = useNavigate();
  const [color, setColor] = useState(item.isResolved ? item.isResolved : false);
  const handleAccept = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
      };
      const { data } = await axios.post(
        `https://codeclash-server.onrender.com/api/v1/users/accept-request`,
        { friendId: item._id, accept: true },

        config
      );
      setClick(!click);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDecline = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
      };
      const { data } = await axios.post(
        `https://codeclash-server.onrender.com/api/v1/users/accept-request`,
        { friendId: item._id, accept: false },

        config
      );
      setClick(!click);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="friendrequest">
      <div className="friendrequest-txt">
        <p>Requested By:</p>
        <img src={item.photo ? item.photo : ""} alt="user-image" />
      </div>

      <div className="friendrequest-buttons">
        <button className="btn" onClick={handleAccept}>
          Accept
        </button>
        <button className="btn" onClick={handleDecline}>
          Decline
        </button>
      </div>
    </div>
  );
};

export default FriendRequest;
