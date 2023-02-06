const User = require("../Models/user");

const AuthController = {};

AuthController.login = (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  User.findByUsername(username, (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (!user) {
      return res.status(401).json({ error: "Incorrect username or password" });
    }
    User.comparePassword(password, user.hashed_password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (!isMatch) {
        return res
          .status(401)
          .json({ error: "Incorrect username or password" });
      }
      req.session.userid = username;
      // console.log(req.session);
      req.session.save();
      res.send({});
      console.log("LOGIN SUCCESSFULL");
    });
  });
};

AuthController.getinfo = (req, res) => {
  const { userid } = req.body;
  console.log(req.body);
  User.userInfo(userid, )
};

module.exports = AuthController;
