const express = require('express');

const userCreationRoute = require('./routes/userCreationRoute');
const corporationRoute = require('./routes/corporationRoute');

const app = express();

app.use(express.urlencoded({
  extended: false,
}));

app.use(express.json());

// Created routes

app.use('/user', userCreationRoute);
app.use('/corp', corporationRoute);

module.exports = app;
