const { localsName } = require('ejs');
var express = require('express');
var router = express.Router();
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://ABM_005:semsenha@cluster0.mswmleb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
/* GET home page. */

//CRIAR FUNCIONALIDADE DE ADICIONAR AO CARRINHO ou continuar tentando colocar
//os itens na tela
//COLOCAR IDS MANUALMENTE E CRIAR CARDS MANUALMENTE

async function connection(){
  await client.connect()
  const products = await client.db('Project').collection('Produtos').find().toArray()
  produtos = []
  await products.forEach((p) =>{
    produtos.push(p)
  })
  console.log('conectado')
}

router.get('/', async function(req, res, next) {
  await connection()
  res.render('produtos',{produtos})

  
});


let produtos = []
// function criarElementos(){
  // let div = window.document.createElement('div')
  //   div.setAttribute('class', 'card-prod')
  //   let img = document.createElement('img')
  //   img.setAttribute('src', './images/racao.png')
  //   let h3 = document.createElement('h3')
  //   h3.setAttribute('class', 'desc')
  //   let p = document.createElement('p')
  //   p.setAttribute('class', 'info')
  //   let td = document.getElementById('td1')
  //   let hr = document.createElement('hr')
  //   let button = document.createElement('button').innerHTML = 'Add to cart'
  //   produtos.forEach((p, i) => {
  //     td.appendChild(div)
  //     div.setAttribute('id', `d${i}`)
  //     div.appendChild(img)
  //     div.appendChild(hr)
  //     h3.innerHTML = p.produto
  //     div.appendChild(h3)
  //     p.innerHTML = p.valor
  //     div.appendChild(p)
  //     div.appendChild(button)
  
  //   })

// }






module.exports = router;

