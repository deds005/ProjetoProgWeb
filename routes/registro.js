var express = require('express');
var router = express.Router();
const crypto = require('crypto')
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://ABM_005:semsenha@cluster0.mswmleb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
var users = []  

async function main(){
  await client.connect()
  console.log(await client.db("Project").command({ ping: 1 }))

  
  let user = await client.db('Project').collection('FinalProject').find().toArray()

  user.forEach((u) =>{
    users.push(u)
  })
  console.log(users)
}
const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256');
  const hash = sha256.update(password).digest('base64');
  return hash;
}



router.get('/', function(req, res, next) {
  res.render('registro');
});
router.post('/', (req,res) => {
  main()
  const { email, firstName, lastName, password, confirmPassword } = req.body;

  let first_name = String(firstName);
  let last_name = String(lastName)

  
    //Check if the password and confirm password fields match
    if (password === confirmPassword) {

        // Check if user with the same email is also registered
        if (users.find(user => user.email === email)) {

            res.render('register', {
                message: 'User already registered.',
                messageClass: 'alert-danger'
            });

            return;
        }

        const hashedPassword = getHashedPassword(password);

        // Store user into the database if you are using one
        client.db('Project').collection('FinalProject').insertOne({
            firstName: first_name[0].toUpperCase() + first_name.substring(1),
            lastName: last_name[0].toUpperCase() + last_name.substring(1),
            email: email,
            password: hashedPassword
          })
          
        

        res.render('login', {
            message: 'Registration Complete. Please login to continue.',
            messageClass: 'alert-success'
        });
      
    } else {
        res.render('register', {
            message: 'Password does not match.',
            messageClass: 'alert-danger'
        });
    }
})

// === MONGO ===




module.exports = router;
