import styles from "./Settings.module.css"
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import { useDarkMode } from "../../../context/darkmode/DarkModeContext";
import MaterialUISwitch from "../../../components/elements/MaterialUISwitch";



export default function Settings(){

    const { darkMode, setDarkMode } = useDarkMode();

    return (
        <div className={styles.container}>
            <h2>Settings</h2>
            <div className={styles.container}>
                <div className={styles.flex}>
                    <p>Dark mode: </p>
                    <MaterialUISwitch onChange={(e) => setDarkMode(e.target.checked)} checked={darkMode}/>
                    { darkMode ? <DarkMode/> : <LightMode/>}
                </div>
            </div>
        </div>
    )
}