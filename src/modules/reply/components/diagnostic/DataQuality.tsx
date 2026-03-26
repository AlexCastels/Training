import { MaterialReactTable, type MRT_Cell, type MRT_ColumnDef, type MRT_Row } from "material-react-table";
import { Box } from "@mui/material";
import { Card } from "../elements/Card";
import { FilterDiagnostic } from "../filter/FilterDiagnostic";
import { useState } from "react";
import PlantOverview from "../tables/PlantOverview";
import { PlantDetail } from "../tables/PlantDetail";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export type Trend = {
    trend: "Active Power" | "Active Energy" | "Frequency" | "PR" ;
    device: string;
    completeness: number;
    consistency: number; 
    congruence: number;
    timeliness: number;
};

export type Plant = {
    id: string;
    name: string;
    completeness: number;
    consistency: number;
    congruence: number;
    timeliness: number;
    technology: string;
    geo: string;
    portfolio: string;
    trends: Trend[];
};

const plantsMock: Plant[] = [
        {
            id: "plant-1",
            name: "FRA_PV_01",
            completeness: 92,
            consistency: 88,
            congruence: 85,
            timeliness: 90,
            technology: "PV",
            geo: "FR",
            portfolio: "North",
            trends: [
            {
                trend: "Active Power",
                device: "Inverter-1",
                completeness: 95,
                consistency: 90,
                congruence: 87,
                timeliness: 93,
            },
            {
                trend: "Frequency",
                device: "Sensor-12",
                completeness: 80,
                consistency: 75,
                congruence: 70,
                timeliness: 78,
            },
            ],
        },
        {
            id: "plant-2",
            name: "ITA_WIND_02",
            completeness: 85,
            consistency: 82,
            congruence: 80,
            timeliness: 88,
            technology: "WIND",
            geo: "IT",
            portfolio: "South",
            trends: [
            {
                trend: "Active Energy",
                device: "Turbine-3",
                completeness: 85,
                consistency: 82,
                congruence: 80,
                timeliness: 88,
            },
            ],
        },
        {
            id: "plant-3",
            name: "GER_HYDRO_01",
            completeness: 78,
            consistency: 74,
            congruence: 72,
            timeliness: 76,
            technology: "HYDRO",
            geo: "DE",
            portfolio: "Central",
            trends: [
            {
                trend: "PR",
                device: "Pump-7",
                completeness: 82,
                consistency: 79,
                congruence: 77,
                timeliness: 80,
            },
            ],
        },
        {
            id: "plant-4",
            name: "ESP_PV_03",
            completeness: 96,
            consistency: 91,
            congruence: 89,
            timeliness: 94,
            technology: "PV",
            geo: "ES",
            portfolio: "South",
            trends: [
            {
                trend: "Active Power",
                device: "Inverter-5",
                completeness: 97,
                consistency: 93,
                congruence: 90,
                timeliness: 95,
            },
            {
                trend: "Active Energy",
                device: "Meter-2",
                completeness: 95,
                consistency: 89,
                congruence: 88,
                timeliness: 93,
            },
            ],
        },
        {
            id: "plant-5",
            name: "UK_WIND_04",
            completeness: 71,
            consistency: 68,
            congruence: 65,
            timeliness: 70,
            technology: "WIND",
            geo: "UK",
            portfolio: "North",
            trends: [
            {
                trend: "Active Power",
                device: "Turbine-8",
                completeness: 74,
                consistency: 70,
                congruence: 67,
                timeliness: 72,
            },
            {
                trend: "Frequency",
                device: "Sensor-3",
                completeness: 68,
                consistency: 66,
                congruence: 63,
                timeliness: 68,
            },
            ],
        },
];


export default function DataQuality(){

    const [ plantDetail , setPlantDetail ] = useState<Plant | null>(null)

    const mockTrends = [
        {
            key : 'Completeness',
            value : Math.round(plantsMock.map((el) => el.completeness).reduce(( a,b ) => a + b, 0) / plantsMock.map((el) => el.completeness).length)
        },
        {
            key : 'Consistency',
            value : Math.round(plantsMock.map((el) => el.consistency).reduce(( a,b ) => a + b, 0) / plantsMock.map((el) => el.completeness).length)
        },
        {
            key : 'Congruence',
            value : Math.round(plantsMock.map((el) => el.congruence).reduce(( a,b ) => a + b, 0) / plantsMock.map((el) => el.completeness).length)
        },
        {
            key : 'Timeliness',
            value : Math.round(plantsMock.map((el) => el.timeliness).reduce(( a,b ) => a + b, 0) / plantsMock.map((el) => el.completeness).length)
        }
    ]

    return (
        <>
            { plantDetail && 
                <Box sx={{ display : 'flex' , alignItems : 'center' , gap : 1 , bgcolor : 'gray', p : 2 }}>
                    <ArrowBackIcon sx={{ cursor : 'pointer' }} onClick={() => setPlantDetail(null)}/>
                    {plantDetail.name}
                </Box> 
            }

            <Box sx={{ 
                display : 'flex' , 
                alignItems : 'center' , 
                justifyContent : 'space-around' ,
                gap : 2,
                width : '100%' , 
            }}>
                { mockTrends.map((el , index) => (
                    <Card label={el.key} value={el.value} key={index} />
                ))}
            </Box>

            <FilterDiagnostic/>
            
            { plantDetail ? <PlantDetail plant={plantDetail} /> : <PlantOverview plants={plantsMock} setPlantDetail={setPlantDetail}/> }
        
        </>
    )
}
