var express = require('express');
var router = express.Router();
var auth = require('../utils/auth');

router.post("/signup", async (req, res) => {
  try {
    var user = await auth.createUser(req.body.user);
    
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    var user = await auth.authenticateUser(req.body);

    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;