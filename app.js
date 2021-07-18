const loader = require('./loaders/index');
const express = require('express');

const charRouter = require('./api/routes/characters');

const app = express();

loader({ expressApp: app });

module.exports = app;