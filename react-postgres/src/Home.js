import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Login from './Login'

const Home = () => {
  const checkSession = async (event) => {
    const response = await fetch("http://localhost:3001/check-session", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg) {
          navigate("/login");
        } else {
          console.log("Already logged in");
        }
      });
  };

  useEffect(() => {
    checkSession();
  });

  const navigate = useNavigate();
  const handleClick = () => {
    const response = fetch("http://localhost:3001/logout", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Logged out");
        navigate("/login");
      });
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        LogOut
      </button>
    </div>
  );
};

export default Home;
