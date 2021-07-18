const expressLoader = require('./express');

module.exports = ({ expressApp }) => {
    // load express application config
    expressLoader({ app: expressApp });
}