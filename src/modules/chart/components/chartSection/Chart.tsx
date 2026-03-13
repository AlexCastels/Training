import Bar from '../charts/bar/Bar'
import Pie from '../charts/pie/Pie'
import styles from './Chart.module.css'

export default function Chart(){
    return (
        <div className={styles.generalContainer}>
            <h2>Charts Example</h2>
            <div className={styles.gridContainer}>
                <div className={styles.chartContainer}>
                    <Pie/>
                </div>
                <div className={styles.chartContainer}>
                    <Bar/>
                </div>
                <div className={styles.chartContainer}>
                    <Pie/>
                </div><div className={styles.chartContainer}>
                    <Bar/>
                </div>
            </div>
        </div>
    )
}