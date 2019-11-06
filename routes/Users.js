const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const Kalor = require("../models/Kalor");
const Task = require("../models/Task");
const path = "./client/public/uploads/";
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

// process.env.SECRET_KEY = 'secret'

users.post("/register", (req, res) => {
  const today = new Date();
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created: today
  };

  User.findOne({
    where: {
      email: req.body.email
    }
  })
    //TODO bcrypt
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then(user => {
              res.json({ status: user.email + "Registered!" });
            })
            .catch(err => {
              res.send("error: " + err);
            });
        });
      } else {
        res.json({ error: "User already exists" });
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

users.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440
          });
          res.send(token);
        }
      } else {
        res.status(400).json({ error: "User does not exist" });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
});

users.get("/profile", (req, res) => {
  var decoded = jwt.verify(
    req.headers["authorization"],
    process.env.SECRET_KEY
  );

  User.findOne({
    where: {
      id: decoded.id
    }
  })
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.send("User does not exist");
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});
users.get("/Kalor", (req, res) => {
  var decoded = jwt.verify(
    req.headers["authorization"],
    process.env.SECRET_KEY
  );

  Kalor.findOne({
    where: {
      id: decoded.id
    }
  })
    .then(kal => {
      if (kal) {
        res.json(kal);
      } else {
        res.send("User does not exist");
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});
// Get all TodoList

users.get("/tasks", function(req, res, next) {
  Task.findAll({
    order: [
      // [['id','name'], 'desc']
      ['updated', 'desc']
    ],
    })
    .then(tasks => {
      res.json(tasks);
      console.log(tasks)
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

users.get("/task/:id", function(req, res, next) {
  Task.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(task => {
      if (task) {
        res.json(task);
      } else {
        res.send("Task does not exist");
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

users.post("/task", function(req, res) {
  console.log(req);
  if (!req.body.task_name) {
    res.status(400);
    res.json({
      error: "Bad Data"
    });
  } else { 
    console.log(req.body);
    Task.create(req.body)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        ``;
        res.json("error: " + err);
      });
  }
});
users.post("/task/upload", (req, res) => {
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
users.delete("/task/:id", function(req, res, next) {
  Task.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.json({ status: "Task Deleted!" });
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

users.put("/task/:id", function(req, res, next) {
  if (!req.body.task_name) {
    res.status(400);
    res.json({
      error: "Bad Data"
    });
  } else {
    console.log(req.body.task_name)
    Task.update(
      { task_name: req.body.task_name,
        kalor: req.body.kalor,
        image: req.body.image
      },
      { where: { id: req.params.id } }
    )
      .then(() => {
        res.json({ status: "Task Updated!" });
      })
      .error(err => handleError(err));
  }
});

//
module.exports = users;
