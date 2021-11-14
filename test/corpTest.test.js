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

  await request(app)
    .delete(`/delete/${corpID}`)
    .set({ token: sessionToken });
});

// Route testing

describe('getCorps()', () => {
  describe('getCorps without a user token', () => {
    it('should not return the corps', async () => {
      await request(app)
        .get('/corp/')
        .expect(403)
        .then((res) => {
          expect(res.body.msg).toEqual('Not logged in');
        });
    });
  });
  describe('getCorps logged in', () => {
    it('should return the corps', async () => {
      await request(app)
        .get('/corp/')
        .set({ token: sessionToken })
        .expect(200)
        .then((res) => {
          expect(res.body.msg).toEqual('Not logged in');
        });
    });
  });
});

describe('getCorpById()', () => {
  describe('getCorp without a user token', () => {
    it('should not return the corp', async () => {
      await request(app)
        .get(`/corpById/${corpID}`)
        .expect(403)
        .then((res) => {
          expect(res.body.msg).toEqual('Not logged in');
        });
    });
  });

  describe('getCorp logged in', () => {
    it('should return the corp', async () => {
      await request(app)
        .get(`/corpById/${corpID}`)
        .set({ token: sessionToken })
        .expect(200)
        .then((res) => {
          expect(res.body.msg).toEqual('Not logged in');
        });
    });
  });

  describe('getCorp that not exists', () => {
    it('should return empty', async () => {
      await request(app)
        .get('/corpById/0')
        .set({ token: sessionToken })
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toEqual('Error getting the corp');
        });
    });
  });
});

describe('createCorp()', () => {
  const uniqueNumber = Math.trunc(Math.random() * 100);

  const corpTest = {
    name: `test${uniqueNumber}CorpName`,
  };

  const task = {
    taskName: `testTask${uniqueNumber}`,
    taskDescription: `testTaskDesc${uniqueNumber}`,
    taskType: `testTaskType${uniqueNumber}`,
    expirationDate: `${Date.now}`,
  };
  const wrongTask = {
    taskName: '',
    taskDescription: '',
    taskType: '',
    expirationDate: '',
  };
  const wrongCorpTest = {
    name: null,
  };

  let createdCorpId = '';

  describe('given a new corp', () => {
    it('should create a new corp if not already created', async () => {
      await request(app)
        .post('/corp/create')
        .send(corpTest)
        .set({ token: sessionToken })
        .expect(200)
        .then((res) => {
          createdCorpId = res.body._id;
          expect(res.body.msg).toEqual('Corporation added!');
        });
    });
  });

  describe('given a new corp', () => {
    it('should not create a new corp if already created', async () => {
      await request(app)
        .post('/corp/create')
        .send(corpTest)
        .set({ token: sessionToken })
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toEqual('Error adding corporation');
        });
    });
  });

  describe('given a incorrect corp', () => {
    it('should not create a new corp because it already exists', async () => {
      await request(app)
        .post('/corp/create')
        .send(wrongCorpTest)
        .set({ token: sessionToken })
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toEqual('Error adding corporation');
        });
    });
  });

  describe('testing createCorpTask() inside createCorp()', () => {
    describe('given a new task', () => {
      it('should create a new corp task', async () => {
        await request(app)
          .post(`/update/addTask/${createdCorpId}`)
          .send(task)
          .set({ token: sessionToken })
          .expect(200)
          .then((res) => {
            expect(res.body.msg).toEqual('Corporation added!');
          });
      });
    });

    describe('given a new task', () => {
      it('should not create a new corp task, already created', async () => {
        await request(app)
          .post(`/update/addTask/${createdCorpId}`)
          .send(task)
          .set({ token: sessionToken })
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toEqual('Error adding corp task');
          });
      });
    });

    describe('given a new task', () => {
      it('should not create a new corp task, wrong format', async () => {
        await request(app)
          .post(`/update/addTask/${createdCorpId}`)
          .send(wrongTask)
          .set({ token: sessionToken })
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toEqual('Error adding corp task');
          });
      });
    });
  });
  describe('testing deleteCorp() inside createCorp()', () => {
    describe('given an uncreated corp', () => {
      it('should not be deleted', async () => {
        await request(app)
          .delete('/delete/0')
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toEqual('Unable to delete corp');
          });
      });
    });

    describe('given a corp', () => {
      it('should be deleted', async () => {
        await request(app)
          .delete(`/delete/${createdCorpId}`)
          .expect(200)
          .then((res) => {
            expect(res.body.msg).toEqual('Deleted succesfully');
          });
      });
    });
  });
});
