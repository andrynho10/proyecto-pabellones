import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Typography,
    Chip
} from '@mui/material';
import api from '../../services/api';

const GestionAsignaciones = ({ cirugia, open, handleClose, onAsignacionCreada }) => {
    const [personal, setPersonal] = useState([]);
    const [pabellones, setPabellones] = useState([]);
    const [selectedPersonal, setSelectedPersonal] = useState({
        cirujano: '',
        anestesista: '',
        enfermera: '',
        arsenalero: '',
        pabellonero: '',
        tecnico_anestesia: ''
    });
    const [selectedPabellon, setSelectedPabellon] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [personalRes, pabellonesRes] = await Promise.all([
                    api.get('/personal/disponible'),
                    api.get('/pabellones')
                ]);
                setPersonal(personalRes.data);
                setPabellones(pabellonesRes.data);
            } catch (error) {
                console.error('Error al cargar datos:', error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async () => {
        try {
            const personalIds = Object.values(selectedPersonal).filter(id => id !== '');
            await api.post('/asignaciones', {
                cirugia_id: cirugia.id,
                personal_ids: personalIds,
                pabellon_id: selectedPabellon
            });
            onAsignacionCreada();
            handleClose();
        } catch (error) {
            console.error('Error al crear asignación:', error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>Asignar Personal y Pabellón</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                            Cirugía: {cirugia?.tipo} - Paciente: {cirugia?.paciente}
                        </Typography>
                    </Grid>
                    {Object.keys(selectedPersonal).map((tipo) => (
                        <Grid item xs={12} sm={6} key={tipo}>
                            <FormControl fullWidth>
                                <InputLabel>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</InputLabel>
                                <Select
                                    value={selectedPersonal[tipo]}
                                    onChange={(e) => setSelectedPersonal({
                                        ...selectedPersonal,
                                        [tipo]: e.target.value
                                    })}
                                >
                                    <MenuItem value="">Ninguno</MenuItem>
                                    {personal
                                        .filter(p => p.tipo === tipo)
                                        .map(p => (
                                            <MenuItem key={p.id} value={p.id}>
                                                {p.nombre}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Pabellón</InputLabel>
                            <Select
                                value={selectedPabellon}
                                onChange={(e) => setSelectedPabellon(e.target.value)}
                            >
                                <MenuItem value="">Seleccione un pabellón</MenuItem>
                                {pabellones
                                    .filter(p => p.estado === 'disponible')
                                    .map(p => (
                                        <MenuItem key={p.id} value={p.id}>
                                            Pabellón {p.numero}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button 
                    onClick={handleSubmit} 
                    variant="contained" 
                    color="primary"
                    disabled={!selectedPabellon || Object.values(selectedPersonal).every(v => !v)}
                >
                    Asignar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default GestionAsignaciones;