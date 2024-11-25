const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const {
    getAsignaciones,
    createAsignacion,
    updateAsignacionEstado,
    getAsignacionesPorFecha
} = require('../controllers/asignacionesController');

router.get('/', auth, checkRole(['enfermera', 'personal_salud']), getAsignaciones);
router.post('/', auth, checkRole(['enfermera']), createAsignacion);
router.put('/:id/estado', auth, checkRole(['enfermera', 'personal_salud']), updateAsignacionEstado);
router.get('/fecha/:fecha', auth, checkRole(['enfermera', 'personal_salud']), getAsignacionesPorFecha);

module.exports = router;