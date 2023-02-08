import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Course from "./Course";
import Running from "./Running";
import Dept from "./Dept";
import Instructor from "./Instructor";
import Registration from "./Registration";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="home/registration" element={<Registration />} />
        <Route path="course/:cid" element={<Course />} />
        <Route path="course/running" element={<Running />} />
        <Route path="course/running/:deptname" element={<Dept />} />
        <Route path="instructor/:instructor_id" element={<Instructor />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
