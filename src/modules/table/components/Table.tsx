import styles from './Table.module.css'
import { useMemo, useState } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { Button } from '@mui/material';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    details : string
}

interface Columns {
    id: string, 
    name: string, 
    label: string, 
    otherParameters: {} 
}

const mockData : User[] = [
    { id: 1, name: 'Mario Rossi', email: 'mario@email.it', role: 'Admin', details : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, reprehenderit?' },
    { id: 2, name: 'Luca Bianchi', email: 'luca@email.it', role: 'User', details : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, reprehenderit?' },
    { id: 3, name: 'Sara Verdi', email: 'sara@email.it', role: 'User', details : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, reprehenderit?'},
    { id: 4, name: 'Alessandro Castelli', email: 'sara@email.it', role: 'Admin' , details : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, reprehenderit?'},
    { id: 5, name: 'Marco Guido', email: 'test@email.it', role: 'User' , details : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, reprehenderit?'},
    { id: 6, name: 'Claudia Verdi', email: 'esempio@email.it', role: 'Admin' , details : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, reprehenderit?'},
    { id: 7, name: 'Giorgia Rossi', email: 'rossi@email.it', role: 'User' , details : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, reprehenderit?'},
    { id: 8, name: 'Paolo Campanile', email: 'paolo@email.it', role: 'Master' , details : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, reprehenderit?'},
];

const mockColumns : Columns[] = [
    { id: 'id', name: 'id', label: 'ID', otherParameters: {} },
    { id: 'name', name: 'name', label: 'Nome', otherParameters: {} },
    { id: 'email', name: 'email', label: 'Email', otherParameters: {} },
    { id: 'role', name: 'role', label: 'Ruolo', otherParameters: {} },
    { id: 'extra', name: 'extra', label: 'Altra colonna', otherParameters: {} },
]

export default function Table() {

    const [ isLoading , setIsLoading] = useState<boolean>(false) ;

    //bisogna usare useMemo per non causare re-render nel generare le colonne
    const columns = useMemo<MRT_ColumnDef<User>[]>(() => 
        mockColumns.map(el => ({
            accessorKey : el.id ,
            header : el.label
        }))
    ,[]) ;

    return (
        <div className={styles.container}>
            <h2>Table Example</h2>
            <MaterialReactTable
                columns={columns}
                data={mockData}
                enableRowSelection        // checkbox per selezionare righe
                enableColumnOrdering      // drag & drop colonne
                enableStickyHeader        // header fisso sullo scroll
                enableGrouping            // raggruppa per colonna
                state={{
                    isLoading,              // skeleton di caricamento
                    // showProgressBars,       // barra di progresso in cima
                    // pagination,             // stato paginazione controllato
                    // sorting,                // stato sorting controllato
                    // columnFilters,          // filtri attivi
                    // globalFilter,           // testo ricerca globale
                    // rowSelection,           // righe selezionate
                }}
                renderDetailPanel={({row}) => (
                    <div className={styles.flex}>
                        <p>Details:</p>
                        <p>{row.original.details}</p>
                    </div>
                )}
                renderBottomToolbarCustomActions={({ table }) => ( 
                    <>
                        { table.getSelectedRowModel().rows.length > 0 && 
                            <Button onClick={() => {
                                const selectedRows = table.getSelectedRowModel().rows.map( row => row.original ) ;
                                console.log(selectedRows)
                            }} > Invia </Button> 
                        }
                    </>
                )}
                // onRowSelectionChange={(updater) => setRowSelected(row)}
                initialState={{
                    density: 'comfortable',            // stile tabella
                }}
            />
        </div>
    );
}

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
//   dentro la definizione della colonna
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