import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { Helmet } from "react-helmet";
import axios from "axios";

import "./Social.css";
import SocialCard from "../../components/SocialCard/SocialCard";
import { useNavigate } from "react-router-dom";

const Social = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, isUserLoggedIn } = ChatState();
  const navigate = useNavigate();
  const handleSearch = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
      };

      const { data } = await axios.get(
        `https://codeclash-server.onrender.com/api/v1/users?search=${search}`,
        config
      );
      setSearchResult(data.users);
      // console.log(data.users);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleSearch();
  }, [search]);
  useEffect(() => {
    if (!isUserLoggedIn.current) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Helmet>
        <title>CodeClash | Social</title>
      </Helmet>

      <div className="social-searchbox">
        {/* <img src={logo} alt="logo" /> */}

        <input
          type="text"
          placeholder="search for user"
          className="login-username"
          value={search}
          onChange={(e) => {
            e.preventDefault();
            setSearch(e.target.value);
          }}
        />
        <a className="btn-round">Search Profile</a>
        <div className="social-searchbyhandle"></div>
      </div>
      <div className="social-middle">
        <div className="user-card">
          {searchResult.length !== 0 ? (
            searchResult.map((user) => (
              <SocialCard user={user} key={user._id} />
            ))
          ) : (
            <p>user not found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Social;
