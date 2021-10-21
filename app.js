const express = require('express');
const userCreationRoute = require('./routes/userCreationRoute');

const app = express();

app.use(express.urlencoded({
  extended: false,
}));

app.use(express.json());

// Created rutes
app.use('/users', userCreationRoute);

module.exports = app;
