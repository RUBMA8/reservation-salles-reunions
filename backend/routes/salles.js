const express = require('express');
const router = express.Router();
const sallesController = require('../controllers/sallesController');
const { ensureAuthenticated, ensureAdmin } = require('../middleware/auth');

router.get('/', ensureAuthenticated, sallesController.getAllSalles);
router.get('/:id', ensureAuthenticated, sallesController.getSalleById);

router.post('/', ensureAdmin, sallesController.createSalle);
router.put('/:id', ensureAdmin, sallesController.updateSalle);
router.delete('/:id', ensureAdmin, sallesController.deleteSalle);

module.exports = router;
