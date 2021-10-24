const express = require('express');

const userCreationRoute = require('./routes/userCreationRoute');
const corporationRoute = require('./routes/corporationRoute');

const app = express();

app.use(express.urlencoded({
  extended: false,
}));

app.use(express.json());

// Default route

/* pp.use('/', (req, res) => {
  res.status(200).send({ msg: 'Web up and running!' });
}); */

// Created routes

app.use('/users', userCreationRoute);
app.use('/corp', corporationRoute);

module.exports = app;
