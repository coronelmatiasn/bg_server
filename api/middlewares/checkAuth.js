const admin = require("firebase-admin");

const checkAuth = async (req, res, next) => {
    const token = req.headers['authorization'].replace('Bearer ', '');

    if (token) {
        try {
            const { uid } = await admin.auth().verifyIdToken(token);

            req.uid = uid

            next();
        } catch (err) {
            res.status(403).send(err);
        }        
    } else {
        res.status(403).send('Unauthorized')
    }
}

module.exports = checkAuth;