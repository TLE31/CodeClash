import { createContext, useContext, useState, useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const GlobalContext = createContext();
// const navigate = useNavigate();

const GlobalProvider = ({ children }) => {
  const [openProfile, setOpenProfile] = useState(false);
  const isUserLoggedIn = useRef({});

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log("--------------Global----------------");
    console.log(isUserLoggedIn.current);
    isUserLoggedIn.current = userInfo;
    if (!userInfo) {
      console.log("you are not logged in");
    } else {
      console.log("you are logged in");
      //   navigate("/login");
    }
  }, []);

  return (
    <GlobalContext.Provider value={{ isUserLoggedIn, openProfile }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const GlobalState = () => {
  return useContext(GlobalContext);
};

export default GlobalProvider;
