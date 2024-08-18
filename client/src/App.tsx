import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import StarryBackground from './components/layout/StarryBackground';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        position: 'relative'
      }}
    >
      <StarryBackground />
      <Navbar />
      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 1,
          paddingBottom: '64px', // Adjust this if the footer height changes
        }}
        className='main'
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
