const { Client } = require("pg");

const createCharacter = async characterObject => {
    const { name, uid } = characterObject;

    const client = new Client();

    client.connect();

    try {
        await client.query('BEGIN');
        
        const characterText = `
            INSERT INTO "Character"(character_type_id, name, level, experience, gold)
            VALUES (1, $1, 1, 0, 0)
            RETURNING character_id
        `;
        const res = await client.query(characterText, [ name ]);

        const charAttribText = `
            INSERT INTO "CharacterAttribute"(character_id, attribute_id, value)
            VALUES ($1, 1, 5),
                   ($1, 2, 5),
                   ($1, 3, 5),
                   ($1, 4, 5),
                   ($1, 5, 5),
                   ($1, 6, 5)
        `;
        const charAttribValues = [res.rows[0].character_id];
        await client.query(charAttribText, charAttribValues);

        const userCharText = `
            INSERT INTO "UserCharacter"(character_id, uid)
            VALUES ($1, $2)
        `;
        const userCharValues = [res.rows[0].character_id, uid];
        await client.query(userCharText, userCharValues);

        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.end();
    }
}

module.exports = {
    createCharacter
}