import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Tabs, Tab, Typography } from '@mui/material'; // Cambiado aquí
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline';
import InformationOutline from 'mdi-material-ui/InformationOutline';
import CambioDeContraseña from '../cambioDeContra/cambioDeContra';  
import CambioDeEmail from '../cambioDeEmail/cambioDeEmail';

const Configuraciones = () => {
    const [value, setValue] = useState('security');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Card>
            <Tabs value={value} onChange={handleChange} aria-label="config-settings tabs">
                <Tab value="security" label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LockOpenOutline />
                        <Typography variant="body2" sx={{ ml: 1 }}>Contraseñas</Typography>
                    </Box>
                } />
                <Tab value="info" label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <InformationOutline />
                        <Typography variant="body2" sx={{ ml: 1 }}>E-mail</Typography>
                    </Box>
                } />
            </Tabs>

            {value === 'security' && <CambioDeContraseña />}
            {value === 'info' && <CambioDeEmail />}
        </Card>
    );
};

export default Configuraciones;
