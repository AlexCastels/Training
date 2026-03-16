import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { createContext, useContext, useState, type ReactNode } from 'react';

interface DarkModeContextInterface {
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
}

//context
export const DarkModeContext = createContext<DarkModeContextInterface>({ darkMode: true, setDarkMode: () => {} });

//utility hook
export const useDarkMode = () => useContext(DarkModeContext);

//export providers
export default function DarkModeProvider( {children} : {children : ReactNode }){
    
    const [darkMode, setDarkMode] = useState(false);

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: { main: '#90caf9' },
            secondary: { main: '#5becff' },
            background: darkMode 
                ? { default: '#121212', paper: '#1d1d1d' }
                : { default: '#f1f5f9', paper: '#f1f5f9' },
        },
    });

    return (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            <ThemeProvider theme={theme} >
                <CssBaseline />
                {children}
            </ThemeProvider>
        </DarkModeContext.Provider>
    )
}

// <CssBaseline /> E' un reset del css per normalizzare lo stile, in più permette di controllare darkmode
// Viene comunque sovrascritto dal custom css 