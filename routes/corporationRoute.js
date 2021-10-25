const { Router } = require('express');
const corpController = require('../controllers/corpController');

const router = Router();

router.get('/:id', corpController.getCorp);

router.post('/create', corpController.createCorp); // Create corp without task
router.post('/update/addTask/:corpId', corpController.createCorpTask); // Add task to corporation

module.exports = router;
