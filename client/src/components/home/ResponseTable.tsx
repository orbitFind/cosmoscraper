import React from 'react';
import { Table, TableBody, TableRow, TableCell, Select, MenuItem, Typography, Box } from "@mui/material";
import { useResponse } from "../../context/ResponseContext";
import { ScrapeData } from "../../constants/types"; // Adjust the import path as necessary

export default function ResponseTable() {
    const { response } = useResponse() as { response: ScrapeData | null }; // Ensure response has the correct type

    if (!response) {
        return <Typography variant="body1" sx={{ color: 'white' }}>No data available</Typography>;
    }

    return (
        <Box
            sx={{
                maxHeight: 'calc(100vh - 200px)', // Adjust this value based on your layout
                overflowY: 'auto', // Enable vertical scrolling if content overflows
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: '4px',
                p: 2
            }}
        >
            <Table sx={{ backgroundColor: 'transparent' }}>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{ color: 'white' }} component="th" scope="row">URL:</TableCell>
                        <TableCell sx={{ color: 'white' }}>{response.url}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ color: 'white' }} component="th" scope="row">Title:</TableCell>
                        <TableCell sx={{ color: 'white' }}>{response.title || "No title found"}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ color: 'white' }} component="th" scope="row">Description:</TableCell>
                        <TableCell sx={{ color: 'white' }}>{response.description || "No description found"}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ color: 'white' }} component="th" scope="row">Links:</TableCell>
                        <TableCell sx={{ color: 'white' }}>
                            {response.links.length > 0 ? (
                                <Select
                                    fullWidth
                                    value=""
                                    onChange={() => { }}
                                    sx={{
                                        color: 'white',
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                        '& .MuiSelect-icon': {
                                            color: 'white',
                                        },
                                        '& .MuiSelect-select': {
                                            color: 'white',
                                        },
                                        '& .MuiSelect-selectMenu': {
                                            color: 'white',
                                        },
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'white',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'white',
                                        },
                                    }}
                                >
                                    {response.links.map((link: { text: string, href: string }, index: number) => (
                                        <MenuItem sx={{ overflowX: 'auto' }} key={index} value={link.href}>
                                            {link.text ? `${link.text}: ${link.href}` : <strong>No link title</strong>}
                                        </MenuItem>
                                    ))}
                                </Select>
                            ) : (
                                <Typography variant="body1" sx={{ color: 'white' }}>No links found</Typography>
                            )}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ color: 'white' }} component="th" scope="row">Keywords:</TableCell>
                        <TableCell sx={{ color: 'white' }}>
                            {Array.isArray(response.keywords) ? response.keywords.join(', ') : response.keywords || "No keywords found"}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ color: 'white' }} component="th" scope="row">Image:</TableCell>
                        <TableCell sx={{ color: 'white' }}>
                            {response.image ? (
                                <img src={response.image} alt={response.title || "Image"} style={{ maxWidth: '50%', height: 'auto' }} />
                            ) : (
                                <Typography variant="body1" sx={{ color: 'white' }}>No image found</Typography>
                            )}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ color: 'white' }} component="th" scope="row">Category:</TableCell>
                        <TableCell sx={{ color: 'white' }}>
                            {response.category || "No category found"}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Box>
    );
}
