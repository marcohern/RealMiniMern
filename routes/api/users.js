const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const router = express.Router();

const mongoose = require("mongoose");
const User = require("../../models/User");

// @route GET api/users/test
// @desc Test user route
// @access Public
router.get("/test", (req, res) =>
  res.json({
    success: true,
    message: "User works"
  })
);

// @route GET api/users/register
// @desc Register a user
// @access Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email allready exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //Size
        r: "pg", //Rating (PG)
        d: "mm" //Default (show placeholderif not exists)
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        desc: req.body.desc,
        avatar
      });

      const salt = bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          //if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.error(err));
        });
      });
    }
  });
});

module.exports = router;
