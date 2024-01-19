import React, { useEffect, useState } from "react";
import axios from "axios";
import ReportCard from "../../components/ReportCard/ReportCard";
import "./Reports.css";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const pageLoad = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
      };

      const { data } = await axios.get(
        `https://codeclash-server.onrender.com/api/v1/admin/all-reports`,
        config
      );

      //   console.log(data);
      setReports(data.report);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    pageLoad();
  }, []);
  return (
    <div className="report">
      <center>
        <h1>Reports</h1>
      </center>
      <div className="reports-content">
        {reports
          ? reports.map((item) => <ReportCard key={item._id} item={item} />)
          : "Loading.."}
      </div>
    </div>
  );
};

export default Reports;
