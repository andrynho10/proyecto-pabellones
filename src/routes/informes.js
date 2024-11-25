const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const {
    getUsoPabellones,
    getEstadisticasRetrasos,
    getResumenMensual
} = require('../controllers/informesController');

router.get('/uso-pabellones', auth, checkRole(['gerencia']), getUsoPabellones);
router.get('/estadisticas-retrasos', auth, checkRole(['gerencia']), getEstadisticasRetrasos);
router.get('/resumen-mensual', auth, checkRole(['gerencia']), getResumenMensual);

module.exports = router;