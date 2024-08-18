import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import ResponseTable from '../components/home/ResponseTable';
import { useResponse } from '../context/ResponseContext';
import URLForm from '../components/home/URLForm';

const Home = () => {
    const { loading, response } = useResponse();

    return (
        <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box sx={{ maxWidth: 400, backgroundColor: "rgba(0,0,0,0.8)", p: 2, borderRadius: 2, my: 5 }}>
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Typography variant="h4" align="center" gutterBottom>
                        CosmoScraper
                    </Typography>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Typography variant="body1" align="left" gutterBottom>
                        Enter a URL to scrape
                    </Typography>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <URLForm />
                </motion.div>
            </Box>

            <Box sx={{ maxWidth: 600, backgroundColor: "rgba(0,0,0,0.8)", p: 2, borderRadius: 2, my: 5 }}>
                <Typography variant="h4" align="center" gutterBottom>Response</Typography>
                {loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <CircularProgress sx={{ color: 'white' }} />
                    </Box>
                )}
                {!loading && response && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >

                        <ResponseTable />
                    </motion.div>
                )}
            </Box>
        </Box>
    );
};

export default Home;
