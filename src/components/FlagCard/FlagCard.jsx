import React, { useState } from "react";
import "./FlagCard.css";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { ChatState } from "../../context/ChatProvider";

const FlagCard = ({ object }) => {
  const { isUserLoggedIn } = ChatState();
  const [flag, setFlag] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [show, setShow] = useState(false);
  const eyeChange = () => {
    setShow(!show);
  };
  const submitFlag = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isUserLoggedIn.current.token}`,
        },
      };
      const data = await axios.post(
        `https://codeclash-server.onrender.com/api/v1/ctf/submitFlag`,
        { flag: flag, ctfId: object._id },
        config
      );
      console.log(data);
      setLoading(false);
      if (data.data.status === "success") {
        setFlag("");
        setIsSolved(true);
        toast.success(data.data.message, {
          autoClose: 2500,
        });
      } else {
        toast.error(data.data.message, {
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error("Entered Flag is not correct, Please try again", {
        autoClose: 1000,
      });
      setLoading(false);
      console.error(error);
    }
  };
  // console.log(isUserLoggedIn.current.data.user._id);
  // console.log(object.users);
  return (
    <div className="flagBox">
      {object && object.users.includes(isUserLoggedIn.current.data.user._id) ? (
        <h3>You Solved this</h3>
      ) : (
        ""
      )}
      <h2>{object ? object.heading : ""}</h2>
      <div className="flagBox-contents">
        <div>Discription: {object ? object.description : ""}</div>
        <div className="flag-card-link">
          Link: <p> {object ? object.link : ""} </p>
        </div>
        <div className="flagBox-author">
          {object ? <img src={object.host.photo} /> : ""}
          <p>Author:{object ? object.host.name : ""}</p>
        </div>
        <div className="flagBox-hint">
          Hint:{" "}
          {show ? (
            <AiOutlineEye onClick={eyeChange} />
          ) : (
            <AiOutlineEyeInvisible onClick={eyeChange} />
          )}{" "}
          {object && object.hint && show ? object.hint : ""}
        </div>
      </div>
      <div className="flagBox-input">
        <TextField
          id="filled-multiline-static"
          label="Flag you inserted in CTF"
          multiline
          variant="filled"
          value={flag}
          className="discussion-question-input"
          onChange={(e) => {
            setFlag(e.target.value);
          }}
          style={{ width: "420px" }}
        />
        <button className="btn-cta-blue" onClick={submitFlag}>
          {!loading ? "Submit Flag Id" : <BeatLoader color="#fff" />}
        </button>
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

export default FlagCard;
