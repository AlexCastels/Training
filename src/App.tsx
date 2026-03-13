
import './index.css'
import {createTheme, ThemeProvider} from "@mui/material/styles"
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './modules/dashboard/components/Dashboard';
import Contacts from './modules/contacts/components/Contacts';
import { Map } from './modules/map/components/map/Map';

function App() {

    const theme = createTheme({
        palette: {
            mode: 'dark', // o 'light'
            primary: { main: '#90caf9' },
            secondary : { main : '#a090f9' },
            background: { default: '#121212', paper: '#1d1d1d' },
        },
    });

    return (
        <ThemeProvider theme={theme} >
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route path='dashboard' element={ <Dashboard/> }></Route>
                    <Route path='contacts' element={ <Contacts/> }></Route>
                    <Route path='map' element={ <Map/> }></Route>
                    {/* <Route path='info' element={ <Info/> }></Route> */}
                </Route>
            </Routes>
        </ThemeProvider>
    )
}

export default App
