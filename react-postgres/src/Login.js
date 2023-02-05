import React, { useState } from "react";
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
    .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          localStorage.setItem("token", data.token);
          console.log(data.token)
          navigate('/home')
          // Redirect to a secure page
        }
      });

      // console.log(response.json())



   
      // console.log(response.status)

    // const data = await response.json();

    // if (data.success) {
    //   window.location.href = "/home";
    // }

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   fetch("http://localhost:3001/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ username, password }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.error) {
  //         setError(data.error);
  //       } else {
  //         localStorage.setItem("token", data.token);
  //         // Redirect to a secure page
  //       }
  //     });
  };

  return (
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
  );
};

export default Login;
