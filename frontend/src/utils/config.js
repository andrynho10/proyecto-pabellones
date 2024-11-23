export const API_URL = 'http://localhost:3000/api';

export const endpoints = {
    auth: {
        login: '/auth/login'
    },
    cirugias: {
        base: '/cirugias',
        byId: (id) => `/cirugias/${id}`
    },
    pabellones: {
        base: '/pabellones',
        byId: (id) => `/pabellones/${id}`
    },
    personal: {
        base: '/personal',
        disponible: '/personal/disponible',
        porTipo: (tipo) => `/personal/tipo/${tipo}`
    },
    eventos: {
        base: '/eventos',
        porCirugia: (id) => `/eventos/cirugia/${id}`,
        hoy: '/eventos/hoy'
    }
};