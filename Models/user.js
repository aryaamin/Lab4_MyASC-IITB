const bcrypt = require("bcryptjs");
const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "lab4",
  password: "9909911391",
  port: 5432,
});
client.connect();

const User = {};

User.findByUsername = (username, cb) => {
  const query = {
    text: "SELECT * FROM user_password WHERE id = $1",
    values: [username],
  };
  client.query(query, (err, result) => {
    if (err) return cb(err, null);
    return cb(null, result.rows[0]);
  });
};

User.comparePassword = (candidatePassword, hash, cb) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) return cb(err);
    return cb(null, isMatch);
  });
};

User.userInfo = (userid, cb) => {
  const query = {
    text: "SELECT * FROM student WHERE id = $1",
    values: [userid],
  };
  client.query(query, (err, result) => {
    if (err) return cb(err, null);
    return cb(null, result.rows[0]);
  });
};




module.exports = User;
