import './index.css'
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Contacts from './modules/contacts/components/Contacts';
import Map from './modules/map/components/map/Map';
import Chart from './modules/chart/components/chartSection/Chart';
import Table from './modules/table/components/Table';
import Settings from './modules/settings/components/Settings';
import DarkModeProvider from './context/darkmode/DarkModeContext';

function App() {
    return (
        <DarkModeProvider>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route path='table' element={ <Table/> }></Route>
                    <Route path='contacts' element={ <Contacts/> }></Route>
                    <Route path='map' element={ <Map/> }></Route>
                    <Route path='charts' element={ <Chart/> }></Route>
                    <Route path='settings' element={ <Settings/> }></Route>
                    {/* <Route path='info' element={ <Info/> }></Route> */}
                </Route>
            </Routes>
        </DarkModeProvider>
    )
}

export default App
