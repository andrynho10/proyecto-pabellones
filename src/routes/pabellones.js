const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    getPabellones,
    getPabellonById,
    updateEstadoPabellon
} = require('../controllers/pabellonesController');

router.get('/', auth, checkRole(['enfermera', 'personal_salud']), getPabellones);
router.get('/:id', auth, checkRole(['enfermera', 'personal_salud']), getPabellonById);
router.put('/:id/estado', auth, checkRole(['enfermera']), updateEstadoPabellon);

module.exports = router;