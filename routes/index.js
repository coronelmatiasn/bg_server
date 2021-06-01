const express = require('express');
const router = express.Router();
const auth = require('../utils/auth');

router.post("/signup", async (req, res) => {
  try {
    const user = await auth.createUser(req.body.user);
    
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;