const express = require("express");
const router = express.Router();

// @route GET api/users/test
// @desc Test Profile route
// @access Public
router.get("/test", (req, res) =>
  res.json({
    success: true,
    message: "Profile works"
  })
);

module.exports = router;
