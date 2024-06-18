"use strict";

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 6,
    max: 20
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    min: 6,
    max: 255
  },
  profilepic: {
    type: String
  }
}, {
  timestamps: true
});
var userModel = mongoose.model('userInfo', schema);
module.exports = userModel;
//# sourceMappingURL=User.dev.js.map
