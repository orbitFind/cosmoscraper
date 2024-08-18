import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; // Use RouterLink for navigation

const Navbar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#232946', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', zIndex: 2 }}>
            <Container>
                <Toolbar>
                    <Link component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexGrow: 1 }}>
                        <img src="/cosmoscraper.png" alt="CosmoScraper Logo" style={{ height: '40px', marginRight: '8px' }} />
                        <Typography variant="h6" sx={{ color: '#fff' }}>
                            CosmoScraper
                        </Typography>
                    </Link>
                    <Button color="inherit" component={RouterLink} to="/" sx={{ color: '#fff' }}>
                        Home
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/about" sx={{ color: '#fff' }}>
                        About
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/contact" sx={{ color: '#fff' }}>
                        Contact
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
