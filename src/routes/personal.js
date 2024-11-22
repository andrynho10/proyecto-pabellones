const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    getPersonal,
    getPersonalPorTipo,
    getPersonalDisponible,
    updateEstadoPersonal
} = require('../controllers/personalController');

router.get('/', auth, getPersonal);
router.get('/tipo/:tipo', auth, getPersonalPorTipo);
router.get('/disponible', auth, getPersonalDisponible);
router.put('/:id/estado', auth, updateEstadoPersonal);

module.exports = router;