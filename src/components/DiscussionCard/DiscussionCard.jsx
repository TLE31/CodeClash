import React, { useEffect, useState } from "react";
import "./DiscussionCard.css";
import utkarsh from "../../assets/utkarsh.jpg";
import { Link } from "react-router-dom";
import { BiUpvote, BiDownvote, BiComment } from "react-icons/bi";
import {
  BsThreeDotsVertical,
  BsShare,
  BsBookmark,
  BsFillBookmarkCheckFill,
} from "react-icons/bs";
import { GoReport } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";
import { AiTwotoneDelete } from "react-icons/ai";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReportPopup from "../ReportPopup/ReportPopup";

const DiscussionCard = ({ item }) => {
  const { user, setUser } = ChatState();
  const [report, setReport] = useState(false);
  // console.log(item.slug);
  const [open, setOpen] = useState(false);
  const [book, setBook] = useState(false);
  const [up, setUp] = useState(item.upvotes ? item.upvotes.length : 0);
  const [down, setDown] = useState(item.downvotes ? item.downvotes.length : 0);

  const openPopup = () => {
    setOpen(!open);
  };

  const handleUpVote = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
      };

      const { data } = await axios.post(
        `https://codeclash-server.onrender.com/api/v1/chat/vote/${item._id}`,
        { vote: "up" },
        config
      );
      setUp(data.upvotes);
      setDown(data.downvotes);
      // console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownVote = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
      };

      const { data } = await axios.post(
        `https://codeclash-server.onrender.com/api/v1/chat/vote/${item._id}`,
        { vote: "down" },
        config
      );
      setDown(data.downvotes);
      setUp(data.upvotes);
      // console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
      };

      const { data } = await axios.post(
        "https://codeclash-server.onrender.com/api/v1/admin/delete-discussion",
        { chatId: item._id },
        config
      );
      console.log(data);

      // console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
  const isBookmark = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
      };
      const { data } = await axios.get(
        `https://codeclash-server.onrender.com/api/v1/users/${user.data.user.name}`,

        config
      );
      console.log("LLLlllllllllllllllll");
      // console.log(data.user);
      const isbookmarked = await data.user[0].bookmarkChats.includes(item._id);

      setBook(isbookmarked);
    } catch (error) {
      console.error(error);
    }
  };

  const doBookmark = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
      };

      const { data } = await axios.post(
        "https://codeclash-server.onrender.com/api/v1/users/add-bookmark",
        { chatId: item._id },
        config
      );

      // include removed bookmarked popup
      toast.success("Question Bookmarked!", {
        autoClose: 1000,
      });

      // console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  // useEffect(() => {
  //   isBookmark();
  // });
  return (
    <div className="discussion-card">
      {/* {console.log(item)} */}
      {report ? <ReportPopup item={item._id ? item._id : ""} /> : ""}
      <div className="discussion-card-content">
        <div className="discussion-card-ques">
          <p>{item.name}</p>
          <p className="discussion-card-question">{item.chatName}</p>
          <div>
            <p className="discussion-card-text">created by</p>
            <img
              src={item.groupCreater ? item.groupCreater.photo : ""}
              alt="creator"
            />
            <h4>{item.groupCreater ? item.groupCreater.name : ""}</h4>
          </div>
        </div>

        <Link to={item ? item.slug : "/"} className="btn-cta-blue">
          Join Discussion
        </Link>
      </div>
      <div className="discussion-card-line"></div>

      <div className="discussion-card-datas">
        <div className="discussion-card-data">
          <div className="discussion-card-upvote" onClick={handleUpVote}>
            <BiUpvote className="discussion-icon" /> <p>{up}</p>
          </div>
          <div className="discussion-card-downvote" onClick={handleDownVote}>
            <BiDownvote className="discussion-icon" /> <p>{down}</p>
          </div>
          <div className="discussion-card-comment">
            <Link
              to={item ? item.slug : "/"}
              className="discussion-card-comment-link"
            >
              <BiComment className="discussion-icon" />
              {/* <p>4</p> */}
            </Link>
            {item
              ? item.users.map((user) => (
                  <img src={user.photo} alt="" key={user._id} />
                ))
              : ""}
            {/* <img src={utkarsh} alt="" />
            <img src={utkarsh} alt="" />
            <img src={utkarsh} alt="" /> */}
          </div>
        </div>
        {user.data.user.role === "admin" ? (
          <AiTwotoneDelete onClick={handleDelete} />
        ) : (
          ""
        )}
        <div className="discussion-card-dropdown" onClick={openPopup}>
          {open ? <RxCross1 /> : <BsThreeDotsVertical onClick={isBookmark} />}
          {open && (
            <div className="discussion-dropdown">
              <div>
                <BsShare /> Share
              </div>
              <div onClick={doBookmark}>
                {book ? <BsFillBookmarkCheckFill /> : <BsBookmark />}
                Bookmark
              </div>
              <div
                onClick={() => {
                  setReport(!report);
                }}
              >
                <GoReport /> Report
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default DiscussionCard;
