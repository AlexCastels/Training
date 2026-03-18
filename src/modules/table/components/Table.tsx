import styles from './Table.module.css'
import { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef, type MRT_Row, type MRT_TableInstance } from 'material-react-table';
import { Box, Button, IconButton, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useProducts } from '../../../data/products/useProducts';
import MockTable from './MockTable/MockTable';


interface UserInterface {
    id: number;
    name: string;
    email: string;
    role: string;
    details : string;
    extra? : string;
    test? : string;
}

interface ColumnsInterface {
    id: string, 
    name: string, 
    label: string, 
    otherParameters: {} 
}

const mockData : UserInterface[] = [
    { id: 1,  name: 'Mario Rossi', email: 'mario@email.it', role: 'Admin', details : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, reprehenderit?'        , extra : 'extra', },
    { id: 2,  name: 'Luca Bianchi', email: 'luca@email.it', role: 'User', details : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, reprehenderit?'         , extra : 'extra', },
    { id: 3,  name: 'Sara Verdi', email: 'sara@email.it', role: 'User', details : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, reprehenderit?'           , extra : 'extra', },
    { id: 4,  name: 'Alessandro Castelli', email: 'sara@email.it', role: 'Admin' , details : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, reprehenderit?', extra : 'extra', },
    { id: 5,  name: 'Marco Guido', email: 'test@email.it', role: 'User' , details : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, reprehenderit?'         , extra : 'extra', },
    { id: 6,  name: 'Claudia Verdi', email: 'esempio@email.it', role: 'Admin' , details : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, reprehenderit?'   , test : 'test', },
    { id: 7,  name: 'Giorgia Rossi', email: 'rossi@email.it', role: 'User' , details : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, reprehenderit?'      , test : 'test', },
    { id: 8,  name: 'Paolo Campanile', email: 'paolo@email.it', role: 'Master' , details : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, reprehenderit?'  , test : 'test', },
];

const mockColumns : ColumnsInterface[] = [
    { id: 'thumbnail ',  name: 'thumbnail ',  label: 'Thumb',           otherParameters: {} },
    { id: 'id',    name: 'id',    label: 'ID',                otherParameters: {} },
    { id: 'category',  name: 'category',  label: 'Categoria', otherParameters: {} },
    { id: 'product', name: 'product', label: 'Prodotto',      otherParameters: {} },
    { id: 'availabilityStatus', name: 'availabilityStatus', label: 'Disponibilità',  otherParameters: {} },
    { id: 'stock', name: 'stock', label: 'Quantità',  otherParameters: {} },
    { id: 'sku', name: 'sku', label: 'Codice',        otherParameters: {} },
    
]

export default function Table() {
    
    const [ paginationOption , setPaginationOption ] = useState({
        pageIndex : 0 ,
        limit : 10 ,
        skip : 0 
    })

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 15, 
    });

    const { data , isLoading , isFetching } = useProducts(paginationOption) ;
    const products = useMemo(() => data?.products ?? [], [data]) ;
 
    // bisogna usare useMemo per non causare re-render nel generare le colonne
    // le props consentono di gestire varie opzioni per le celle di row e column
    // props accettano sia un obj diretto o una funzione, nella func è possibile inserire anche sx per stili personalizzati
    const columns = useMemo<MRT_ColumnDef<any>[]>(() => 
        mockColumns.map(el => ({
            accessorKey : el.id ,
            header : el.label,
            // Cell: ({ cell }) => (
            //     <img src={cell.getValue<string>()} alt="product" style={{ width: 50, height: 50, objectFit: 'cover' }} /> 
            // )
        }))
    ,[]) ;

    // renderRowActionMenuItems accetta un array di elementi per la lista di azioni
    const rowMenuActionsRender = (row : MRT_Row<UserInterface>) => {
        return (
            [
                <MenuItem key="edit" onClick={() => console.info('Edit' , row.original)}>
                    Edit
                </MenuItem>,
                <MenuItem key="delete" onClick={() => console.info('Delete' , row.original)}>
                    Delete
                </MenuItem>
            ]
        )
    }

    // renderRowActions permette di inseire bottoni per interazioni con la riga
    const rowActionsRender = (row : MRT_Row<UserInterface>) => {
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
    }

    //useMaterialReactTable non cattura il cambio di stato, legge solo il primo valore
    const table = useMaterialReactTable({
        columns : columns,
        data : products,       
        layoutMode :'grid',        
        enableRowActions : true ,
        positionActionsColumn : 'last' ,
        enableRowSelection   : true,
        enableColumnOrdering : true,
        enableStickyHeader   : true,
        enableGrouping       : true,
        // rowCount: data?.total ?? 0,
        initialState : {
            // isLoading,
            density: 'comfortable',
        } ,
        // onPaginationChange: setPagination ,
        // manualPagination: true,
        state: {
            isLoading: isLoading,           // solo primo load
            //showProgressBars: isFetching,   // refetch (non blocca la table)
            // pagination: { pageIndex: paginationOption.pageIndex , pageSize : paginationOption.limit }, 
        },
        // renderRowActions={({ row } : { row : MRT_Row<UserInterface> }) => (
        //         rowActionsRender(row)
        //     ) 
        // },
        
        // renderDetailPanel={({ row } : { row : MRT_Row<UserInterface> }) => (
        //     <div className={styles.flex}>
        //         <p>Details:</p>
        //         <p>{row.original.details}</p>
        //     </div>
        // )},
        // renderBottomToolbarCustomActions={({ table } : { table : MRT_TableInstance<UserInterface> }) => ( 
        //     <>
        //         { table.getSelectedRowModel().rows.length > 0 && 
        //             <Button onClick={() => {
        //                 const selectedRows = table.getSelectedRowModel().rows.map( row => row.original ) ;
        //                 console.log(selectedRows)
        //             }} > Invia </Button> 
        //         }
        //     </>
        // )}
        
    })

    return (
        <div className={styles.container}>
            <h2>DummyJSON Table Example</h2>
            {/* <MaterialReactTable table={table}/> */}
                <MaterialReactTable
                    columns={columns}
                    data={products}
                    state={{ isLoading, showProgressBars: isFetching }}
                    layoutMode="grid"
                    enableRowActions
                    positionActionsColumn="last"
                    enableRowSelection
                    enableColumnOrdering
                    enableStickyHeader
                    enableGrouping
                    initialState={{ density: 'comfortable' }}
                />
            {/* <MockTable/> */}
        </div>
    );
}

//  E' possibile renderizzare la table in un altra maniera, estrapolando tutta la logia dal Tsx tramite l'hook useMaterialReactTable({})
//  l'obj table è già disponibile all'internodell'hook
//  const table = useMaterialReactTable({
//    columns,
//    data,
//    enableRowActions: true,
//    renderRowActionMenuItems: ({ row }) => [],
//    ...altre options
//  });
//  return <MaterialReactTable table={table} />;

//  Sono disponibili diverse opzioni per renderizzare elementi nella table

//  Toolbar
//  renderTopToolbarCustomActions={({ table }) => (
//      // bottoni/azioni sopra la tabella (es. "Nuovo", "Elimina selezionati")
//  )}

//  renderBottomToolbarCustomActions={({ table }) => (
//      // azioni sotto la tabella (es. info sulle righe selezionate)
//  )}

//  Row
//  renderDetailPanel={({ row }) => (
//      // pannello espandibile sotto ogni riga
//  )}

//  renderRowActions={({ row, table }) => (
//      // azioni per singola riga (es. icone modifica/elimina)
//  )}

//  renderRowActionMenuItems={({ row }) => [
//      // menu a tendina per singola riga
//      <MenuItem onClick={() => {}}>Modifica</MenuItem>,
//      <MenuItem onClick={() => {}}>Elimina</MenuItem>,
//  ]}

//  Celle:
//  dentro la definizione della colonna
//  {
//      accessorKey: 'role',
//      header: 'Ruolo',
//      Cell: ({ cell, row }) => (
//          // render custom per ogni cella di questa colonna
//          <Chip label={cell.getValue<string>()} />
//      ),
//      Header: ({ column }) => (
//          // render custom per l'header della colonna
//          <strong>{column.columnDef.header}</strong>
//      )
//  }

//  Toolbar personalizzata
//  renderTopToolbar={({ table }) => (
//      // sostituisce completamente la toolbar di MRT
//  )}

//  ci sono diverse funzioni disponibili per gestire le row ( https://tanstack.com/table/v8/docs/api/features/row-selection )

//  Table obj
//  Lettura stato
//  table.getSelectedRowModel().rows  // array delle righe selezionate
//  table.getIsAllRowsSelected()      // tutte le righe selezionate?
//  table.getIsSomeRowsSelected()     // almeno una selezionata?

//  Azioni Generali
//  table.toggleAllRowsSelected()     // seleziona/deseleziona tutto
//  table.resetRowSelection()         // deseleziona tutto

//  Paginazione
//  table.nextPage()
//  table.previousPage()
//  table.getPageCount()
//  table.getState().pagination.pageIndex    // pagina corrente

//  Sorting
//  table.getState().sorting                 // sorting attivo
//  table.resetSorting()

//  Filtri
//  table.getState().columnFilters           // filtri attivi
//  table.resetColumnFilters()
//  table.setGlobalFilter('testo')           // imposta ricerca globale

//  Colonne
//  table.getAllColumns()                    // tutte le colonne
//  table.getVisibleLeafColumns()            // colonne visibili
//  table.resetColumnVisibility()

//  Righe
//  table.getRowModel().rows                 // tutte le righe visibili (dopo filtri/sort)
//  table.getPreFilteredRowModel().rows      // righe prima dei filtri
//  table.getCoreRowModel().rows             // tutte le righe senza trasformazioni

//  Espansione
//  table.toggleAllRowsExpanded()
//  table.resetExpanded()

//  Row obj
//  Lettura dati
//  row.original                      // l'oggetto originale che hai passato in data (es. UserInterface)
//  row.id                            // id stringa della riga (indice di default)
//  row.index                         // indice numerico della riga
//  row.getValue('name')              // valore di una specifica colonna

//  Selezione
//  row.getIsSelected()               // è selezionata?
//  row.toggleSelected()              // seleziona/deseleziona
//  row.getCanSelect()                // può essere selezionata?

//  Espansione
//  row.getIsExpanded()               // è espansa (detail panel)?
//  row.toggleExpanded()              // apri/chiudi il detail panel

//  Visibilità
//  row.getVisibleCells()             // array delle celle visibili
//  row.getAllCells()                 // array di tutte le celle

//  Gerarchia
//  row.subRows                       // righe figlie
//  row.parentId                      // id della riga padre
//  row.depth                         // livello di profondità