const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const {
    getEventos,
    createEvento,
    getEventosPorCirugia,
    getEventosDelDia
} = require('../controllers/eventosController');

router.get('/', auth, checkRole(['enfermera', 'personal_salud']), getEventos);
router.post('/', auth, checkRole(['personal_salud']), createEvento);
router.get('/cirugia/:cirugia_id', auth, checkRole(['enfermera', 'personal_salud']), getEventosPorCirugia);
router.get('/hoy', auth, checkRole(['enfermera', 'personal_salud']), getEventosDelDia);

module.exports = router;