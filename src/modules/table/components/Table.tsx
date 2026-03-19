import styles from './Table.module.css'
import MockTable from './MockTable/MockTable';
import ProductsTable from './ProductsTable/ProductsTable';

export default function Table() {

    return (
        <div className={styles.container}>
            <ProductsTable/>
            <MockTable/>
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
//  è possibile accedere al valore della singola cella o alla row
//  row.original -> per puntare all'obj originale
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