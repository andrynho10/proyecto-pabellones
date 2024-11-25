const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const {
    getCirugias,
    createCirugia,
    updateCirugia,
    getCirugiaById
} = require('../controllers/cirugiasController');

router.get('/', auth, checkRole(['enfermera', 'personal_salud']), getCirugias);
router.get('/:id', auth, checkRole(['enfermera', 'personal_salud']), getCirugiaById);
router.post('/', auth, checkRole(['enfermera']), createCirugia);
router.put('/:id', auth, checkRole(['enfermera']), updateCirugia);

module.exports = router;