const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const {
    getPersonal,
    getPersonalPorTipo,
    getPersonalDisponible,
    updateEstadoPersonal
} = require('../controllers/personalController');

router.get('/', auth, checkRole(['enfermera']), getPersonal);
router.get('/tipo/:tipo', auth, checkRole(['enfermera']), getPersonalPorTipo);
router.get('/disponible', auth, checkRole(['enfermera']), getPersonalDisponible);
router.put('/:id/estado', auth, checkRole(['enfermera']), updateEstadoPersonal);

module.exports = router;