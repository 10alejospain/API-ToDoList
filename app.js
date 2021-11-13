const express = require('express');

const userCreationRoute = require('./routes/userRoute');
const corporationRoute = require('./routes/corporationRoute');
const taskRoute = require('./routes/taskRoute');

const app = express();

app.use(express.urlencoded({
  extended: false,
}));

app.use(express.json());

// Created routes

app.use('/user', userCreationRoute);
app.use('/corp', corporationRoute);
app.use('/task', taskRoute);

module.exports = app;
