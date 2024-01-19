import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import error from '../../assets/error.png';
import './Error.css';
import { Helmet } from 'react-helmet';

const Error = () => {
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };

  return (
    <div className="error">
      <Helmet>
        <title>CodeClash | Error</title>
      </Helmet>
      <h1>Error 404 page not found</h1>
      <div className="btn-cta-blue" onClick={back}>
        Go Back
      </div>
      <img src={error} alt="error 404" />
    </div>
  );
};

export default Error;
