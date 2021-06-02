const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');
const { createCharacter, getUserCharacters } = require('../utils/character');

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
        
    })
    .get(async (req, res) => {
        try {
            const characters = await getUserCharacters(req.uid);

            res.status(200).send(characters);
        } catch (err) {
            res.status(400).send(err);
        }
    });

module.exports = router;