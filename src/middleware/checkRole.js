const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'No autorizado' });
        }

        if (req.user.rol === 'admin' || allowedRoles.includes(req.user.rol)) {
            next();
        } else {
            res.status(403).json({ message: 'Acceso denegado' });
        }
    };
};

module.exports = checkRole;