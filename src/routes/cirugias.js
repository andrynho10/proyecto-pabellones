const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    getCirugias,
    createCirugia,
    updateCirugia,
    getCirugiaById
} = require('../controllers/cirugiasController');

router.get('/', auth, getCirugias);
router.get('/:id', auth, getCirugiaById);
router.post('/', auth, createCirugia);
router.put('/:id', auth, updateCirugia);

module.exports = router;