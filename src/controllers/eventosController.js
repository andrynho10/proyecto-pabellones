const pool = require('../config/database');

// Obtener todos los eventos
const getEventos = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.*, u.nombre as reportado_por_nombre, c.tipo as cirugia_tipo
            FROM eventos e
            LEFT JOIN usuarios u ON e.reportado_por = u.id
            LEFT JOIN cirugias c ON e.cirugia_id = c.id
            ORDER BY e.fecha_evento DESC
        `);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener eventos' });
    }
};

// Crear nuevo evento
const createEvento = async (req, res) => {
    try {
        const { tipo, descripcion, cirugia_id } = req.body;
        const reportado_por = req.user.id; // Obtenido del token

        const result = await pool.query(
            'INSERT INTO eventos (tipo, descripcion, cirugia_id, reportado_por) VALUES ($1, $2, $3, $4) RETURNING *',
            [tipo, descripcion, cirugia_id, reportado_por]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear evento' });
    }
};

// Obtener eventos por cirugía
const getEventosPorCirugia = async (req, res) => {
    try {
        const { cirugia_id } = req.params;
        const result = await pool.query(
            'SELECT * FROM eventos WHERE cirugia_id = $1 ORDER BY fecha_evento DESC',
            [cirugia_id]
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener eventos de la cirugía' });
    }
};

// Obtener eventos del día
const getEventosDelDia = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.*, u.nombre as reportado_por_nombre, c.tipo as cirugia_tipo
            FROM eventos e
            LEFT JOIN usuarios u ON e.reportado_por = u.id
            LEFT JOIN cirugias c ON e.cirugia_id = c.id
            WHERE DATE(e.fecha_evento) = CURRENT_DATE
            ORDER BY e.fecha_evento DESC
        `);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener eventos del día' });
    }
};

module.exports = {
    getEventos,
    createEvento,
    getEventosPorCirugia,
    getEventosDelDia
};