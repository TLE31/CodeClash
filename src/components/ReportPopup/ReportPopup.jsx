import React, { useEffect, useState } from "react";
import "./ReportPopup.css";
import TextField from "@mui/material/TextField";
import axios from "axios";

const ReportPopup = ({ item }) => {
  // console.log(item);
  const [query, setQuery] = useState("");
  const handleClick = async () => {
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
        `https://codeclash-server.onrender.com/api/v1/report/report-discussion`,
        { content: query, chatId: item._id },
        config
      );
      console.log(data);
      setQuery("");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  return (
    <div className="reportpopup">
      <div className="report-bg"></div>
      <div className="discussion-answer-self">
        <h3>Reason for reporting</h3>
        <div>
          <TextField
            id="filled-basic"
            label="Write your query"
            variant="outlined"
            multiline
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            className="discussion-question-input"
          />
        </div>
        <div className="reportpopup-buttons">
          <div className="btn-cta-blue" onClick={handleClick}>
            Post Query
          </div>
          <div className="btn-cta-light">Close</div>
        </div>
      </div>
    </div>
  );
};

export default ReportPopup;
