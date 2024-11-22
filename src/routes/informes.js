const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    getUsoPabellones,
    getEstadisticasRetrasos,
    getResumenMensual
} = require('../controllers/informesController');

router.get('/uso-pabellones', auth, getUsoPabellones);
router.get('/estadisticas-retrasos', auth, getEstadisticasRetrasos);
router.get('/resumen-mensual', auth, getResumenMensual);

module.exports = router;