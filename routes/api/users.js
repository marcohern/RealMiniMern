const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keys = require("../../config/keys");
const passport = require("passport");

const router = express.Router();

const mongoose = require("mongoose");
const User = require("../../models/User");

// load input validation
const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");

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
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email allready exists";
      return res.status(400).json(errors);
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

// @route GET api/users/login
// @desc Login a user / Return the token
// @access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    //Check user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    //Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User matched

        const payload = { id: user.id, name: user.name, avatar: user.avatar }; //Payload

        //Sign
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({ success: true, token: "Bearer " + token });
          }
        );
        //Generate Token
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route GET api/users/current
// @desc Return the current user
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      success: true,
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      desc: req.user.desc,
      avatar: req.user.avatar
    });
  }
);

router.get(
  "/byid/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    User.findById(req.params.id).then(user => {
      if (!user) {
        errors.user = "User not found";
        res.status(404).json(errors);
      }
      res.json(user);
    });
  }
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.find().then(users => {
      res.json(users);
    });
  }
);
module.exports = router;
