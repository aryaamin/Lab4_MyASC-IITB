const bodyParser = require("body-parser");
const express = require("express");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const app = express();
const cors = require("cors");
// const userController = require("./Controllers/userController");
const port = 3001;
const UserPass = require("./Models/user");
const Student = require("./Models/student");
const Courseinfo = require("./Models/course");
const Deptinfo = require("./Models/dept");
const Instinfo = require("./Models/Inst");
const RegisterInfo = require("./Models/regiser");


const oneDay = 1000 * 60 * 60 * 24;
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//session middleware
app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));

app.use(cookieParser());

app.get("/check-session", (req, res) => {
  if (req.session.userid) {
    return res.json({});
  } else {
    return res.json({ msg: "not-active" });
  }
});

app.get("/logout", (req, res) => {
  // console.log(req.session);
  req.session.destroy();
  return res.json({});
});


app.post("/dropcourse", async (req, res) => {
  console.log('aasssdsds',req.body.course_id);
  const user = new Student(req.body.id);
  user.dropCourse(req.body.id, req.body.course_id, req.body.semester, req.body.year);
});

app.post("/getinfo", async (req, res) => {
  if (req.session.userid) {
    console.log(req.session.id)
    const userid = req.session.userid;
    console.log('fdfd', userid);
    const user = new Student(userid)
    let info = await user.getInfo();
    let currSem = await user.getCurrentSem();
    let courses = await user.getCourses()
    // console.log('mydata', info)
    // console.log('currsem', currSem)
    // console.log('currsem', courses)
    res.json({"info" : info, "currsem" : currSem, "past" : courses["past"], "current" : courses["current"]})
  } else {
    return res.json({ msg: "non-active" });
  }
});


app.post("/courses", async (req, res) => {
  if (req.session.userid) {
    // console.log(req.session.id)
    const cid = req.body.cid;
    console.log('dfvsdvfdfd', cid);
    const user = new Courseinfo(cid)
    let coinfo = await user.getCurrCourses();
    // coinfo = coinfo.filter((item, 
    //   index) => coinfo.indexOf(item) === index);
    // $.each(coinfo, function(i, el){
    //     if($.inArray(el, uniqueinfo) === -1) uniqueinfo.push(el);
    // });
    console.log('mydata', coinfo)
    res.json({"info" : coinfo})
  } else {
    return res.json({ msg: "non-active" });
  }
});

app.post("/depts", async (req, res) => {
  if (req.session.userid) {
    const user = new Deptinfo()
    let coinfo = await user.getRunningDepts();
    console.log('mydata', coinfo)
    res.json({"info" : coinfo})
  } else {
    return res.json({ msg: "non-active" });
  }
});

app.post("/running", async (req, res) => {
  if (req.session.userid) {
    const user = new Deptinfo(req.body.deptname)
    let coinfo = await user.getRunningCourses();
    console.log('mydata', coinfo)
    res.json({"info" : coinfo})
  } else {
    return res.json({ msg: "non-active" });
  }
});

app.post("/allrunning", async (req, res) => {
  if (req.session.userid) {
    const user = new RegisterInfo(req.body.deptname)
    let reginfo = await user.getAllRunningCourses();
    console.log('myregdata', reginfo)
    res.json({"info" : reginfo})
  } else {
    return res.json({ msg: "non-active" });
  }
});

app.post("/instructor", async (req, res) => {
  if (req.session.userid) {
    const user = new Instinfo(req.body.inst_id)
    let instinfo = await user.getInstInfo();
    console.log('instinfo', instinfo)
    let instcurr = await user.getInstCurrCourses();
    console.log('instinfo2', instcurr)
    let instpast = await user.getInstPastCourses();
    console.log('instinfo3', instpast)
    res.json({"info" : instinfo, "currentCourses" : instcurr, "pastCourses" : instpast});
  } else {
    return res.json({ msg: "non-active" });
  }
});

app.post("/login", async (req, res) => {
  console.log("fetching_login");
  if (req.session.userid) {
    //do nothing
  } else {
    const { username, password } = req.body;
    const user = new UserPass(username);
    const result = await user.verifyPassword(password);

    if (result) {
      req.session.userid = username;
      req.session.save();
      
      res.send({});
      console.log("HELLO",req.session.id);
      console.log("LOGIN SUCCESSFULL");
    } else {
      return res.status(401).json({ error: "Incorrect username or password" });
    }
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
