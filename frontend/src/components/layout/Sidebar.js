import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Event as EventIcon,
    Person as PersonIcon,
    Assessment as AssessmentIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const menuItems = [
        {
            text: 'Dashboard',
            icon: <DashboardIcon />,
            path: '/dashboard',
            roles: ['admin', 'enfermera', 'personal_salud', 'gerencia']
        },
        {
            text: 'Cirugías',
            icon: <EventIcon />,
            path: '/cirugias',
            roles: ['enfermera', 'personal_salud']
        },
        {
            text: 'Personal',
            icon: <PersonIcon />,
            path: '/personal',
            roles: ['enfermera']
        },
        {
            text: 'Informes',
            icon: <AssessmentIcon />,
            path: '/informes',
            roles: ['gerencia']
        }
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                    marginTop: '64px' // altura del AppBar
                },
            }}
        >
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    {menuItems
                        .filter(item => item.roles.includes(user?.rol))
                        .map((item) => (
                            <ListItem
                                button
                                key={item.text}
                                onClick={() => navigate(item.path)}
                            >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar;