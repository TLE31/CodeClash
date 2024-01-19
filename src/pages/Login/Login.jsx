import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/codenova.png";
import { BsGoogle, BsGithub, BsLinkedin } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BeatLoader } from "react-spinners";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ChatState } from "../../context/ChatProvider";
import { Helmet } from "react-helmet";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setshow] = useState(false);
  const [loginstatus, setloginstatus] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, setUser, isUserLoggedIn } = ChatState();

  const handleClick = () => setshow(!show);
  const login = async (e) => {
    e.preventDefault();
    // console.log(username);
    // console.log(password);

    if (!password || !username) {
      toast.error("Enter all the field", {
        autoClose: 1000,
      });
    } else {
      try {
        const config = {
          headers: {
            "content-type": "application/json",
          },
        };
        setLoading(true);
        const { data } = await axios.post(
          "https://codeclash-server.onrender.com/api/v1/users/login",
          { email: username, password: password },
          config
        );
        const fdata = await data.token;
        if (fdata) {
          console.log(data);
          localStorage.setItem("userInfo", JSON.stringify(data));
          isUserLoggedIn.current = data;
          navigate("/discussion");
          toast.success("Logged in successfully!", {
            autoClose: 1000,
          });
          setLoading(false);
        } else {
          setLoading(false);
          throw new Error("Invalid");
          setLoading(false);
        }
      } catch (err) {
        // alert(err);
        console.log(JSON.parse(err.request.response).message);
        setLoading(false);
        toast.error(JSON.parse(err.request.response).message, {
          autoClose: 1000,
        });
      }
    }
  };
  useEffect(() => {}, []);
  return (
    <div className="login-container">
      <Helmet>
        <title>CodeClash | Login</title>
      </Helmet>
      <div className="login">
        <h2>CodeClash</h2>
        <h3 className="login-welcome">Welcome Back</h3>
        <div className="login-input">
          <input
            type="text"
            placeholder="user email"
            name="username"
            className="login-username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <div className="login-password">
            {show ? (
              <AiOutlineEye className="btn-see" onClick={handleClick} />
            ) : (
              <AiOutlineEyeInvisible
                className="btn-see"
                onClick={handleClick}
              />
            )}
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              className="login-username"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <a type="submit" className="btn-cta-blue" onClick={login}>
          {loading ? <BeatLoader color="#fff" /> : "Login"}
        </a>
        {/* <div className="login-options">
          <BsGoogle className="login-google" />
          <BsGithub className="login-github" />
          <BsLinkedin className="login-linkedin" />
        </div> */}
        <div className="login-forgot">
          <Link exact="true" to="/forgotpassword" className="login-forgot-link">
            Forgot Password
          </Link>
        </div>

        <p>{loginstatus}</p>
      </div>
      <div className="login-signup">
        <div className="login-signup-text">Don't have an account?</div>
        <Link exact="true" to="/signup" className="login-signup-link">
          <a className="btn-cta-blue">Sign Up</a>
        </Link>
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

export default Login;
