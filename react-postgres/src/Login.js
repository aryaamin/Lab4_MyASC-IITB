import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const checkSession = async (event) => {
    // event.preventDefault();

    const response = await fetch("http://localhost:3001/check-session", {
        method: "GET",
        mode:"cors",
        credentials: "include",
    })
    .then((res) => res.json())
        .then((data) => {
          // console.log('svdnsnvd', data)
          if (data.error) {
            setError(data.error);
          } 
          else if(data.msg) {
            //do nothing
          }
          else {
            console.log('Already logged in')
            navigate('/home')
            // Redirect to a secure page
          }
        });

    };

    useEffect(() => {
      checkSession();
    },);

  const handleLogin = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      mode:"cors",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
    .then((res) => res.json())
      .then((data) => {
        console.log('svdnsnvd', data)
        if (data.error) {
          setError(data.error);
        } else {
          // localStorage.setItem("token", data.token);
          // console.log(data.token)
          // setUser(data.cookie);
          // console.log(data.cookie)
          console.log('Logged in and returned to frontend')
          navigate('/home')
          // Redirect to a secure page
        }
      });

  };

  return (
    // <body onLoad={checkSession}>
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
    // </body>
  );
};

export default Login;
