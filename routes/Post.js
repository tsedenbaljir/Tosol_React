const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const Kalor = require("../models/Kalor");
const Post = require("../models/Post");
const path = "./client/public/uploads/posts_img";
const multer = require("multer");
checkExtension = file => {
  // this function gets the filename extension by determining mimetype. To be exanded to support others, for example .jpeg or .tiff
  var res = "";
  if (file.mimetype === "image/jpeg") res = ".jpg";
  if (file.mimetype === "image/png") res = ".png";
  return res;
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path);
  },
  filename: (req, file, cb) => {
    //console.log(file.mimetype)
    cb(null, Date.now() + checkExtension(file));
  }
});
const upload = multer({
  storage: storage
  // limits: { fileSize: 1048576, files: 1 } // limit file size to 1048576 bytes or 1 MB
  //,fileFilter: // TODO limit types of files. currently can upload a .txt or any kind of file into uploads folder
}).fields([
  // fields to accept multiple types of uploads
  { name: "image", maxCount: 1 }
]);

require("dotenv").config();
users.use(cors());

process.env.SECRET_KEY = 'secret'

users.get("/posts", function(req, res, next) {
  Post.findAll({
    order: [
      // [['id','name'], 'desc']
      ['updated', 'desc']
    ],
    })
    .then(post => {
      res.json(post);
      console.log(post)
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

users.get("/posts/:id", function(req, res, next) {
  Post.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(posts => {
      if (posts) {
        res.send(posts);
      } else {
        res.send("posts does not exist");
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

users.post("/posts", function(req, res) {
  console.log(req);
  if (!req.body.title) {
    res.status(400);
    res.json({
      error: "Bad Data"
    });
  } else { 
    console.log(req.body);
    Post.create(req.body)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.json("error: " + err);
        console.log(err);
      });
  }
});
users.post("/posts/upload", (req, res) => {
  upload(req, res, err => {
    if (err) {
      console.log(err);
      return res.json({
        status: false
      });
    } else {
      return res.json({
        path: req.files.image[0].filename,
        status: true
      });
    }
  });
});
users.delete("/posts/:id", function(req, res, next) {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.json({ status: "posts Deleted!" });
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

users.put("/posts/:id", function(req, res, next) {
  if (!req.body.title) {
    res.status(400);
    res.json({
      error: "Bad Data"
    });
  } else {
    console.log(req.body.title)
    Post.update(
      { title: req.body.title,
        src: req.body.src,
        data: req.body.data
      },
      { where: { id: req.params.id } }
    )
      .then(() => {
        res.json({ status: "posts Updated!" });
      })
      .error(err => handleError(err));
  }
});

//
module.exports = users;
