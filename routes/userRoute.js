const { Router } = require('express');

const auth = require('../middleware/authentication');
const userController = require('../controllers/userController');

const router = Router();

/*
    - NOTES -

    Before every route you must check if the user is logged in.

    For that auth.loggedIn function must be used except in the
    login route and creation route.
*/

// Login route

router.post('/login', userController.login);

// GET routes

router.get('/byId/:id', auth.loggedIn, userController.getUserById);
router.get('/byEmail/:email', userController.getUserByEmail);

router.get('/userTask/:userId', auth.loggedIn, userController.getUserTask);
router.get('/everyUserTask/:userTask', userController.getAllTasks);

// POST routes

router.post('/create', userController.createUser);

// DELETE routes

router.delete('/delete/:userId', auth.loggedIn, userController.deleteUser);

// UPDATE routes

router.patch('/update/:userId', auth.loggedIn, userController.updateUser);

module.exports = router;
