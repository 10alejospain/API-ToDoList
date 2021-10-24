const express = require('express');
const userCreationRoute = require('./routes/userCreationRoute');

const app = express();

app.use(express.urlencoded({
  extended: false,
}));

app.use(express.json());

// Created rutes
app.use('/users', userCreationRoute);

app.use('/', (req, res) => {
  res.status(200).send({ msg: 'Web up and running!' });
});

module.exports = app;
