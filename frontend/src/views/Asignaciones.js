import React, { useState } from 'react';
import {
   Box,
   Paper,
   TextField,
   Typography
} from '@mui/material';
import TablaAsignaciones from '../components/asignaciones/TablaAsignaciones';

const Asignaciones = () => {
   const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);

   return (
       <Box>
           <Box sx={{ mb: 3 }}>
               <Typography variant="h4" gutterBottom>
                   Tabla de Asignaciones
               </Typography>
               <Paper sx={{ p: 2 }}>
                   <TextField
                       type="date"
                       value={fecha}
                       onChange={(e) => setFecha(e.target.value)}
                       label="Seleccionar fecha"
                       InputLabelProps={{ shrink: true }}
                   />
               </Paper>
           </Box>
           <TablaAsignaciones fecha={fecha} />
       </Box>
   );
};

export default Asignaciones;