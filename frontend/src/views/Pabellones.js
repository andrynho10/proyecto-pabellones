import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    Chip
} from '@mui/material';
import api from '../services/api';

const Pabellones = () => {
    const [pabellones, setPabellones] = useState([]);
    const [cirugiasDia, setCirugiasDia] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [pabellonesRes, cirugiasRes] = await Promise.all([
                    api.get('/pabellones'),
                    api.get('/cirugias')
                ]);
                setPabellones(pabellonesRes.data);
                setCirugiasDia(cirugiasRes.data);
            } catch (error) {
                console.error('Error al cargar datos:', error);
            }
        };
        fetchData();
    }, []);

    const getEstadoColor = (estado) => {
        const colores = {
            'disponible': 'success',
            'ocupado': 'error',
            'en_aseo': 'warning',
            'reservado': 'info'
        };
        return colores[estado] || 'default';
    };

    const getCirugiasPabellon = (pabellonId) => {
        return cirugiasDia.filter(cirugia => {
            // Aquí deberíamos filtrar por fecha actual y pabellón
            // Por ahora solo filtramos las del día
            const hoy = new Date().toISOString().split('T')[0];
            return cirugia.fecha.includes(hoy);
        });
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Estado de Pabellones
            </Typography>

            <Grid container spacing={3}>
                {pabellones.map((pabellon) => (
                    <Grid item xs={12} sm={6} md={3} key={pabellon.id}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%'
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Pabellón {pabellon.numero}
                            </Typography>
                            
                            <Box sx={{ mb: 2 }}>
                                <Chip
                                    label={pabellon.estado}
                                    color={getEstadoColor(pabellon.estado)}
                                />
                            </Box>

                            <Typography variant="subtitle2" gutterBottom>
                                Cirugías de hoy:
                            </Typography>

                            <Box sx={{ flex: 1 }}>
                                {getCirugiasPabellon(pabellon.id).map((cirugia) => (
                                    <Paper
                                        key={cirugia.id}
                                        sx={{
                                            p: 1,
                                            mb: 1,
                                            bgcolor: 'background.default'
                                        }}
                                    >
                                        <Typography variant="body2">
                                            {cirugia.hora_inicio} - {cirugia.tipo}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {cirugia.paciente}
                                        </Typography>
                                    </Paper>
                                ))}
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
