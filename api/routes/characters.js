const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');
const { createCharacter, getUserCharacters, getCharacter } = require('../../services/character');

router.use(checkAuth);

router.route("/")
    .post(async (req, res) => {
        try {
            const data = {
                name: req.body.name,
                uid: req.uid
            }

            const character = await createCharacter(data);

            res.send(201).send(character);
        } catch (err) {
            res.send(400).send(err);
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

router.route("/:charId")
    .get(async (req, res) => {
        const { charId } = req.params;

        try {
            const character = await getCharacter(charId);

            res.status(200).send(character);
        } catch (err) {
            res.status(400).send(err);
        }
    });

module.exports = router;