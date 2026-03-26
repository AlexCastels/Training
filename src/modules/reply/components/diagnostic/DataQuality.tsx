import { MaterialReactTable, type MRT_Cell, type MRT_ColumnDef, type MRT_Row } from "material-react-table";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box } from "@mui/material";
import { Card } from "../elements/Card";
import { FilterDiagnostic } from "../filter/FilterDiagnostic";

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

export type DiagnosticColumns = {

}

export default function DataQuality(){


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
    ];

    const columnsDef : MRT_ColumnDef<Plant>[] = [
        {
            accessorKey: 'name',
            header: 'Plant Name',
            size : 160 ,
            grow : false, 
            // Cell: ({ cell } : { cell: MRT_Cell<Plant> }) => <Box sx={{ py : 1.5, paddingX: 4 }}>{`${cell.getValue()} %`}</Box> 
        },
        { 
            accessorKey: 'completeness',              
            header: 'Completeness',      
            size: 160,       
            grow: true  ,
            Cell: ({ cell } : { cell: MRT_Cell<Plant> }) => <Box sx={{ py : 1.5, paddingX: 4 }}>{`${cell.getValue()} %`}</Box> 
        },
        { 
            accessorKey: 'consistency',              
            header: 'Consistency',      
            size: 160,       
            grow: true  ,
            Cell: ({ cell } : { cell: MRT_Cell<Plant> }) => <Box sx={{ py : 1.5, paddingX: 4 }}>{`${cell.getValue()} %`}</Box>        
        },
        { 
            accessorKey: 'congruence',           
            header: 'Congruence',     
            size: 160, 
            grow: true ,
            Cell: ({ cell } : { cell: MRT_Cell<Plant> }) => <Box sx={{ py : 1.5, paddingX: 4 }}>{`${cell.getValue()} %`}</Box>        
        },
        { 
            accessorKey: 'timeliness', 
            header: 'Timeliness', 
            size: 160, 
            grow: true  ,
            Cell: ({ cell } : { cell: MRT_Cell<Plant> }) => <Box sx={{ py : 1.5, paddingX: 4 }}>{`${cell.getValue()} %`}</Box>  
        },
    ] ;

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

    const rowActionsRender = (row : MRT_Row<Plant>) => {
        return (
            <Box sx={{ cursor: 'pointer' , py : 1.5, paddingX: 2 }} onClick={() => console.info('Navigate to -> ', row.original)}>
                <OpenInNewIcon />
            </Box>
        )
    }

    return (
        <>
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
            
            <MaterialReactTable
                muiTableHeadCellProps={{
                    sx: {
                        fontSize: '16px',
                        fontWeight: 'bold',
                        paddingY: 4,
                    },
                }}
                muiTableBodyRowProps={({ row }) => ({
                    sx: {
                        backgroundColor: row.index % 2 === 0 ? 'rgba(187, 187, 187, 0.1)' : 'inherit',
                    },
                })}
                columns={columnsDef}
                data={plantsMock}
                initialState={{ density: 'compact' }}
                enableTopToolbar={false}
                enableGlobalFilter={false}
                enableFullScreenToggle={false}
                enableDensityToggle={false}
                enableBottomToolbar={false}
                // state={{ isLoading, showProgressBars: isFetching , pagination , globalFilter , columnFilters }}
                layoutMode="grid"
                positionActionsColumn="last"
                enableStickyHeader
                enableRowActions
                renderRowActions={ ({ row } : { row : MRT_Row<Plant> }) => (
                    rowActionsRender(row)
                )}
                // rowCount={ plantsMock?.length ?? 0 }         
            />
        
        </>
    )
}
