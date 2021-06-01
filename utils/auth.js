const admin = require("firebase-admin");

const createUser = async userData => admin.auth().createUser(userData);

module.exports = { createUser };