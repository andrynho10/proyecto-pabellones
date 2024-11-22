const pool = require('../config/database');

// Obtener uso de pabellones
const getUsoPabellones = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                p.numero as pabellon,
                COUNT(c.id) as total_cirugias,
                SUM(c.duracion) as total_minutos,
                ROUND(COUNT(CASE WHEN c.es_urgencia THEN 1 END) * 100.0 / COUNT(*), 2) as porcentaje_urgencias
            FROM pabellones p
            LEFT JOIN asignaciones a ON p.id = a.pabellon_id
            LEFT JOIN cirugias c ON a.cirugia_id = c.id
            WHERE c.fecha >= CURRENT_DATE - INTERVAL '30 days'
            GROUP BY p.numero
            ORDER BY p.numero
        `);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener informe de uso de pabellones' });
    }
};

// Obtener estadísticas de retrasos
const getEstadisticasRetrasos = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                COUNT(*) as total_eventos,
                COUNT(CASE WHEN e.tipo = 'retraso' THEN 1 END) as total_retrasos,
                AVG(c.duracion) as duracion_promedio
            FROM eventos e
            JOIN cirugias c ON e.cirugia_id = c.id
            WHERE e.fecha_evento >= CURRENT_DATE - INTERVAL '30 days'
        `);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener estadísticas de retrasos' });
    }
};

// Obtener resumen del mes
const getResumenMensual = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                COUNT(*) as total_cirugias,
                COUNT(CASE WHEN es_urgencia THEN 1 END) as total_urgencias,
                COUNT(CASE WHEN estado = 'suspendida' THEN 1 END) as total_suspendidas,
                ROUND(AVG(duracion), 2) as duracion_promedio
            FROM cirugias
            WHERE fecha >= CURRENT_DATE - INTERVAL '30 days'
        `);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener resumen mensual' });
    }
};

module.exports = {
    getUsoPabellones,
    getEstadisticasRetrasos,
    getResumenMensual
};