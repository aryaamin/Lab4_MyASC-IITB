// const bcrypt = require("bcryptjs");
// const UserPass = require("../Models/user.js");
// const Student = require("../Models/student.js");


// const AuthController = {};

// AuthController.login = async (req, res) => {

//   const { username, password } = req.body;
//   const user = new UserPass(username);
//   const result = await user.verifyPassword(password);

//   if (result) {
//     req.session.userid = username;
//     req.session.save();
//     res.send({});
//     console.log("LOGIN SUCCESSFULL");
//   } else {
//     return res
//           .status(401)
//           .json({ error: "Incorrect username or password" });
//   }

// };

// AuthController.getinfo = async (req, res) => {
//   const userid = req.session.userid;
//   console.log('fdfd', userid);

//   const user = new Student(userid)

//   let info = await user.getInfo();

//   console.log('mydata', info)

//   res.send(info)

//   // console.log('fetchinginfo', data[1]);
//   // let data = {
//   //   name: "John Doe",
//   //   age: 30
//   // };
//   // return data;
//   // return req.json({body11: 'dataofuser'});
//   // User.userInfo(userid, )
// };

// module.exports = AuthController;
