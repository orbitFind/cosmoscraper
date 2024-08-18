import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box
            sx={{
                width: '100%',
                backgroundColor: '#232946',
                color: '#fff',
                padding: '20px',
                textAlign: 'center',
                position: 'relative', // Changed from 'fixed' to 'relative'
                bottom: 0,
                left: 0,
                zIndex: 2,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)' // Added shadow
            }}
        >
            <Typography variant="body2" component="p">
                &copy; {new Date().getFullYear()} CosmoScraper. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
