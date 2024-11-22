const pool = require('../config/database');

// Obtener todas las cirugías
const getCirugias = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cirugias ORDER BY fecha, hora_inicio');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener cirugías' });
    }
};

// Crear nueva cirugía
const createCirugia = async (req, res) => {
    try {
        const {
            tipo,
            paciente,
            fecha,
            hora_inicio,
            duracion,
            es_urgencia,
            requiere_aseo_profundo
        } = req.body;

        const result = await pool.query(
            'INSERT INTO cirugias (tipo, paciente, fecha, hora_inicio, duracion, es_urgencia, requiere_aseo_profundo) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [tipo, paciente, fecha, hora_inicio, duracion, es_urgencia, requiere_aseo_profundo]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear cirugía' });
    }
};

// Actualizar cirugía
const updateCirugia = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            tipo,
            paciente,
            fecha,
            hora_inicio,
            duracion,
            estado,
            es_urgencia,
            requiere_aseo_profundo
        } = req.body;

        const result = await pool.query(
            'UPDATE cirugias SET tipo = $1, paciente = $2, fecha = $3, hora_inicio = $4, duracion = $5, estado = $6, es_urgencia = $7, requiere_aseo_profundo = $8 WHERE id = $9 RETURNING *',
            [tipo, paciente, fecha, hora_inicio, duracion, estado, es_urgencia, requiere_aseo_profundo, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Cirugía no encontrada' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar cirugía' });
    }
};

// Obtener cirugía por ID
const getCirugiaById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM cirugias WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Cirugía no encontrada' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener cirugía' });
    }
};

module.exports = {
    getCirugias,
    createCirugia,
    updateCirugia,
    getCirugiaById
};