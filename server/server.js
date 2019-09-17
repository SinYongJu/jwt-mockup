const express = require('express');
const router  =  express.Router();
const app = express();
const bodyParser = require('body-parser');
const PORT = 8080;
const jwt = require('jsonwebtoken');
const cors = require('cors');
const config = require('./config.js')


// jwt

app.use(bodyParser.urlencoded({extended : false}))
app.use(cors())

app.post('/auth',(req,res) => {
  console.log('post', req.body)
  var token = JSON.stringify({ header : {alg : 'HS523' , typ : 'jwt'},data:{foo: 'bar'},key :config.secret})
  res.send(token)
})

app.get('/',(req,res) => {
  console.log('get')
  res.send('Hello World')
})


app.listen(PORT,()=>{
  console.log(`sever listen ...PORT : ${PORT}`);
})

