const loader = require('./loaders/index');
const express = require('express');

const app = express();

loader({ expressApp: app });

module.exports = app;