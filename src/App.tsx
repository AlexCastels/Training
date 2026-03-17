import './index.css'
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Contacts from './modules/contacts/components/Contacts';
import Map from './modules/map/components/map/Map';
import Chart from './modules/chart/components/chartSection/Chart';
import Table from './modules/table/components/Table';
import Settings from './modules/settings/components/Settings';
import DarkModeProvider from './context/darkmode/DarkModeContext';
import Posts from './modules/posts/components/Posts';
import TanstackProvider from './data/tanstackProvider/TanstackProvider';

function App() {
    return (
        <TanstackProvider>
            <DarkModeProvider>
                <Routes>
                    <Route path='/' element={<Layout/>}>
                        <Route path='table' element={ <Table/> } />
                        <Route path='contacts' element={ <Contacts/> } />
                        <Route path='map' element={ <Map/> } />
                        <Route path='charts' element={ <Chart/> } />
                        <Route path='settings' element={ <Settings/> } />
                        <Route path='posts' element={ <Posts/> } />
                        {/* <Route path='info' element={ <Info/> } /> */}
                    </Route>
                </Routes>
            </DarkModeProvider>
        </TanstackProvider>
    )
}

export default App
