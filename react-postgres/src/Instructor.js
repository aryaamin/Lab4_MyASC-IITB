import React, { useState, useEffect } from "react";
// import { useLocation } from 'react-router-dom';

const Instructor = () => {

    let path = document.location.pathname.split("/");
    const inst_id = path[path.length - 1];

    const instructorInfo = () => {

        const response = fetch("http://localhost:3001/instructor", {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inst_id }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              console.log('Error')
            } else {
              console.log("Inst info", data.info);
            //   let runninginfo = data.info;
              let main = document.getElementById('running');

              let currentCourses = data.currentCourses;
              let pastCourses = data.pastCourses;
              let info = data.info;

              let inst_name = document.createElement("h3");
              inst_name.innerText = info.name;
              main.append(inst_name)

              let dept = document.createElement("h3");
              dept.innerText = info.dept_name;
              main.append(dept)

              let curr = document.createElement("h3");
              curr.innerText = 'Current Courses';
              main.append(curr)

              currentCourses.forEach((item) => {

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
                
                link.innerText = 'ID: '+item.course_id + ' | Title: ' + item.title;
                link.setAttribute('href', 'http://localhost:3000/course/'+item.course_id);
                li.appendChild(link);
                main.appendChild(li);

              });

              let past = document.createElement("h3");
              past.innerText = 'Past Courses';
              main.append(past);

              pastCourses.forEach((item) => {

                let li = document.createElement("li");
                li.innerText = 'ID: '+item.course_id + ' | Title: ' + item.title;
                main.appendChild(li);

              });


            };

            //   navigate("/home");
            });
    
      };

      useEffect(() => {
        instructorInfo();
      });

      return (
        
        <div id='running'>
            <h2>Instructor Info</h2>
        </div>
    );

}

export default Instructor;
