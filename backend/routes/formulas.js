const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/formulasController');


router.get('/', ctrl.getAll);
router.post('/', ctrl.create);
router.delete('/:id', ctrl.remove);
router.post('/:id/execute', ctrl.execute); // execute by id


module.exports = router;