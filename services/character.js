const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

const db = admin.firestore();

const createCharacter = async ({ uid, name }) => {
    try {
        const character = {
            userId: uid,
            name: name,
            level: 1,
            experience: 0,
            gold: 0,
            attributes: {
                strength: 5,
                dexterity: 5,
                agility: 5,
                constitution: 5,
                charisma: 5,
                inteligence: 5
            }
        }

        await db.collection('characters').add(character);
    
        return character;
    } catch (err) {
        throw new Error(err);
    } 
}

const getUserCharacters = async uid => {
    var characters = [];

    const client = new Client();

    client.connect();

    try {
        const characterData = await client.query(`
            SELECT uc.character_id, c.name, c.level, c.experience, c.gold
            FROM "UserCharacter" AS uc 
            LEFT JOIN "Character" AS c 
            ON uc.character_id = c.character_id
            WHERE uc.uid = $1
        `, [ uid ]);

        for (var character of characterData.rows) {
            var attributes = await getCharacterAttributes(character.character_id);

            characters.push({
                ...character,
                characterAttributes: [...attributes]
            });
        }

        return characters;
    } catch (err) {
        throw err;
    } finally {
        client.end();
    }
}

const getCharacter = async id => {
    var characters = [];

    const client = new Client();

    client.connect();

    try {
        const characterData = await client.query(`
            SELECT character_id, name, level, experience, gold
            FROM "Character"
            WHERE character_id = $1
        `, [ id ]);

        for (var character of characterData.rows) {
            var attributes = await getCharacterAttributes(character.character_id);

            characters.push({
                ...character,
                characterAttributes: [...attributes]
            });
        }

        return characters;
    } catch (err) {
        throw err;
    } finally {
        client.end();
    }
}

const getCharacterAttributes = async charId => {
    const client = new Client();

    client.connect();

    const characterAttributes = await client.query(`
        SELECT ca.attribute_id, ca.value, a.name, a.description
        FROM "CharacterAttribute" AS ca 
        LEFT JOIN "Attribute" AS a 
        ON ca.attribute_id = a.attribute_id
        WHERE character_id = $1
    `, [ charId ]);

    return characterAttributes.rows;
}

module.exports = {
    createCharacter,
    getUserCharacters,
    getCharacter
}