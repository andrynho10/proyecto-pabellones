const pool = require('../config/database');

const getAsignaciones = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT a.*, 
                c.tipo as cirugia_tipo, c.paciente, c.fecha, c.hora_inicio,
                p.nombre as personal_nombre, p.tipo as personal_tipo,
                pb.numero as pabellon_numero
            FROM asignaciones a
            JOIN cirugias c ON a.cirugia_id = c.id
            JOIN personal p ON a.personal_id = p.id
            JOIN pabellones pb ON a.pabellon_id = pb.id
            ORDER BY c.fecha, c.hora_inicio
        `);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener asignaciones' });
    }
};

const createAsignacion = async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const { cirugia_id, personal_ids, pabellon_id } = req.body;

        // Verificar disponibilidad del pabellón
        const pabellonResult = await client.query(
            'SELECT estado FROM pabellones WHERE id = $1',
            [pabellon_id]
        );
        
        if (pabellonResult.rows[0].estado !== 'disponible') {
            throw new Error('Pabellón no disponible');
        }

        // Verificar disponibilidad del personal
        for (const personalId of personal_ids) {
            const personalResult = await client.query(
                'SELECT estado FROM personal WHERE id = $1',
                [personalId]
            );
            
            if (personalResult.rows[0].estado !== 'disponible') {
                throw new Error('Personal no disponible');
            }
        }

        // Crear asignaciones
        const asignaciones = [];
        for (const personalId of personal_ids) {
            const result = await client.query(
                'INSERT INTO asignaciones (cirugia_id, personal_id, pabellon_id) VALUES ($1, $2, $3) RETURNING *',
                [cirugia_id, personalId, pabellon_id]
            );
            asignaciones.push(result.rows[0]);
        }

        // Actualizar estados
        await client.query(
            'UPDATE pabellones SET estado = $1 WHERE id = $2',
            ['reservado', pabellon_id]
        );

        await client.query(
            'UPDATE personal SET estado = $1 WHERE id = ANY($2::int[])',
            ['en_cirugia', personal_ids]
        );

        await client.query(
            'UPDATE cirugias SET estado = $1 WHERE id = $2',
            ['programada', cirugia_id]
        );

        await client.query('COMMIT');
        res.status(201).json(asignaciones);
    } catch (error) {
        await client.query('ROLLBACK');
        res.status(500).json({ message: error.message });
    } finally {
        client.release();
    }
};

const updateAsignacionEstado = async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const { id } = req.params;
        const { estado_cirugia } = req.body;

        const asignacionResult = await client.query(
            `SELECT a.*, c.estado as estado_cirugia 
             FROM asignaciones a 
             JOIN cirugias c ON a.cirugia_id = c.id 
             WHERE a.id = $1`,
            [id]
        );

        if (asignacionResult.rows.length === 0) {
            throw new Error('Asignación no encontrada');
        }

        const asignacion = asignacionResult.rows[0];

        // Actualizar estado de la cirugía
        await client.query(
            'UPDATE cirugias SET estado = $1 WHERE id = $2',
            [estado_cirugia, asignacion.cirugia_id]
        );

        // Si la cirugía está completada o suspendida, liberar recursos
        if (estado_cirugia === 'completada' || estado_cirugia === 'suspendida') {
            await client.query(
                'UPDATE pabellones SET estado = $1 WHERE id = $2',
                ['disponible', asignacion.pabellon_id]
            );

            await client.query(
                'UPDATE personal SET estado = $1 WHERE id = $2',
                ['disponible', asignacion.personal_id]
            );
        }

        await client.query('COMMIT');
        res.json({ message: 'Estado actualizado correctamente' });
    } catch (error) {
        await client.query('ROLLBACK');
        res.status(500).json({ message: error.message });
    } finally {
        client.release();
    }
};

const getAsignacionesPorFecha = async (req, res) => {
    try {
        const { fecha } = req.params;
        const result = await pool.query(`
            SELECT a.*, 
                c.tipo as cirugia_tipo, c.paciente, c.fecha, c.hora_inicio,
                p.nombre as personal_nombre, p.tipo as personal_tipo,
                pb.numero as pabellon_numero
            FROM asignaciones a
            JOIN cirugias c ON a.cirugia_id = c.id
            JOIN personal p ON a.personal_id = p.id
            JOIN pabellones pb ON a.pabellon_id = pb.id
            WHERE c.fecha = $1
            ORDER BY c.hora_inicio
        `, [fecha]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener asignaciones por fecha' });
    }
};

module.exports = {
    getAsignaciones,
    createAsignacion,
    updateAsignacionEstado,
    getAsignacionesPorFecha
};