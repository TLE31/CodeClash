import { React, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md ";
import { BiUpvote, BiDownvote, BiComment } from "react-icons/bi";
import { BsThreeDotsVertical, BsShare, BsBookmark } from "react-icons/bs";
import { GoReport } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";
import "./DiscussionChat.css";
import DiscussionAnswer from "../../components/DiscussionAnswer/DiscussionAnswer";
import ReportPopup from "../../components/ReportPopup/ReportPopup";
import TextField from "@mui/material/TextField";
import utkarsh from "../../assets/utkarsh.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Helmet } from "react-helmet";

const DiscussionChat = () => {
  const { slug } = useParams();
  const [open, setOpen] = useState(false);
  const [discussionData, setDiscussionData] = useState({});
  const [messages, setMessages] = useState([]);

  const [answer, setAnswer] = useState("");
  const [answercode, setAnswercode] = useState("");
  // update this
  const [up, setUp] = useState(0);
  const [down, setDown] = useState(0);
  // reportpopup
  const [report, setReport] = useState(false);

  const openPopup = () => {
    setOpen(!open);
  };

  const navigate = useNavigate();

  const back = () => {
    navigate(-1);
  };

  const faltu = () => {
    console.log("");
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
        `https://codeclash-server.onrender.com/api/v1/chat/vote/${discussionData._id}`,
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
        `https://codeclash-server.onrender.com/api/v1/chat/vote/${discussionData._id}`,
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

  // console.log(slug);

  const pageLoad = async () => {
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
        `https://codeclash-server.onrender.com/api/v1/chat/slug`,
        { slug: slug },
        config
      );

      // console.log(data.chat[0]);
      setDiscussionData(data.chat[0]);
      setUp(data.chat[0].upvotes.length);
      setDown(data.chat[0].downvotes.length);

      const message = await axios.get(
        `https://codeclash-server.onrender.com/api/v1/message/${data.chat[0]._id}`,

        config
      );
      // console.log(message.data);
      setMessages(message.data);
      //   console.log(data[1].content);
      //   setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async () => {
    if (answer === "") {
      toast.error("Enter Your Answer", {
        autoClose: 2000,
      });
    } else {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("userInfo")).token
            }`,
          },
        };
        toast.success("Answer submitted successfully", {
          autoClose: 2000,
        });
        const { data } = await axios.post(
          `https://codeclash-server.onrender.com/api/v1/message/`,
          { content: answer, code: answercode, chatId: discussionData._id },
          config
        );
        // console.log(data);
        setMessages([...messages, data]);
        // console.log(messages);
        setAnswer("");
        setAnswercode("");
        toast.success("Answer submitted successfully", {
          autoClose: 2000,
        });
        // console.log(data.chat[0]);
        // setDiscussionData(data.chat[0]);
      } catch (error) {
        console.log(error);
        toast.error("Enter Your Answer", {
          autoClose: 2000,
        });
      }
    }
  };

  useEffect(() => {
    pageLoad();
  }, []);

  return (
    <div className="discussion-chat">
      <Helmet>
        <title>CodeClash | Discussion Chat</title>
      </Helmet>
      <div className="back-button" onClick={back}>
        <MdArrowBackIos />
      </div>

      {report ? <ReportPopup item={discussionData} /> : ""}

      <div className="discussion-chat-question">
        <div className="discussion-chat-question-content">
          <h2>{discussionData.chatName ? discussionData.chatName : ""}</h2>
          {discussionData.discription && (
            <p>
              {discussionData.discription ? discussionData.discription : ""}
            </p>
          )}
          {discussionData.code && (
            <pre className="discussion-chat-question-code">
              <code>{`${discussionData.code ? discussionData.code : ""}`}</code>
            </pre>
          )}
        </div>
        <div className="discussion-chat-question-line"></div>

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
                // to={item ? item.slug : "/"}
                to="/"
                className="discussion-card-comment-link"
              >
                <BiComment className="discussion-icon" />
                <p>4</p>
              </Link>
              <img src="http://res.cloudinary.com/df4t1zu7e/image/upload/v1678403577/i9refylv9btn7xrb69gd.jpg" alt="" />
              <img src="http://res.cloudinary.com/df4t1zu7e/image/upload/v1678403577/i9refylv9btn7xrb69gd.jpg" alt="" />
              <img src="http://res.cloudinary.com/df4t1zu7e/image/upload/v1678403577/i9refylv9btn7xrb69gd.jpg" alt="" />
              <img src="http://res.cloudinary.com/df4t1zu7e/image/upload/v1678403577/i9refylv9btn7xrb69gd.jpg" alt="" />
            </div>
          </div>
          {/* {user.data.user.role === "admin" ? (
              <AiTwotoneDelete onClick={handleDelete} />
            ) : (
              ""
            )} */}
          <div className="discussion-card-dropdown" onClick={openPopup}>
            {open ? <RxCross1 /> : <BsThreeDotsVertical />}
            {open && (
              <div className="discussion-dropdown">
                <div>
                  <BsShare /> Share
                </div>
                <div>
                  <BsBookmark /> Bookmark
                </div>
                <div
                  onClick={() => {
                    // console.log("clicked");
                    setReport(!report);
                  }}
                >
                  <GoReport /> Report
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="discussion-answer-self">
        <h3>Your Answer</h3>
        <div>
          <TextField
            id="filled-basic"
            label="Write your answer"
            variant="outlined"
            multiline
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
            className="discussion-question-input"
          />
          <TextField
            id="filled-multiline-static"
            label="Add code here"
            multiline
            variant="filled"
            value={answercode}
            onChange={(e) => {
              setAnswercode(e.target.value);
            }}
            className="discussion-question-input"
          />
        </div>
        <div onClick={handleClick} className="btn-cta-blue">
          Post Answer
        </div>
      </div>
      <div className="discussion-chat-comments">
        {messages.length > 0
          ? messages.map((item) => (
              <DiscussionAnswer item={item} key={item._id} />
            ))
          : "Loading..."}

        {/* <DiscussionAnswer />
        <DiscussionAnswer /> */}
      </div>
    </div>
  );
};

export default DiscussionChat;
