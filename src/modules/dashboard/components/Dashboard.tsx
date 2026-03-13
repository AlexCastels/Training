import styles from './Dashboard.module.css'
import { useMemo, useState } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';

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

export default function Dashboard() {

    const [ isLoading , setIsLoading] = useState<boolean>(false) ;

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
                onRowSelectionChange={(row) => {console.log(row)}} //non funziona cosi, ritorna già il valore, continaure domani 
                initialState={{
                    density: 'compact',            // tabella compatta
                }}
            />
        </div>
    );
}
