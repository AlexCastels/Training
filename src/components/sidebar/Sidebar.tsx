import styles from './Sidebar.module.css';
import { Drawer, List, ListItemButton, ListItemText, IconButton, ListSubheader, ListItemIcon, Divider } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ContactsIcon from '@mui/icons-material/Contacts';
import InfoIcon from '@mui/icons-material/Info';
import MapIcon from '@mui/icons-material/Map';
import SettingsIcon from '@mui/icons-material/Settings';
import AreaChartIcon from '@mui/icons-material/AreaChart';
import TocIcon from '@mui/icons-material/Toc';
import DynamicFeed from '@mui/icons-material/DynamicFeed';
import { Link } from 'react-router-dom' ;
import { useDarkMode } from '../../context/darkmode/DarkModeContext';
import React from "react";
import MaterialUISwitch from '../elements/MaterialUISwitch';

interface PropsInterface {
    open : boolean ,
    setOpen : (value : boolean) => void
}

export default function Sidebar({ open, setOpen }: PropsInterface) {

    const { darkMode, setDarkMode } = useDarkMode();

    const links = [
        {
            id: 1 ,
            name : 'Home',
            path : '/',
            icon : 'home'
        } ,
        {
            id: 2 ,
            name : 'Contacts',
            path : '/contacts',
            icon : 'contacts'
        } ,
        {
            id: 3 ,
            name : 'Table',
            path : '/table',
            icon : 'table'
        } ,
        {
            id: 4 ,
            name : 'Map',
            path : '/map',
            icon : 'map'
        } ,
        {
            id: 5 ,
            name : 'Posts',
            path : '/posts',
            icon : 'posts'
        } ,
        {
            id: 7 ,
            name : 'Info',
            path : '/info',
            icon : 'info'
        } ,
    ]

    const icons : any = {
        home: <HomeIcon />,
        contacts: <ContactsIcon />,
        table: <TocIcon />,
        info: <InfoIcon />,
        map : <MapIcon/>,
        charts : <AreaChartIcon/>,
        posts : <DynamicFeed/>
    };

    return (
        <>
            <IconButton onClick={() => setOpen(!open)}>
                <MenuIcon />
            </IconButton>

            <Drawer
                slotProps={{
                    paper : {
                        sx :{ 
                            width: 200 ,
                            display: 'flex',
                            flexDirection: 'column',
                        }
                    }
                }}
                open={open}
                onClose={() => setOpen(false)}
                variant="temporary"
            >
                <List subheader={<ListSubheader sx={{ fontSize: 'large' }}>Menu</ListSubheader>}>

                    { links.map((link)=>{
                        return (
                            <React.Fragment key={link.id} >
                                <Link className={styles.link} to={link.path} onClick={() => setOpen(false)}>
                                    <ListItemButton>
                                        <ListItemIcon sx={{ minWidth: 40 }}> { icons[link.icon] } </ListItemIcon>
                                        <ListItemText primary={link.name} />
                                    </ListItemButton>
                                </Link>
                                { link.id === 1 && <Divider/> }
                            </React.Fragment>
                        )
                    }) }
                    <Divider/>
                </List>
                <List sx={{ marginTop: 'auto'  , alignItems : 'end' , display: 'flex' , justifyContent : 'space-between', paddingX : '0.5rem'}}>
                    <MaterialUISwitch onChange={(e) => setDarkMode(e.target.checked)} checked={darkMode}/>
                    <Link to={'/settings'} onClick={() => setOpen(false)}>
                        <ListItemButton sx={{ justifyContent: 'flex-end' , borderRadius: 2 }}>
                            <ListItemIcon sx={{ minWidth: 'auto' }}> <SettingsIcon/> </ListItemIcon>
                        </ListItemButton>
                    </Link>
                </List>
            </Drawer>
        </>
    );
}