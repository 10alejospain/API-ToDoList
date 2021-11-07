const { Router } = require('express');
const userController = require('../controllers/userController');

const router = Router();

// GET routes

router.get('/byId/:id', userController.getUserById);
router.get('/byEmail/:email', userController.getUserByEmail);

router.get('/userTask/:userId', userController.getUserTask);
router.get('/everyUserTask/:userTask', userController.getAllTasks);

// POST routes

router.post('/create', userController.createUser);

// DELETE routes

router.delete('/delete/:userId', userController.deleteUser);

// UPDATE routes

router.patch('/update/:userId', userController.updateUser);

module.exports = router;
