const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    getEventos,
    createEvento,
    getEventosPorCirugia,
    getEventosDelDia
} = require('../controllers/eventosController');

router.get('/', auth, getEventos);
router.post('/', auth, createEvento);
router.get('/cirugia/:cirugia_id', auth, getEventosPorCirugia);
router.get('/hoy', auth, getEventosDelDia);

module.exports = router;