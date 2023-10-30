const express = require('express');
const controller = require('../controllers/eventController');

const {fileUpload} = require('../middleware/fileUpload');

const router = express.Router();

router.get('/', controller.index);

router.get('/newEvents', controller.newEvent);

router.post('/', fileUpload, controller.create);

// router.post('/', controller.create);

router.get('/:id', controller.event);

router.get('/:id/edit', controller.edit);

router.put('/:id', fileUpload, controller.update);

router.delete('/:id', controller.delete);

module.exports = router;

