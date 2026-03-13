import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import { useState } from "react";

export default function Layout(){

    const [ open , setOpen ] = useState(false) ;

    return (
        <main className="global-container">
            <div className={styles.flexCol}>
                <div className={`${styles.flex} ${styles.borderBottom}`}>
                    <Sidebar open={open} setOpen={setOpen}/>
                    <h1 >Material UI Training</h1>
                </div>
            </div>
            <div className="container" onClick={() => setOpen(false)}>
                <Outlet/>
            </div>
        </main>
    )
}