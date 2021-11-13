const { Router } = require('express');

const taskController = require('../controllers/taskController');
const auth = require('../middleware/authentication');

const router = Router();

router.get('/tasks', auth.loggedIn, taskController.getEveryTask);

router.patch('/:taskId', auth.loggedIn, taskController.updateTask);

router.delete('/:taskId', auth.loggedIn, taskController.deleteTask);

module.exports = router;
