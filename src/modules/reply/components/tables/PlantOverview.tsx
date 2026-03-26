import { MaterialReactTable, type MRT_Cell, type MRT_ColumnDef, type MRT_Row } from "material-react-table";
import type { Plant } from "../diagnostic/DataQuality";
import { Box } from "@mui/material";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function PlantOverview({ plants , setPlantDetail } : { plants : Plant[] , setPlantDetail : (plant : Plant) => void }){

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

    const rowActionsRender = (row : MRT_Row<Plant>) => {
        return (
            <Box sx={{ cursor: 'pointer' , py : 1.5, paddingX: 2 }} onClick={() => setPlantDetail(row.original)}>
                <OpenInNewIcon />
            </Box>
        )
    }

    return (
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
            data={plants}
            initialState={{ density: 'compact' }}
            enableTopToolbar={false}
            enableGlobalFilter={false}
            enableFullScreenToggle={false}
            enableDensityToggle={false}
            enableBottomToolbar={false}
            // state={{ isLoading, showProgressBars: isFetching , pagination , globalFilter , columnFilters }}
            layoutMode="semantic"
            positionActionsColumn="last"
            enableStickyHeader
            enableRowActions
            renderRowActions={ ({ row } : { row : MRT_Row<Plant> }) => (
                rowActionsRender(row)
            )}
        />
    )
}