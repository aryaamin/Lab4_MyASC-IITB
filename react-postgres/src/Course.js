import React, { useState, useEffect } from "react";
// import { useLocation } from 'react-router-dom';

const Course = () => {
    // const [html, setHtml] = useState('');

    let path = document.location.pathname.split("/");
    const cid = path[path.length - 1];
    console.log('gfgfg', cid)
    // let coursenfo;


    const displayCourses = () => {
        // event.preventDefault();
    
        const response = fetch("http://localhost:3001/courses", {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cid }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              console.log('Error')
            } else {
              console.log("Getting Courses", data.info);
              let courseinfo = data.info;

              let main = document.getElementById('courseinfo');
              let title = document.createElement("h2");
              if(courseinfo.length === 0){
                console.log('NO DATA');
                title.innerText = 'NO DATA';
                main.appendChild(title);
              }
              else{

              let course = courseinfo[0]
              let inst = []
              let preq = []
              let venue = []
              let creds = []

              courseinfo.forEach((item) => {
                  inst.push({
                    inst_name: item.inst_name,
                    inst_id: item.inst_id,
                  })
                  preq.push({
                    prereq_title: item.prereq_title,
                    prereq_id: item.prereq_id,
                  });
                  venue.push({
                    building: item.building,
                    room_number: item.room_number,
                  });
                  creds.push({
                    credits: item.credits,
                  });
              });

              inst = inst.filter((value, index, self) =>
                index === self.findIndex((t) => (
                  t.inst_id === value.inst_id
                ))
              );
              preq = preq.filter((value, index, self) =>
                index === self.findIndex((t) => (
                  t.prereq_id === value.prereq_id
                ))
              );
              venue = venue.filter((value, index, self) =>
                index === self.findIndex((t) => (
                  t.building === value.building && t.room_number === value.room_number
                ))
              );
              creds = creds.filter((value, index, self) =>
                index === self.findIndex((t) => (
                  t.credits === value.credits
                ))
              );
             
              title.innerText = course.title;

              // let details = document.createElement("p");
              // details.innerText = 'Credits: '+course.credits+' | Building: '+course.building+' | Room: '+course.room_number;
            
             

              main.appendChild(title);

              // let credits = document.createElement("h3");
              // credits.innerText = 'Credits';
              // main.append(credits);

              creds.forEach((item) => {

                let li = document.createElement("li");
                li.innerText = 'Credits: '+item.credits;
                main.appendChild(li);

              });

              let venues = document.createElement("h3");
              venues.innerText = 'Venues';
              main.append(venues)

              venue.forEach((item) => {

                let li = document.createElement("li");
                li.innerText = 'Building: '+item.building + ' | Room: ' + item.room_number;
                main.appendChild(li);

              });



              let prereqs = document.createElement("h3");
              prereqs.innerText = 'Pre-Requisites';


              main.append(prereqs);

              preq.forEach((item) => {

                let li = document.createElement("li");
                let link = document.createElement("a");

                link.innerText = item.prereq_title;
                link.setAttribute('href', 'http://localhost:3000/course/'+item.prereq_id);
                li.appendChild(link);
                main.appendChild(li);

              });

              let instructors = document.createElement("h3");
              instructors.innerText = 'Instructors';

              main.append(instructors);

              inst.forEach((item) => {

                let li = document.createElement("li");
                let link = document.createElement("a");

                link.innerText = item.inst_name;
                link.setAttribute('href', 'http://localhost:3000/instructor/'+item.inst_id);
                li.appendChild(link);
                main.appendChild(li);

              });


            }


            };

            //   navigate("/home");
            });
    
      };

      useEffect(() => {
        displayCourses();
      });

      return (
        <div id='courseinfo'>
        </div>
    );

}

export default Course;
