import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MenuItem, Select } from "@mui/material";
import i18n from "../../i18n";

export default function Layout(){

    const { t } = useTranslation() ;
    const [lang, setLang] = useState(i18n.language) ; 
    const [ open , setOpen ] = useState(false) ;

    return (
        <main className={styles.mainContainer}>
            <div className={styles.flexCol}>
                <div className={`${styles.topContainer} ${styles.borderBottom}`}>
                    <div className={styles.flex}>
                        <Sidebar open={open} setOpen={setOpen}/>
                        <h1>Material UI {t('common.training')}</h1>
                    </div>
                    <Select
                        value={lang}
                        onChange={(e) => {
                            setLang(e.target.value) ;
                            i18n.changeLanguage(e.target.value) ;
                        }}
                    >
                        <MenuItem value="it">Italiano</MenuItem>
                        <MenuItem value="en">English</MenuItem>
                    </Select>
                </div>
            </div>
            <div className={styles.outletContainer} onClick={() => setOpen(false)}>
                <Outlet/>
            </div>
        </main>
    )
}