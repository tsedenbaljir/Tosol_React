var bodyParser = require('body-parser')
var express = require('express')
var cors = require('cors')
var app = express()

var port = process.env.PORT || 5000

require('dotenv').config();

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
) 
 
app.get('/', (req, res) => {
  res.send(process.env.SECRET_KEY);
})

var Users = require('./routes/Users')
var Post = require('./routes/Post')

app.use('/users', Users) 
app.use('/post', Post) 
app.listen(port, function () {
  console.log('Server is running on port: ' + port)
})
