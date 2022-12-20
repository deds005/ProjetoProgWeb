const express = require('express')
const app = express()
function scroll(){
    if(document.querySelector('main').getBoundingClientRect().y <= -100){
      document.querySelector('header').style.background = '#FFEA4F'
    }else{        
      document.querySelector('header').style.background = 'none'

    }
    
    console.log(document.querySelector('main').getBoundingClientRect().y)
}
