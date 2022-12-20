var express = require('express');
var router = express.Router();
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const crypto = require('crypto')
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://ABM_005:semsenha@cluster0.mswmleb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
  db()
});
router.use((req, res, next) => {
  const authToken = req.cookies['AuthToken'];
  req.user = authTokens[authToken];
  next();
});
const generateAuthToken = () => {
  return crypto.randomBytes(30).toString('hex');
}
const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256');
  const hash = sha256.update(password).digest('base64');
  return hash;
}
const authTokens = {};
var users = []

async function db(){
  await client.connect()
  var user = await client.db('Project').collection('FinalProject').find().toArray()

  user.forEach((user) => {
    users.push(user)
  })
  console.log(users)
}

router.post('/', (req,res) => {
  const { email, password } = req.body;
  const hashedPassword = getHashedPassword(password);

  const user = users.find(u => {
      return u.email === email && hashedPassword === u.password
  });

  if (user) {
      const authToken = generateAuthToken();

      // Store authentication token
      authTokens[authToken] = user;

      // Setting the auth token in cookies
      res.cookie('AuthToken', authToken);

      // Redirect user to the protected page
      res.redirect('/protected');
  } else {
      res.render('login', {
          message: 'Invalid username or password',
          messageClass: 'alert-danger'
      });
      console.log('deu errado')
  }


})
module.exports = router;