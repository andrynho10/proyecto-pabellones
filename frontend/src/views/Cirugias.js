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
    Chip,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import api from '../services/api';
import FormCirugia from '../components/cirugias/FormCirugia';

const Cirugias = () => {
    const [openForm, setOpenForm] = useState(false);
    const [cirugiaEditar, setCirugiaEditar] = useState(null);

    const handleOpenForm = () => {
        setCirugiaEditar(null);
        setOpenForm(true);
    };

    const handleOpenEdit = (cirugia) => {
        setCirugiaEditar(cirugia);
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setCirugiaEditar(null);
    };

    const handleSubmit = async (formData) => {
        try {
            if (cirugiaEditar) {
                await api.put(`/cirugias/${cirugiaEditar.id}`, formData);
            } else {
                await api.post('/cirugias', formData);
            }
            handleCloseForm();
            // Recargar cirugías
            const response = await api.get('/cirugias');
            setCirugias(response.data);
        } catch (error) {
            console.error('Error al guardar cirugía:', error);
        }
    };
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
    
    const [filtros, setFiltros] = useState({
        busqueda: '',
        estado: '',
        fecha: ''
    });

    const handleFiltroChange = (e) => {
        setFiltros({
            ...filtros,
            [e.target.name]: e.target.value
        });
    };

    const cirugiasFiltradas = cirugias.filter(cirugia => {
        const coincideBusqueda = 
            cirugia.tipo.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
            cirugia.paciente.toLowerCase().includes(filtros.busqueda.toLowerCase());
        const coincidenFiltros = 
            (!filtros.estado || cirugia.estado === filtros.estado) &&
            (!filtros.fecha || cirugia.fecha.includes(filtros.fecha));
        return coincideBusqueda && coincidenFiltros;
    });

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

            <Box sx={{ mb: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            name="busqueda"
                            label="Buscar por tipo o paciente"
                            value={filtros.busqueda}
                            onChange={handleFiltroChange}
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Estado</InputLabel>
                            <Select
                                name="estado"
                                value={filtros.estado}
                                label="Estado"
                                onChange={handleFiltroChange}
                            >
                                <MenuItem value="">Todos</MenuItem>
                                <MenuItem value="pendiente">Pendiente</MenuItem>
                                <MenuItem value="programada">Programada</MenuItem>
                                <MenuItem value="en_proceso">En Proceso</MenuItem>
                                <MenuItem value="completada">Completada</MenuItem>
                                <MenuItem value="suspendida">Suspendida</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            name="fecha"
                            label="Fecha"
                            type="date"
                            value={filtros.fecha}
                            onChange={handleFiltroChange}
                            InputLabelProps={{ shrink: true }}
                            size="small"
                        />
                    </Grid>
                </Grid>
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
                        {cirugiasFiltradas.map((cirugia) => (
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
            <FormCirugia
                open={openForm}
                handleClose={handleCloseForm}
                handleSubmit={handleSubmit}
                cirugia={cirugiaEditar}
            />
        </Box>
    );
};

export default Cirugias;