import React from 'react';
import { useNavigate } from 'react-router-dom';
import comingSoon from '../../assets/coming-soon.avif';
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
        <title>CodeClash | Contest</title>
      </Helmet>
      <h1>the Feature will be implemented soon !!</h1>
      <div className="btn-cta-blue" onClick={back}>
        Go Back
      </div>
      <img src={comingSoon} alt="coming soon" />
    </div>
  );
};

export default Error;
