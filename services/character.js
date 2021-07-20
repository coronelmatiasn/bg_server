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
        throw err;
    } 
}

const getUserCharacters = async uid => {
    var characters = [];

    try {
        const charaRef = db.collection('characters');
        const snapshot = await charaRef.where('userId', '==', uid).get();
        
        if (snapshot.empty) return;
 
        snapshot.forEach(doc => {
          characters.push(doc.data());
        });

        return characters
    } catch (err) {
        throw err;
    } 
}

const getCharacter = async id => {
    var character;

    try {
        const charaRef = db.collection('characters').doc(id);
        const doc = await charaRef.get();
        
        if (!doc.exists) return;
 
        character = doc.data();

        return character;
    } catch (err) {
        throw err;
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