const jwt = require("jsonwebtoken");
const User = require("../Models/user");

const AuthController = {};

AuthController.login = (req, res) => {
  const { username, password } = req.body;
  User.findByUsername(username, (err, user) => {
    if (err) {
      console.log('vftf')
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (!user) {
      return res.status(401).json({ error: "Incorrect username or password" });
    }
    User.comparePassword(password, user.hashed_password, (err, isMatch) => {
      if (err) {
        console.log('vftf')
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (!isMatch) {
        return res.status(401).json({ error: "Incorrect username or password" });
      }
      const token = jwt.sign({ userId: user.id }, "secretkey", {
        expiresIn: "24h",
      });
      console.log('LOGIN SUCCESSFULL')
      // console.log(token)
      return res.json({ token });
    });
  });
};

module.exports = AuthController;
