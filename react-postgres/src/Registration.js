import React, { useState, useEffect } from "react";
// import { useLocation } from 'react-router-dom';

const Registration = () => {

    const runningCourses = () => {

        const response = fetch("http://localhost:3001/allrunning", {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              console.log('Error')
            } else {
              console.log("Running Courses in Current Sem", data.info);
            //   let runninginfo = data.info;
              let main = document.getElementById('running');

              let tbl = document.createElement('table');


              main.appendChild(tbl);
              


            };

            //   navigate("/home");
            });
    
      };

      useEffect(() => {
        runningCourses();
      });

      return (
        
        <div id='running'>
            <h2>Running Courses this SEM</h2>
        </div>
    );

}

export default Registration;
