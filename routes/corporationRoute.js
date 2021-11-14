const { Router } = require('express');

const corpController = require('../controllers/corpController');
const auth = require('../middleware/authentication');

const router = Router();

router.get('/', auth.loggedIn, corpController.getCorps);
router.get('/corpById/:id', auth.loggedIn, corpController.getCorpById);

router.post('/create', auth.loggedIn, corpController.createCorp); // Create corp without task
router.post('/update/addTask/:corpId', auth.loggedIn, corpController.createCorpTask); // Add task to corporation

router.delete('/delete/:corpId', auth.loggedIn, corpController.deleteCorp);

module.exports = router;
