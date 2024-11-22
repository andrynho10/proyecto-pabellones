const pool = require('../config/database');

// Obtener todos los pabellones
const getPabellones = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM pabellones ORDER BY numero');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener pabellones' });
    }
};

// Obtener estado de un pabellón
const getPabellonById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM pabellones WHERE id = $1', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Pabellón no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener pabellón' });
    }
};

// Actualizar estado de pabellón
const updateEstadoPabellon = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        const result = await pool.query(
            'UPDATE pabellones SET estado = $1 WHERE id = $2 RETURNING *',
            [estado, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Pabellón no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar estado del pabellón' });
    }
};

module.exports = {
    getPabellones,
    getPabellonById,
    updateEstadoPabellon
};