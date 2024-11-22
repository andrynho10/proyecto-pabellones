const pool = require('../config/database');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const result = await pool.query(
            'SELECT * FROM usuarios WHERE email = $1 AND password = $2',
            [email, password]
        );

        const user = result.rows[0];
        
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            { id: user.id, rol: user.rol },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token, user: { id: user.id, nombre: user.nombre, rol: user.rol } });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = {
    login
};