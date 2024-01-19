import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, Link, useParams } from "react-router-dom";
import userpic from "../../assets/default.jpg";
import FriendCard from "../../components/FriendCard/FriendCard";
import FriendRequest from "../../components/FriendRequest/FriendRequest";
import { ChatState } from "../../context/ChatProvider";
import { FaUserFriends } from "react-icons/fa";
import { AiTwotoneEdit } from "react-icons/ai";
import { Helmet } from "react-helmet";

import "./Profile.css";

const Me = () => {
  const { slug } = useParams();
  const { user, isUserLoggedIn, openProfile } = ChatState();
  // const { isUserLoggedIn } = GlobalProvider();
  const [viewUser, setViewUser] = useState();
  const [isTrue, setIsTrue] = useState(false);
  const [request, setRequest] = useState(false);
  const [alreadyFriend, setAlreadyFriend] = useState(false);
  const [click, setClick] = useState(false);
  // console.log(slug);

  const pageLoad = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isUserLoggedIn.current.token}`,
        },
      };
      const { data } = await axios.get(
        `https://codeclash-server.onrender.com/api/v1/users/${slug}`,

        config
      );
      setViewUser(data.user[0]);
      for (let i = 0; i < data.user[0].friends.length; i++) {
        if (
          data.user[0].friends[i]._id ===
          JSON.parse(localStorage.getItem("userInfo")).data.user._id
        ) {
          setAlreadyFriend(true);
        }
      }

      for (let i = 0; i < data.user[0].friendsRequest.length; i++) {
        if (
          data.user[0].friendsRequest[i]._id ===
          JSON.parse(localStorage.getItem("userInfo")).data.user._id
        ) {
          setRequest(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const makeFriend = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
      };

      // console.log(viewUser);
      const { data } = await axios.post(
        `https://codeclash-server.onrender.com/api/v1/users/make-friend`,
        { friendId: viewUser._id },

        config
      );
      setIsTrue(true);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    pageLoad();
  }, [click, openProfile]);

  return (
    <div className="profile">
      <Helmet>
        <title>CodeClash | Profile</title>
      </Helmet>
      <div className="profile-content">
        <div className="profile-pic">
          <img src={viewUser ? viewUser.photo : userpic} alt="user" />
        </div>
        <div className="profile-content-details">
          {JSON.parse(localStorage.getItem("userInfo")).data.user._id !==
          (viewUser ? viewUser._id : "") ? (
            ""
          ) : (
            <div className="profile-edit">
              <Link to="/registration">
                <AiTwotoneEdit />
              </Link>
            </div>
          )}

          <h1>{viewUser ? viewUser.name : ""}</h1>
          <div className="profile-content-friend">
            <FaUserFriends />
            <h3>Friend of {viewUser ? viewUser.friends.length : ""} user</h3>
          </div>

          <div className="profile-admin">
            {JSON.parse(localStorage.getItem("userInfo")).data.user.role ===
            "admin" ? (
              // <button className="btn">View Chats</button>

              <Link to="/admin-chats">View Chats</Link>
            ) : (
              // <Link to="/view-reports">View Reports</Link>
              ""
            )}
            {JSON.parse(localStorage.getItem("userInfo")).data.user.role ===
            "admin" ? (
              <Link to="/view-reports">View Reports</Link>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <center>
        {JSON.parse(localStorage.getItem("userInfo")).data.user._id !==
        (viewUser ? viewUser._id : "") ? (
          alreadyFriend ? (
            "Your are friends"
          ) : request ? (
            "already Requested"
          ) : isTrue ? (
            "Request sent"
          ) : (
            <button className="btn-cta-blue" onClick={makeFriend}>
              Make Connection
            </button>
          )
        ) : (
          ""
        )}
      </center>

      <br />
      {JSON.parse(localStorage.getItem("userInfo")).data.user._id ===
      (viewUser ? viewUser._id : "") ? (
        <div className="friends-container">
          <h2>Friends</h2>
          <div className="friends">
            {viewUser
              ? viewUser.friends.map((item) => (
                  <FriendCard item={item} key={item._id} />
                ))
              : ""}
          </div>
        </div>
      ) : (
        ""
      )}

      <br />

      {JSON.parse(localStorage.getItem("userInfo")).data.user._id ===
      (viewUser ? viewUser._id : "") ? (
        <div className="friendrequest-container">
          <h2>Request Pendings</h2>
          <div className="friendrequest-content">
            {viewUser.friendsRequest
              ? viewUser.friendsRequest.map((item) => (
                  <FriendRequest
                    item={item}
                    key={item._id ? item._id : ""}
                    setClick={setClick}
                    click={click}
                  />
                ))
              : ""}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Me;
