import styles from './ProductsTable.module.css'
import { useMemo, useState } from 'react';
import { MaterialReactTable, type MRT_Cell, type MRT_ColumnDef, type MRT_ColumnFiltersState, type MRT_Row } from 'material-react-table';
import { Box, Chip, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useProducts } from '../../../../data/products/useProducts';

export default function ProductsTable(){

    const [ pagination, setPagination ] = useState({ pageIndex: 0, pageSize: 10 }) ;
    const [ columnFilters , setColumnFilters ] = useState<MRT_ColumnFiltersState>([]) ; 
    const [ globalFilter, setGlobalFilter ] = useState('') ;
    const { data, isLoading, isFetching } = useProducts({
        pageSize: pagination.pageSize,
        pageIndex: pagination.pageIndex,
    }) ;

    const products = useMemo(() => data?.products ?? [], [data]) ;

    const columnsDef : MRT_ColumnDef<any>[] = [
        {
            accessorKey: 'thumbnail',
            header: 'Thumb',
            size : 150 ,
            grow : false,
            Cell: ({ row }) => (
                <img 
                    loading='lazy'
                    src={row.original.thumbnail} 
                    alt="product" 
                    style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 , marginLeft : 16}} 
                    onLoad={() => {}}
                />
            )
        },
        { 
            accessorKey: 'id',                 
            header: 'ID',            
            size: 100,        
            grow: false 
        },
        { 
            accessorKey: 'title',              
            header: 'Prodotto',      
            size: 180,       
            grow: true  ,
            Cell : ( ({ cell } : { cell: MRT_Cell<any> }) => (
                tooltipRender(cell.getValue<string>())
            )),
        },
        { 
            accessorKey: 'category',           
            header: 'Categoria',     
            size: undefined, 
            grow: true ,
            Cell : ( ({ cell } : { cell: MRT_Cell<any> }) => (
                tooltipRender(cell.getValue<string>())
            )),
        },
        { 
            accessorKey: 'availabilityStatus', 
            header: 'Disponibilità', 
            size: undefined, 
            grow: true  ,
            Cell: ({ cell } : { cell: MRT_Cell<any> }) => {
                const value = cell.getValue<string>()
                const color = value === 'In Stock' ? 'success' : 'warning' 
                return <Chip variant="filled" label={value} color={color} size='small' />
            }
        },
        { 
            accessorKey: 'stock',              
            header: 'Quantità',      
            size: undefined, 
            grow: true,

        },
        { 
            accessorKey: 'sku',                
            header: 'Codice',        
            size: undefined, 
            grow: true ,
            Cell : ( ({ cell } : { cell: MRT_Cell<any> }) => (
                tooltipRender(cell.getValue<string>())
            )),
        },
    ] ;

    const columns = useMemo<MRT_ColumnDef<any>[]>(() => columnsDef ,[]) ;

    const rowActionsRender = (row : MRT_Row<any>) => {
        return (
            <Box sx={{ display : 'flex' }}>
                <IconButton onClick={() => console.info('Edit' , row.original)}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={() => console.info('Delete' , row.original)}>
                    <DeleteIcon />
                </IconButton>
            </Box>
        )
    } ;

    const tooltipRender = ( value : string) => {
        return (
            <Tooltip title={value} placement="top">
                <span style={{ 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis', 
                    whiteSpace: 'nowrap',
                    display: 'block',
                    maxWidth: 200
                }}>
                    {value}
                </span>
            </Tooltip>
        )
    } ;

    return (
        <>
            <h2>DummyJSON Table Example</h2>
            <MaterialReactTable
                columns={columns}
                data={products}
                initialState={{ density: 'compact' }}
                state={{ isLoading, showProgressBars: isFetching , pagination , globalFilter , columnFilters }}
                layoutMode="grid"
                enableRowActions
                positionActionsColumn="last"
                enableRowSelection
                enableColumnOrdering
                enableStickyHeader
                enableGrouping
                renderDetailPanel={({ row } : { row : MRT_Row<any> }) => (
                    <div className={styles.flex}>
                        <p style={{ fontSize : '18px' }}>Description:</p>
                        <p>{row.original.description}</p>
                    </div>
                )}
                renderRowActions={ ({ row } : { row : MRT_Row<any> }) => (
                    rowActionsRender(row)
                )}
                manualPagination 
                rowCount={ data?.total ?? 0 }
                onPaginationChange={setPagination}
                manualFiltering                 
                onColumnFiltersChange={setColumnFilters}       
                onGlobalFilterChange={setGlobalFilter}   
            />
        </>
    )
}

// Gestione della paginazione dinamica tramite fetch progressivi

// manualPagination                    // per dichiarare la paginazione "manuale"
// state={{ pagination }}              // bisogna far tracciare lo stato della paginazione per poter sincronizzare la UI
// rowCount={ data?.total ?? 0 }       // bisogna avere un totale per poter permettere l'eventuale navigazione tra pagine
// onPaginationChange={setPagination}  // l'evento ritorna l'indice attuale, e gli elementi della pagina successiva
// {pageIndex , pageSize}   l'evento contiene o il valore diretto 
// (prev) => (prev.pageIndex , prev.pageSize) o una setterFunction

// Gestione dei filtri dinamica

// const [filters, setFilters] = useState([])      // [{ id: 'title', value: 'phone' }]
// const [globalFilter, setGlobalFilter] = useState('')
// manualFiltering                          // per dichiarare la gestione manuale dei filtri
// state={{ globalFilter , columnFilters }}                 // per far tracciare lo stato dei filtri per la UI
// onGlobalFilterChange={setGlobalFilter}   // evento gestione filtri globale ritorna solo una stringa
// onColumnFiltersChange={setFilters}       // evento gestione filtri singola colonna
// [{ id: 'title', value: 'phone' }]        l'evento contiene o il valore diretto in questo formato
// (prev) => ([prev.id , prev.value])       o una setterFunction, ricordare che ritorna un [] composto da { id , value }