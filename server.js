// var fileUpload = require('express-fileupload');
var bodyParser = require('body-parser')
var express = require('express')
// var multer = require('multer')
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
// app.use(fileUpload());

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname)
//   }
// })
// var upload = multer({ storage: storage }).array('file')

 
app.get('/', (req, res) => {
  res.send(process.env.SECRET_KEY);
})

var Users = require('./routes/Users')

app.use('/users', Users)
// app.post('/upload',function(req, res) {
     
//   upload(req, res, function (err) {
//          if (err instanceof multer.MulterError) {
//              return res.status(500).json(err)
//          } else if (err) {
//              return res.status(500).json(err)
//          }
//     return res.status(200).send(req.file)

//   })

// });

app.listen(port, function () {
  console.log('Server is running on port: ' + port)
})
