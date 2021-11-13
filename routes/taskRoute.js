const { Router } = require('express');
const taskController = require('../controllers/taskController');

const router = Router();

router.get('/tasks', taskController.getEveryTask);

router.patch('/:taskId', taskController.updateTask);

router.delete('/:taskId', taskController.deleteTask);

module.exports = router;
