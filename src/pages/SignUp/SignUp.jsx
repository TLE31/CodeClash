import React, { useState } from "react";
import "./SignUp.css";
import { Helmet } from "react-helmet";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/codenova.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BeatLoader } from "react-spinners";

const SignUp = () => {
  const [show, setshow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState();
  const handleClick = () => setshow(!show);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword || !password || !name) {
      console.log("password do no match");
      toast.error("Passwords do not match!", {
        autoClose: 1000,
      });
      return;
    } else {
      try {
        const config = {
          headers: {
            "content-type": "application/json",
          },
        };
        setLoading(true);
        const { data } = await axios.post(
          "https://codeclash-server.onrender.com/api/v1/users/signup",
          {
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            photo: pic,
          },
          config
        );
        toast.success("Signup Successful, Please Login to continue", {
          autoClose: 1000,
        });
        // console.log(data);
        setLoading(false);

        const fdata = await data.token;
        if (!fdata) {
          toast.error("invalid credentials", {
            autoClose: 1000,
          });
          setLoading(false);
        } else {
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        toast.error(JSON.parse(err.request.response).message, {
          autoClose: 1000,
        });
        setLoading(false);
      }
    }
  };
  const postDetails = (pics) => {
    setLoading(true);
    if (pics == undefined) {
      alert("not uploaded");
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "/image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "codenova");
      data.append("cloud_name", "df4t1zu7e");
      fetch("https://api.cloudinary.com/v1_1/df4t1zu7e/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      alert("please select an image ");
      setLoading(false);
    }
  };
  return (
    <div className="signup">
      <Helmet>
        <title>CodeClash | Social</title>
      </Helmet>
      <div className="signup-container">
        <h2>CodeClash</h2>
        <h3>Welcome</h3>
        <div className="signup-input">
          <input
            type="text"
            placeholder="username"
            name="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="signup-username"
          />
          <input
            type="email"
            placeholder="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-username"
          />
          <div className="signup-password">
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
              placeholder="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="signup-username"
            />
          </div>
          <input
            type={show ? "text" : "password"}
            placeholder="confirm password"
            name="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="signup-username"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
          />
        </div>
        <a type="submit" className="btn-cta-blue" onClick={submitHandler}>
          {loading ? <BeatLoader color="#fff" /> : "Sign Up"}
        </a>
      </div>
      <div className="signup-footer">
        <p className="signup-footer-text">
          Already have an account?{" "}
          <Link to="/login" className="btn-cta-blue">
            Login
          </Link>
        </p>
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

export default SignUp;
