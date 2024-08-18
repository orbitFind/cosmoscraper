import React, { createContext, useState, ReactNode, useContext } from 'react';
import { ScrapeData } from '../constants/types';

// Define the shape of the context value
interface ResponseContextType {
    response: ScrapeData | null;
    setResponse: React.Dispatch<React.SetStateAction<ScrapeData | null>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with a default value
const ResponseContext = createContext<ResponseContextType | undefined>(undefined);

interface ResponseProviderProps {
    children: ReactNode;
}

// Create a provider component
export const ResponseProvider: React.FC<ResponseProviderProps> = ({ children }) => {
    const [response, setResponse] = useState<ScrapeData | null>(null);
    const [loading, setLoading] = useState(false); // Add loading state

    return (
        <ResponseContext.Provider value={{ response, setResponse, loading, setLoading }}>
            {children}
        </ResponseContext.Provider>
    );
};

// Custom hook to use the ResponseContext
export const useResponse = () => {
    const context = useContext(ResponseContext);
    if (!context) {
        throw new Error('useResponse must be used within a ResponseProvider');
    }
    return context;
};
