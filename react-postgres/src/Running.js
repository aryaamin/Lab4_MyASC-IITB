import React, { useState, useEffect } from "react";
// import { useLocation } from 'react-router-dom';

const Running = () => {

    const runningDepts = () => {

        const response = fetch("http://localhost:3001/depts", {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        //   body: JSON.stringify({ cid }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              console.log('Error')
            } else {
              console.log("Running Depts", data.info);
            //   let runninginfo = data.info;
              let list = document.getElementById('running');

              data.info.forEach((item) => {
                let li = document.createElement("li");
                let link = document.createElement("a");

                // list.setAttribute("style", `
                // width: 12em;
                // margin-bottom: 1em;
                // font-family: 'Trebuchet MS', 'Lucida Grande',
                // Verdana, Lucida, Geneva, Helvetica, 
                // Arial, sans-serif;
                // color: #333;
                // `);

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

                // list.style = courseListStyles;
                // li.style = courseItemStyles;
                // link.style = courseLinkStyles;
                // link.style.display = 'block';
                link.innerText = item.dept_name;
                link.setAttribute('href', 'http://localhost:3000/course/running/'+item.dept_name);
                li.appendChild(link);
                list.appendChild(li);
              });


            };

            //   navigate("/home");
            });
    
      };

      useEffect(() => {
        runningDepts();
      });

      return (
        
        <div id='running'>
            <h2>Running Departments</h2>
        </div>
    );

}

export default Running;
