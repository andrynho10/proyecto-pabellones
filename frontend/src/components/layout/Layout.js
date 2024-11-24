import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Box sx={{ display: 'flex', flex: 1 }}>
                <Sidebar />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        mt: '64px', // altura del header
                        ml: '240px', // ancho del sidebar
                        width: { sm: `calc(100% - 240px)` },
                        overflow: 'auto'
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;