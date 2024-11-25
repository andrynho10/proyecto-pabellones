import React, { useState, useEffect } from 'react';
import {
   Paper,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Typography,
   Box,
   Chip
} from '@mui/material';
import api from '../../services/api';

const TablaAsignaciones = ({ fecha }) => {
   const [asignaciones, setAsignaciones] = useState([]);
   const [pabellones, setPabellones] = useState([]);
   const horasDelDia = Array.from({ length: 12 }, (_, i) => `${i + 8}:00`);

   useEffect(() => {
       const fetchData = async () => {
           try {
               const [asignacionesRes, pabellonesRes] = await Promise.all([
                   api.get(`/asignaciones/fecha/${fecha}`),
                   api.get('/pabellones')
               ]);
               setAsignaciones(asignacionesRes.data);
               setPabellones(pabellonesRes.data);
           } catch (error) {
               console.error('Error al cargar datos:', error);
           }
       };
       fetchData();
   }, [fecha]);

   const getAsignacionPorHora = (pabellonId, hora) => {
       return asignaciones.find(a => 
           a.pabellon_id === pabellonId && 
           a.hora_inicio === hora
       );
   };

   return (
       <TableContainer component={Paper}>
           <Table>
               <TableHead>
                   <TableRow>
                       <TableCell>Hora</TableCell>
                       {pabellones.map(pabellon => (
                           <TableCell key={pabellon.id}>
                               Pabellón {pabellon.numero}
                           </TableCell>
                       ))}
                   </TableRow>
               </TableHead>
               <TableBody>
                   {horasDelDia.map(hora => (
                       <TableRow key={hora}>
                           <TableCell>{hora}</TableCell>
                           {pabellones.map(pabellon => {
                               const asignacion = getAsignacionPorHora(pabellon.id, hora);
                               return (
                                   <TableCell key={pabellon.id}>
                                       {asignacion && (
                                           <Box>
                                               <Typography variant="subtitle2">
                                                   {asignacion.cirugia_tipo}
                                               </Typography>
                                               <Typography variant="caption" color="textSecondary">
                                                   {asignacion.paciente}
                                               </Typography>
                                               <Chip 
                                                   size="small"
                                                   label={`${asignacion.duracion} min`}
                                                   color="primary"
                                               />
                                           </Box>
                                       )}
                                   </TableCell>
                               );
                           })}
                       </TableRow>
                   ))}
               </TableBody>
           </Table>
       </TableContainer>
   );
};

export default TablaAsignaciones;