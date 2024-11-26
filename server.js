const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar rutas
const authRoutes = require('./src/routes/auth');
const cirugiasRoutes = require('./src/routes/cirugias');
const pabellonesRoutes = require('./src/routes/pabellones');
const personalRoutes = require('./src/routes/personal');
const eventosRoutes = require('./src/routes/eventos');
const informesRoutes = require('./src/routes/informes');
const asignacionesRoutes = require('./src/routes/asignaciones');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/cirugias', cirugiasRoutes);
app.use('/api/pabellones', pabellonesRoutes);
app.use('/api/personal', personalRoutes);
app.use('/api/eventos', eventosRoutes);
app.use('/api/informes', informesRoutes);
app.use('/api/asignaciones', asignacionesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});