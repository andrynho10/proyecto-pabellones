import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    Grid
} from '@mui/material';

const FormCirugia = ({ open, handleClose, handleSubmit, cirugia = null }) => {
    const [formData, setFormData] = useState(cirugia || {
        tipo: '',
        paciente: '',
        fecha: '',
        hora_inicio: '',
        duracion: '',
        es_urgencia: false,
        requiere_aseo_profundo: false
    });

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: e.target.type === 'checkbox' ? checked : value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(formData);
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>
                {cirugia ? 'Editar Cirugía' : 'Nueva Cirugía'}
            </DialogTitle>
            <form onSubmit={onSubmit}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Tipo de Cirugía"
                                name="tipo"
                                value={formData.tipo}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Paciente"
                                name="paciente"
                                value={formData.paciente}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Fecha"
                                name="fecha"
                                type="date"
                                value={formData.fecha}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Hora Inicio"
                                name="hora_inicio"
                                type="time"
                                value={formData.hora_inicio}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Duración (minutos)"
                                name="duracion"
                                type="number"
                                value={formData.duracion}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formData.es_urgencia}
                                        onChange={handleChange}
                                        name="es_urgencia"
                                    />
                                }
                                label="Es Urgencia"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formData.requiere_aseo_profundo}
                                        onChange={handleChange}
                                        name="requiere_aseo_profundo"
                                    />
                                }
                                label="Requiere Aseo Profundo"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button type="submit" variant="contained" color="primary">
                        {cirugia ? 'Actualizar' : 'Crear'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default FormCirugia;