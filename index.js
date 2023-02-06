const bodyParser = require('body-parser')
const express = require('express')
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const app = express()
const cors=require("cors")
const userController = require('./Controllers/userController')
const port = 3001

const oneDay = 1000 * 60 * 60 * 24;
app.use(cors({
  origin:'http://localhost:3000',
  credentials:true
}))
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
//   next();
// });

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));

app.use(cookieParser());

app.get("/check-session", (req, res) => {
  console.log('lllll', req.session)
  if (req.session.userid) {
    return res.json({});
  }
  else{
    return res.json({msg: 'fdf'});
  }
});

app.get('/logout',(req,res) => {
  req.session.destroy();
  console.log('khatam');
  return res.json({});
  // res.redirect('/login');
});

app.post('/login', (req, res) => {
  console.log('fetching_login')
  // console.log(req.body)
  console.log('nsrjbnsjbn', req.session)
  // if(req.session.userid){
  //   alert("cookie saved")
  // }
  // else{
  //   console.log(1)
  //   req.session.userid="1"
  //   res.send({})
  // }

    if(req.session.userid){
        // res.send("Welcome User <a href=\'/logout'>click to logout</a>");
        // res.send({})
        // navigate('/home')
    }else
    {
      userController.login(req, res)
      // res.sendFile('views/index.html',{root:__dirname})
    }
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})