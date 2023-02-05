const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const userController = require('./Controllers/userController')
const port = 3001

app.use(bodyParser.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});


app.post('/login', (req, res) => {
  // console.log("jkvbvfjnknkn")
  console.log(req.body)
  userController.login(req, res)
  // .then(response => {
  //   console.log("svsv")
  //   res.status(200).send(response);
  //   console.log("bdb")
  // })
  // .catch(error => {
  //   res.status(500).send(error);
  // })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})