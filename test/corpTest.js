/* eslint-disable no-underscore-dangle */
/* global beforeAll, beforeEach, afterAll, afterEach, describe, it, expect */

const request = require('supertest');
const app = require('../server');

// Procceses that must be done for every test before and after

let userID = '';
let corp = {};
let sessionToken = '';
let corpID = '';
let corpTaskId = '';

beforeAll(async () => {
  const uniqueNumber = Math.trunc(Math.random() * 100);
  const user = {
    email: `beforeEach(${uniqueNumber})@test.org`,
    name: `test${uniqueNumber}Name`,
    surname: `test${uniqueNumber}Surname`,
    password: `${uniqueNumber}`,
    gender: 'other',
  };

  await request(app)
    .post('/user/create')
    .send(user);

  await request(app)
    .post('/user/login')
    .set({ token: sessionToken })
    .send(user)
    .then((res) => {
      sessionToken = res.body.userToken;
      userID = res.body._id;
    });
});

beforeEach(async () => {
  const uniqueNumber = Math.trunc(Math.random() * 100);

  corp = {
    name: `test${uniqueNumber}CorpName`,
  };
  const task = {
    taskName: `testTask${uniqueNumber}`,
    taskDescription: `testTaskDesc${uniqueNumber}`,
    taskType: `testTaskType${uniqueNumber}`,
    expirationDate: `${Date.now}`,
  };

  await request(app)
    .post('/corp/create')
    .send(corp)
    .then((res) => {
      corpID = res.body._id;
    });
  await request(app)
    .post(`/update/addTask/${corpID}`)
    .send(task)
    .then((res) => {
      corpTaskId = res.body._id;
    });
});

afterEach(async () => {
  await request(app)
    .delete(`/corp/delete/${corpID}`)
    .set({ token: sessionToken });
});

afterAll(async () => {
  await request(app)
    .delete(`/delete/${userID}`)
    .set({ token: sessionToken });
});
