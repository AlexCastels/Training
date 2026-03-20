import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';

export default function Bar({ darkMode } : { darkMode : boolean }){

    const option : EChartsOption = {
        title: {
            text: 'Example Bar Chart'
        },
        tooltip: {
            trigger: 'item',        // 'item' per scatter/pie, 'axis' per bar/line
            formatter: '{a} data: {c}'   // formato testo {a}name {b}assex {c}value 
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name : 'Azienda A' ,
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
            },
            {
                name : 'Azienda B' ,
                data: [50, 60, 100, 80, 70, 200, 90],
                type: 'bar'
            },
            {
                name : 'Azienda C' ,
                data: [70, 80, 100, 80, 70, 50, 60],
                type: 'bar'
            },
            {
                name : 'Azienda D' ,
                data: [80, 90, 90, 80, 70, 80, 60],
                type: 'bar'
            }
        ]
    };

    return (
        <ReactECharts theme={darkMode ? 'dark' : 'light'} option={option} style={{ width: '100%', height: '100%' }}/>
    )
}