import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import api from '../services/api';

const Cirugias = () => {
    const [cirugias, setCirugias] = useState([]);

    useEffect(() => {
        const fetchCirugias = async () => {
            try {
                const response = await api.get('/cirugias');
                setCirugias(response.data);
            } catch (error) {
                console.error('Error al cargar cirugías:', error);
            }
        };

        fetchCirugias();
    }, []);

    const getEstadoColor = (estado) => {
        const colores = {
            'pendiente': 'warning',
            'programada': 'info',
            'en_proceso': 'primary',
            'completada': 'success',
            'suspendida': 'error'
        };
        return colores[estado] || 'default';
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1">
                    Cirugías
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpenForm}
                >
                    Nueva Cirugía
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Hora</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Paciente</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Duración (min)</TableCell>
                            <TableCell>Urgencia</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cirugias.map((cirugia) => (
                            <TableRow key={cirugia.id}>
                                <TableCell>{new Date(cirugia.fecha).toLocaleDateString()}</TableCell>
                                <TableCell>{cirugia.hora_inicio}</TableCell>
                                <TableCell>{cirugia.tipo}</TableCell>
                                <TableCell>{cirugia.paciente}</TableCell>
                                <TableCell>
                                    <Chip 
                                        label={cirugia.estado}
                                        color={getEstadoColor(cirugia.estado)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>{cirugia.duracion}</TableCell>
                                <TableCell>
                                    {cirugia.es_urgencia ? 
                                        <Chip label="Sí" color="error" size="small" /> : 
                                        <Chip label="No" color="default" size="small" />
                                    }
                                </TableCell>
                                <TableCell>
                                    <Button size="small" color="primary" onClick={() => handleOpenEdit(cirugia)}>
                                        Editar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Cirugias;