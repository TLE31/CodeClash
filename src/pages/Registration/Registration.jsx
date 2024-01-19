import { React, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BeatLoader } from "react-spinners";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/codenova.png";
import { ChatState } from "../../context/ChatProvider";

const Registration = () => {
  const [loading, setLoading] = useState(false);
  const { isUserLoggedIn } = ChatState();

  const [githubHandle, setGithubHandle] = useState("");
  const [codeforcesHandle, setCodeforcesHandle] = useState("");
  const [codechefHandle, setCodechefHandle] = useState("");
  const [leetcodeHandle, setLeetcodeHandle] = useState("");
  const [gfgHandle, setGfgHandle] = useState("");
  const [college, setCollege] = useState("");
  const [techStack, setTechStack] = useState("");

  const register = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isUserLoggedIn.current.token}`,
        },
      };
      // console.log("---------------------------------");
      console.log(college);
      // console.log("---------------------------------");
      const { data } = await axios.post(
        "https://codeclash-server.onrender.com/api/v1/users/register",
        {
          college: college,
          githubHandle: githubHandle,
          codeforcesHandle: codeforcesHandle,
          codechefHandle: codechefHandle,
          leetcodeHandle: leetcodeHandle,
          gfgHandle: gfgHandle,
          techStack: techStack,
        },
        config
      );

      // console.log(data);
      if (data) {
        toast.success("registration successfull", {
          autoClose: 1000,
        });
      }

      // console.log(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("registration failed, Please check the written handles", {
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="signup signup-container">
      {/* <form className="signup-container"> */}
      <img src={logo} />
      <h3 className="signup-welcome">Welcome</h3>
      <div className="signup-input">
        <input
          type="text"
          placeholder="college name"
          name="college"
          className="signup-username"
          value={college}
          onChange={(e) => setCollege(e.target.value)}
        />
        <input
          type="text"
          placeholder="github username"
          name="githubHandle"
          className="signup-username"
          value={githubHandle}
          onChange={(e) => setGithubHandle(e.target.value)}
        />
        <input
          type="text"
          placeholder="codeforces username"
          name="codeforcesHandle"
          className="signup-username"
          value={codeforcesHandle}
          onChange={(e) => setCodeforcesHandle(e.target.value)}
        />
        <input
          type="text"
          placeholder="codechef username"
          name="codechefHandle"
          className="signup-username"
          value={codechefHandle}
          onChange={(e) => setCodechefHandle(e.target.value)}
        />
        <input
          type="text"
          placeholder="leetcode username"
          name="leetcodeHandle"
          className="signup-username"
          value={leetcodeHandle}
          onChange={(e) => setLeetcodeHandle(e.target.value)}
        />
        <input
          type="text"
          placeholder="gfg username"
          name="gfgHandle"
          className="signup-username"
          value={gfgHandle}
          onChange={(e) => setGfgHandle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tech Stack : java c++ python javascript"
          name="techStack"
          className="signup-username"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
        />
      </div>
      <div>
        <button type="submit" className="btn-cta-blue" onClick={register}>
          {loading ? <BeatLoader color="#fff" /> : "Register"}
        </button>
      </div>
      {/* </form> */}
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

export default Registration;
