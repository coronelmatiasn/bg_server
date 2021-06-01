const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');
const { createCharacter } = require('../utils/character');

router.use(checkAuth);

router.route("/")
    .post(async (req, res) => {
        try {
            createCharacter({
                name: req.body.name,
                uid: req.uid
            });

            res.send(201).send("Personaje creado!");
        } catch (err) {
            res.send(400).send("Se ha producido un error.");
        }
        
    });

module.exports = router;