import React, { useState, useEffect } from "react";
// import { useLocation } from 'react-router-dom';

const Dept = () => {

    let path = document.location.pathname.split("/");
    const deptname = path[path.length - 1];

    const runningCourses = () => {

        const response = fetch("http://localhost:3001/running", {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ deptname }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              console.log('Error')
            } else {
              console.log("Running Courses", data.info);
            //   let runninginfo = data.info;
              let list = document.getElementById('running');

              data.info.forEach((item) => {
                let li = document.createElement("li");
                let link = document.createElement("a");

                link.setAttribute("style", `
                display: block;
                padding: 5px 5px 5px 0.5em;
                color: black;
                text-decoration: none;
                width: 100%;
                `);

                li.setAttribute("style", `
                    listStyle: 'none';
                    display: block;
                    padding: '0';
                    margin: '0';
                `);

                link.innerText = item.title;
                link.setAttribute('href', 'http://localhost:3000/course/'+item.course_id);
                li.appendChild(link);
                list.appendChild(li);
              });


            };

            //   navigate("/home");
            });
    
      };

      useEffect(() => {
        runningCourses();
      });

      return (
        
        <div id='running'>
            <h2>Running Courses in this Department</h2>
        </div>
    );

}

export default Dept;
