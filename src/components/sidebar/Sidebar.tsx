import styles from './Sidebar.module.css';
import { Drawer, List, ListItemButton, ListItemText, Collapse, IconButton, ListSubheader, ListItemIcon, Divider } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ContactsIcon from '@mui/icons-material/Contacts';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InfoIcon from '@mui/icons-material/Info';
import MapIcon from '@mui/icons-material/Map';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom' ;
import React from "react";

interface PropsInterface {
    open : boolean ,
    setOpen : (value : boolean) => void
}

export default function Sidebar({ open, setOpen }: PropsInterface) {

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
            name : 'Dashboard',
            path : '/dashboard',
            icon : 'dashboard'
        } ,
        {
            id: 4 ,
            name : 'Map',
            path : '/map',
            icon : 'map'
        } ,
        {
            id: 5 ,
            name : 'Info',
            path : '/info',
            icon : 'info'
        } ,
    ]

    const icons : any = {
        home: <HomeIcon />,
        contacts: <ContactsIcon />,
        dashboard: <DashboardIcon />,
        info: <InfoIcon />,
        map : <MapIcon/>
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
                <List subheader={<ListSubheader>Menu</ListSubheader>}>

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
                <List sx={{ marginTop: 'auto'  , alignItems : 'end' }}>
                    <ListItemButton sx={{ justifyContent: 'flex-end' }}>
                        <ListItemIcon sx={{ minWidth: 'auto' }}> <SettingsIcon/> </ListItemIcon>
                    </ListItemButton>
                </List>
            </Drawer>
        </>
    );
}