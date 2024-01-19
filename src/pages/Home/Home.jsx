import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FlagCard from "../../components/FlagCard/FlagCard";
import "./Home.css";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChatState } from "../../context/ChatProvider";
import { Helmet } from "react-helmet";
import Leaderboard from "../../components/Leaderboard/Leaderboard";

const Home = () => {
  const navigate = useNavigate();
  const { isUserLoggedIn } = ChatState();
  const [capture, setCapture] = useState([]);
  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useState(false);
  const [discription, setDiscription] = useState("");
  const [hint, setHint] = useState("");
  const [flag, setFlag] = useState("");
  const [link, setLink] = useState("");

  const pageLoad = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isUserLoggedIn.current.token}`,
        },
      };
      const { data } = await axios.get(
        `https://codeclash-server.onrender.com/api/v1/ctf`,

        config
      );
      console.log(data.data);
      setCapture(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const objects = [
    {
      heading: "hsdfs",
      description: "sdfsdf",
      link: "sdfsdf",
      hint: "dsfsdfsd",
    },
    {
      heading: "hi",
      description: "sdfsdfsdfsdfsdf",
      link: "aaaa",
      hint: "345sdx",
    },
  ];

  const handleClick = async () => {
    if (!discription || !heading || !hint || !flag || !link) {
      toast.error("Enter all the fields", {
        autoClose: 1000,
      });
    } else {
      setLoading(true);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isUserLoggedIn.current.token}`,
          },
        };
        console.log(isUserLoggedIn.current.token);
        const { data } = await axios.post(
          `https://codeclash-server.onrender.com/api/v1/ctf/createCtf`,
          {
            description: discription,
            heading,
            hint,
            flag,
            link,
          },
          config
        );
        toast.success("New CTF added", {
          autoClose: 1000,
        });
        // setNewDiscussion(data);
        setLoading(false);
        console.log(data);
        setCapture([...capture, data.data]);
        setDiscription("");
        setHeading("");
        setHint("");
        setFlag("");
        setLink("");
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast.error(error.response.data.message, {
          autoClose: 1000,
        });
      }
    }
  };
  useEffect(() => {
    if (!isUserLoggedIn.current) {
      navigate("/login");
    }
    pageLoad();
  }, []);

  return (
    <div className="home">
      <div className="another">
        <Helmet>
          <title>CodeClash | Home</title>
        </Helmet>
        <h1>Community Page --</h1>
        <div className="discussion-question">
          <TextField
            id="filled-basic"
            label="Heading of CTF / Type of CTF"
            variant="filled"
            className="discussion-question-input"
            value={heading}
            onChange={(e) => {
              setHeading(e.target.value);
            }}
          />
          <TextField
            id="filled-basic"
            label="Add description of ctf"
            variant="filled"
            multiline
            value={discription}
            className="discussion-question-input"
            onChange={(e) => {
              setDiscription(e.target.value);
            }}
          />
          <TextField
            id="filled-multiline-static"
            label="Link of the site"
            multiline
            variant="filled"
            value={link}
            className="discussion-question-input"
            onChange={(e) => {
              setLink(e.target.value);
            }}
          />
          <TextField
            id="filled-multiline-static"
            label="Hint for CTF"
            multiline
            variant="filled"
            value={hint}
            className="discussion-question-input"
            onChange={(e) => {
              setHint(e.target.value);
            }}
          />
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
          />
          <a className="btn-cta-blue" onClick={handleClick}>
            {!loading ? "Create CTF" : <BeatLoader color="#fff" />}
          </a>
        </div>
        <h3>All Flags are published here, you can try capturing them</h3>
        <div className="capture-the-flag">
          <div className="ctfs">
            {capture?.map((object) => (
              <div className="flag-flex" key={object._id}>
                <FlagCard object={object} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="leader">
        <Leaderboard />
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

export default Home;
