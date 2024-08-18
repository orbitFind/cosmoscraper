import { TextField, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useToast } from "../../context/ToastContext";
import { scrape } from "../../services/api";
import { useResponse } from "../../context/ResponseContext";

export default function URLForm() {
    const [url, setUrl] = useState('');
    const toast = useToast();
    const { loading, setLoading, setResponse } = useResponse();


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true); // Start loading

        try {
            const response = await scrape({ url });
            if (response === 404) {
                toast.showToast('Invalid URL', 'error');
                setResponse(null); // Reset response
                return;
            } else if (response === 500) {
                toast.showToast('Internal server error', 'error');
                setResponse(null); // Reset response
                return;
            }
            setResponse(response);
        } catch (error) {
            console.error('Error during scraping:', error);
        } finally {
            setLoading(false); // Stop loading after the response is returned
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="URL"
                InputLabelProps={{
                    style: { color: 'white' }, // Placeholder and label color
                }}
                InputProps={{
                    sx: {
                        color: 'white', // Text color
                        backgroundColor: 'rgba(255,255,255,0.1)', // Slight transparent background
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white', // Outline color
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white', // Outline color on hover
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white', // Outline color when focused
                        },
                    },
                }}
                variant="outlined"
                fullWidth
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                disabled={loading} // Disable input while loading
            />

            <Button type="submit" variant="contained" sx={{ mt: 2 }} disabled={loading}>
                {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Submit'}
            </Button>
        </form>
    );
}