const expressLoader = require('./express');
const firebaseLoader = require('./firebase');

module.exports = ({ expressApp }) => {
    // load express application config
    expressLoader({ app: expressApp });

    // load firebase config
    firebaseLoader();
}