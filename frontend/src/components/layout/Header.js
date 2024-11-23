import React from 'react';
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    Button, 
    Box 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Clínica BAK
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ mr: 2 }}>
                        {user?.nombre} - {user?.rol}
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>
                        Cerrar Sesión
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;