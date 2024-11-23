import React from 'react';
import { 
    Typography, 
    Grid, 
    Paper,
    Box 
} from '@mui/material';
import {
    LocalHospital as SurgeryIcon,
    PeopleAlt as PersonnelIcon,
    Event as EventIcon,
    Assessment as ReportIcon
} from '@mui/icons-material';

const Dashboard = () => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            
            <Grid container spacing={3}>
                {/* Cirugías Programadas */}
                <Grid item xs={12} sm={6} md={3}>
                    <Paper 
                        sx={{ 
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <SurgeryIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                        <Typography variant="h6">Cirugías Hoy</Typography>
                        <Typography variant="h4">5</Typography>
                    </Paper>
                </Grid>

                {/* Personal Disponible */}
                <Grid item xs={12} sm={6} md={3}>
                    <Paper 
                        sx={{ 
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <PersonnelIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                        <Typography variant="h6">Personal Disponible</Typography>
                        <Typography variant="h4">12</Typography>
                    </Paper>
                </Grid>

                {/* Eventos Pendientes */}
                <Grid item xs={12} sm={6} md={3}>
                    <Paper 
                        sx={{ 
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <EventIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                        <Typography variant="h6">Eventos Pendientes</Typography>
                        <Typography variant="h4">3</Typography>
                    </Paper>
                </Grid>

                {/* Pabellones En Uso */}
                <Grid item xs={12} sm={6} md={3}>
                    <Paper 
                        sx={{ 
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <ReportIcon sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                        <Typography variant="h6">Pabellones En Uso</Typography>
                        <Typography variant="h4">2/4</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;