const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    getPabellones,
    getPabellonById,
    updateEstadoPabellon
} = require('../controllers/pabellonesController');

router.get('/', auth, getPabellones);
router.get('/:id', auth, getPabellonById);
router.put('/:id/estado', auth, updateEstadoPabellon);

module.exports = router;