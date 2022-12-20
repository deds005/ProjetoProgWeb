var express = require('express');
var router = express.Router();
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://ABM_005:semsenha@cluster0.mswmleb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('protected');
});



router.post('/', async function(req,res) {
  const {nome, valor} = req.body

  await client.connect()
  
  client.db('Project').command({ping: 1})

  
  client.db('Project').collection('Produtos').insertOne({
    produto: nome, valor: valor
  })
  
  const produtos = await client.db('Project').collection('Produtos').find().toArray()
  console.log(produtos)
  res.render('index')
})

module.exports = router;