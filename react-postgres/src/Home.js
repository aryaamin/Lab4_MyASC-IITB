import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Login from './Login'

const Home = () => {
  // const [name, setName] = useState("");
  // const [age, setAge] = useState("");
  var name, id, dept_name, tot_cred;

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

  const getInfo = () => {
    const response = fetch("http://localhost:3001/getinfo", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ id,, name,  }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("bbbgbbbg", data.currsem);
        if (data.msg) {
          navigate("/login");
        } else {
          //receiving data
          name = data.info.name;
          id = data.info.id;
          dept_name = data.info.dept_name;
          tot_cred = data.info.tot_cred;
          document.getElementById("name").innerHTML = name;
          document.getElementById("id").innerHTML = id;
          document.getElementById("dept").innerHTML = dept_name;
          document.getElementById("creds").innerHTML = tot_cred;
          let current = data.current;
          let past = data.past;
          let year = data.currsem.year;
          let semester = data.currsem.semester;

          function dropCourse(course_id) {
            console.log(`Dropping course with ID: ${course_id}`);
            const response = fetch("http://localhost:3001/dropcourse", {
              method: "POST",
              mode: "cors",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id, course_id, year, semester }),
            });
          }

          function createTable(courses) {
            let table = `<table style="width: 100%; border-collapse: collapse;">
            <thead style="background-color: lightgray;">
              <tr>
                <th style="border: 1px solid black; padding: 8px;">Course ID</th>
                <th style="border: 1px solid black; padding: 8px;">Sec ID</th>
                <th style="border: 1px solid black; padding: 8px;">Title</th>`;

            if (courses === current) {
              table += `<th style="border: 1px solid black; padding: 8px;">Action</th>`;
            }

            table += `</tr>
            </thead>
            <tbody>`;

            let currentYearSemester = "";
            for (let course of courses) {
              if (course.year + course.semester !== currentYearSemester) {
                table += `<tr><td colspan="4" style="background-color: lightgray; border: 1px solid black; padding: 8px;">${course.year} ${course.semester}</td></tr>`;
                currentYearSemester = course.year + course.semester;
              }

              table += `<tr>
                <td style="border: 1px solid black; padding: 8px;">${course.course_id}</td>
                <td style="border: 1px solid black; padding: 8px;">${course.sec_id}</td>
                <td style="border: 1px solid black; padding: 8px;">${course.title}</td>`;

              if (courses === current) {
                table += `<td style="border: 1px solid black; padding: 8px;"><button id="btn_${course.course_id}">Drop Course</button>`;

                // let dropButton = document.createElement("button");
                // dropButton.innerHTML = "Drop Course";
                // dropButton.addEventListener("click", function() {
                //     dropCourse(course.course_id);
                // });
                // table.append(dropButton);
              }

              table += `</tr>`;
            }

            table += `</tbody></table>`;
            return table;
          }

          // console.log("fgfgfg", current);
          document.getElementById("tables").innerHTML =
            createTable(current) + createTable(past);
          for (let course of current) {
            document
              .getElementById("btn_" + course.course_id)
              .addEventListener("click", function () {
                dropCourse(course.course_id);
              });
          }
          // console.log('received', data);
        }
        // console.log('gettinginfo', data);
      });
  };

  useEffect(() => {
    getInfo();
  });

  return (
    <div>
      <title>Page Title</title>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n  table {\n    width: 80%;\n    border-collapse: collapse;\n    margin: 20px auto;\n  }\n\n  th, td {\n    border: 1px solid #dddddd;\n    padding: 8px;\n    text-align: left;\n  }\n\n  th {\n    background-color: #dddddd;\n  }\n\n  ul {\n    list-style-type: square;\n    margin: 0;\n    padding: 0;\n  }\n\n  li {\n    display: inline-block;\n    margin-right: 20px;\n  }\n\n  button {\n    display: block;\n    margin: 20px auto;\n    padding: 8px 16px;\n    background-color: #4CAF50;\n    color: white;\n    border: none;\n    border-radius: 5px;\n    cursor: pointer;\n  }\n",
        }}
      />
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department Name</th>
            <th>Credits</th>
            {/* <th>Courses Taken</th> */}
          </tr>
          <tr>
            <td id="id"></td>
            <td id="name"></td>
            <td id="dept"></td>
            <td id="creds"></td>
            {/* <td>
              <ul>
                <li>Introduction to Computer Science</li>
                <li>Algorithms and Data Structures</li>
                <li>Programming in Python</li>
              </ul>
            </td> */}
          </tr>
        </tbody>
      </table>
      <div id="tables"></div>
      <button type="button" onClick={handleClick}>
        Logout
      </button>
    </div>
  );
};

export default Home;
