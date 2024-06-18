"use strict";

var express = require("express");

var mongoose = require("mongoose");

var cors = require("cors");

var multer = require("multer");

var bodyParser = require("body-parser");

var jwt = require('jsonwebtoken');

var User = require("./models/User.js");

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express["static"]("public"));
mongoose.connect("mongodb://localhost:27017/Profile").then(function () {
  console.log("Connected to DB");
})["catch"](function (err) {
  console.log(err);
});
var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "public/profilePic");
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
var upload = multer({
  storage: storage
}); //routes

app.post("/register", upload.single("profilepic"), function _callee(req, res) {
  var _req$body, email, username, password, picture, newUser;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          try {
            _req$body = req.body, email = _req$body.email, username = _req$body.username, password = _req$body.password;
            picture = req.file.filename;
            newUser = User.create({
              username: username,
              email: email,
              password: password,
              profilepic: picture
            });
            res.status(201).send({
              success: true,
              user: newUser
            });
          } catch (error) {
            res.status(500).json({
              message: true,
              error: error
            });
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.use('/login', function _callee2(req, res) {
  var _req$body2, email, password, user, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          console.log(password);
          console.log(email);
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(User.find(email));

        case 6:
          user = _context2.sent;
          console.log(user);
          console.log(user.password);

          if (user) {
            if (user.password === password) {
              token = jwt.sign({
                email: email
              }, 'jwt-secret-key-token', {
                expiresIn: '1m'
              });
              console.log(token);
              res.json({
                success: "Logged in successfully",
                token: token,
                user: user
              });
            }
          } else {
            res.json({
              message: "Error while log in "
            });
          }

          _context2.next = 15;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](3);
          console.log(_context2.t0);

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 12]]);
});

var verify = function verify(req, res, next) {
  var token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      error: 'No token provided'
    });
  }

  jwt.verify(token, jwt - secret - key - token, function (err, decoded) {
    if (err) {
      return res.status(401).json({
        error: 'Unauthorized'
      });
    }

    req.user = decoded;
    next();
  });
};

app.get('/getuser', verify, function (req, res) {
  var user = req.user;
  res.json({
    message: "verified",
    user: user
  });
});
app.listen(8000, function () {
  console.log("Server is running on 8000");
});
//# sourceMappingURL=server.dev.js.map
