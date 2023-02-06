const bodyParser = require("body-parser");
const express = require("express");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const app = express();
const cors = require("cors");
const userController = require("./Controllers/userController");
const port = 3001;

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
  console.log(req.session)
  req.session.destroy();
  return res.json({});
});

app.post("/login", (req, res) => {
  console.log("fetching_login");

  if (req.session.userid) {
    //do nothing
  } else {
    userController.login(req, res);
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
