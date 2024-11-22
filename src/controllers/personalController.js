const pool = require('../config/database');

// Obtener todo el personal
const getPersonal = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM personal ORDER BY tipo, nombre');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener personal' });
    }
};

// Obtener personal por tipo
const getPersonalPorTipo = async (req, res) => {
    try {
        const { tipo } = req.params;
        const result = await pool.query('SELECT * FROM personal WHERE tipo = $1', [tipo]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener personal por tipo' });
    }
};

// Obtener personal disponible
const getPersonalDisponible = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM personal WHERE estado = $1', ['disponible']);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener personal disponible' });
    }
};

// Actualizar estado del personal
const updateEstadoPersonal = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        const result = await pool.query(
            'UPDATE personal SET estado = $1 WHERE id = $2 RETURNING *',
            [estado, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Personal no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar estado del personal' });
    }
};

module.exports = {
    getPersonal,
    getPersonalPorTipo,
    getPersonalDisponible,
    updateEstadoPersonal
};