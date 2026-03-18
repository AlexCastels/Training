import { useMemo } from "react";
import styles from './MockTable.module.css'
import { MaterialReactTable, type MRT_ColumnDef, type MRT_Row, type MRT_TableInstance } from 'material-react-table';
import { Box, Button, IconButton, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
    { id: 'id',    name: 'id',    label: 'ID',                  otherParameters: {} },
    { id: 'name',  name: 'name',  label: 'Nome',                otherParameters: {} },
    { id: 'email', name: 'email', label: 'Email',               otherParameters: {} },
    { id: 'role',  name: 'role',  label: 'Ruolo',               otherParameters: {} },
    { id: 'extra', name: 'extra', label: "Righe con 'extra'", otherParameters: {} },
    { id: 'test',  name: 'test',  label: "Righe con 'test'",  otherParameters: {} },
]

export default function MockTable(){

        // bisogna usare useMemo per non causare re-render nel generare le colonne
    // le props consentono di gestire varie opzioni per le celle di row e column
    // props accettano sia un obj diretto o una funzione, nella func è possibile inserire anche sx per stili personalizzati
    const columns = useMemo<MRT_ColumnDef<UserInterface>[]>(() => 
        mockColumns.map(el => ({
            accessorKey : el.id ,
            header : el.label,
            size : el.id === 'id' ? 90 : undefined,
            muiTableBodyCellProps: {
                align: el.id === 'id' || el.id === 'actions' ? 'center' : 'left',  // 'left' | 'center' | 'right'
            },
            muiTableHeadCellProps: () => ({
                // align: el.id === 'id' ? 'center' : 'left', // in MUI RT è un problema noto non poter allineare correttamente al centor l'header delle colonne
                sx: { color: el.id === 'id' ? 'cyan' : 'undefined' }
            })
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

    return (
        <>
            <h2>Mock Table Example</h2>
            <MaterialReactTable
                columns={columns}               // colonne -> { accessorKey , header }
                data={mockData}                 // righe -> la relazione tra column e row è -> column.id === nome proprietà row
                layoutMode='grid'               // table layout 'semantic' | 'grid' | 'grid-no-grow'
                enableRowActions                // abilitare le azioni
                positionActionsColumn='last'    // posizione delle azioni
                // renderRowActionMenuItems={({ row } : { row : MRT_Row<UserInterface> }) => ( 
                //     rowMenuActionsRender(row) // renderizza il menù di azioni, accetta un []
                // )} 
                renderRowActions={({ row } : { row : MRT_Row<UserInterface> }) => (
                        rowActionsRender(row)
                    )
                }
                enableRowSelection         // checkbox per selezionare righe
                enableColumnOrdering       // drag & drop colonne
                enableStickyHeader         // header fisso sullo scroll
                enableGrouping             // raggruppa per colonna
                state={{                    
                    // isLoading,          // skeleton di caricamento
                    // showProgressBars,   // barra di progresso in cima
                    // pagination,         // stato paginazione controllato
                    // sorting,            // stato sorting controllato
                    // columnFilters,      // filtri attivi
                    // globalFilter,       // testo ricerca globale
                    // rowSelection,       // righe selezionate
                }}
                renderDetailPanel={({ row } : { row : MRT_Row<UserInterface> }) => (
                    <div className={styles.flex}>
                        <p>Details:</p>
                        <p>{row.original.details}</p>
                    </div>
                )}
                renderBottomToolbarCustomActions={({ table } : { table : MRT_TableInstance<UserInterface> }) => ( 
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
        </>
    )
}