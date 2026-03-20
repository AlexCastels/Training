import ReactECharts from 'echarts-for-react';
import type { ECElementEvent } from 'echarts';
import { useState } from 'react';
import { ModalComponent } from '../../modal/Modal';
import type { EChartsOption } from 'echarts';

type DataInterface = [ number, number, string ]

export default function Scatter({ darkMode } : { darkMode : boolean }){

    const [ openModal , setOpenModal ] = useState<DataInterface | null>(null) ;

    const onEvents = {
        click: (params : ECElementEvent) => {
            //console.log(params);        // tutti i dati del punto cliccato
            console.log(params.seriesName); // nome della serie
            console.log(params.data);   // [x, y] del punto
            //console.log(params.value[2]);   // nome del punto
            setOpenModal(params.data as DataInterface) ;
        },
        // mouseover: (params) => {},
        // mouseout: (params) => {},
    }

    const option : EChartsOption = {

        title: {
            text: 'Example Scatter Chart',
            subtext: 'Si possono inserire più stili in un grafico',
            left: 'center'        
        },

        tooltip : {
            show : true
        },


        xAxis: {},
        yAxis: {},
        series: [
        {
            name: 'Agente A',
            type: 'scatter',
            symbolSize: 20,
            data: [
                [10.0, 8.04 , 'A'],
                [8.07, 6.95 , 'B'],
                [13.0, 7.58 , 'C'],
            ],
            label: {
                show: true,
                formatter: (params: any) => params.value[2],  // terzo elemento = nome
                position: 'top'
            }
        },
        {
            name: 'Agente B',
            type: 'scatter',
            symbolSize: 20,
            data: [
                [5.0, 3.04],
                [6.07, 4.95],
                [7.0, 5.58],
            ]
        },
        {
            name : 'Trend',
            type : 'line',
            symbolSize: 10,
            data : [
                [0,0],
                [1,1],
                [2,2],
                [3,3],
                [4,4],
                [5,5],
                [6,4],
                [7,3],
                [8,2],
                [9,1],
                [10,0]
            ]
        },
    ]
    };

    return (
        <>
            <ReactECharts theme={darkMode ? 'dark' : 'light'} option={option} onEvents={onEvents} style={{ width: '100%', height: '100%' }}/>
            <ModalComponent data={openModal} onClose={() => setOpenModal(null)}/>
        </>
    )
}


//  Struttura generale:

//  in linea di massima le opzioni sono generiche per diversi grafici, tranne alcuni nello specifico, tipo PIE

//  Tipo generico per tipizzare la option
//  type OptionDataItem = 
//      | string
//      | number
//      | Date
//      | (string | number | Date)[]   // array come il tuo [x, y, name]
//      | { value: ..., name: ..., ... } // oggetto
//      | undefined
//      | null

//  const option = {
//      // Titolo
//      title: {
//          text: 'Titolo principale',
//          subtext: 'Sottotitolo',
//          left: 'center'          // posizione: left, center, right
//      },

//      // Tooltip al hover
//      tooltip: {
//          trigger: 'item',        // 'item' per scatter/pie, 'axis' per bar/line
//          formatter: '{a}: {b}'   // formato testo
//      },

//      // Legenda
//      legend: {
//          data: ['Serie A', 'Serie B'],
//          bottom: 0               // posizione
//      },

//      // Assi (non usati in pie)
//      xAxis: {
//          name: 'Asse X',
//          type: 'value',          // 'value', 'category', 'time', 'log'
//          min: 0,
//          max: 100,
//      },
//      yAxis: {
//          name: 'Asse Y',
//          type: 'value',
//      },

//      // Griglia (area del grafico)
//      grid: {
//          left: '10%',
//          right: '10%',
//          top: '10%',
//          bottom: '10%',
//          containLabel: true      // include le label negli spazi
//      },

//      // Dati e tipo
//      series: [
//          {
//              name: 'Serie A',
//              type: 'scatter',    // scatter, bar, line, pie, ...
//              data: [...], [ x , y , name , symbolSize ]
//              data può contenere varie opzioni, [ x , y , nome , dimensione personalizzata ]

//              // Stile punti/barre
//              itemStyle: {
//                  color: '#ff0000',
//                  opacity: 0.8,
//                  borderColor: '#000',
//                  borderWidth: 1
//              },

//              // Solo scatter — dimensione simbolo
//              symbolSize: 20,

//              // Label sui punti
//              label: {
//                  show: true,
//                  position: 'top',
//                  formatter: '{c}'    // {c} = valore, {b} = nome, {a} = serie
//              }
//          }
//      ]
//  };