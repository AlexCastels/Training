import Bar from '../charts/bar/Bar'
import Pie from '../charts/pie/Pie'
import styles from './Chart.module.css'
import Scatter from '../charts/scatter/Scatter'
import Line from '../charts/line/Line'
import { useDarkMode } from '../../../../context/darkmode/DarkModeContext'

export default function Chart(){

    const { darkMode } = useDarkMode() ;

    return (
        <div className={styles.generalContainer}>
            <h2>Charts Example</h2>
            <div className={styles.gridContainer}>
                <div className={styles.chartContainer}>
                    <Line darkMode={darkMode}/>
                </div>
                <div className={styles.chartContainer}>
                    <Scatter darkMode={darkMode}/>
                </div>
                <div className={styles.chartContainer}>
                    <Pie darkMode={darkMode}/>
                </div>
                <div className={styles.chartContainer}>
                    <Bar darkMode={darkMode}/>
                </div>
            </div>
        </div>
    )
}