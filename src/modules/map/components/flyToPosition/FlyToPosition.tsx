import type { LatLngTuple } from "leaflet";
import { useEffect } from "react";
import { Marker, Popup, Tooltip, useMap } from "react-leaflet";

interface MarkerInterface {
    id: number, 
    position: LatLngTuple ,
    label: string,
    description : string
}

export function FlyToPosition({ place , setSelectMarker }: { place: MarkerInterface , setSelectMarker : (marker : MarkerInterface) => void }) {

    const map = useMap();
    useEffect(() => {
        if (place) map.flyTo(place.position, 16);
    }, [place]);

    return (
        <Marker position={place.position} eventHandlers={{ click: () => setSelectMarker(place) }}>
            <Popup>{place.label}</Popup>
            <Tooltip permanent>{place.description}</Tooltip>
        </Marker>
    );
}

    // hook disponibili per manipolare la mappa, da poter utilizzare in altri componenti
    // Eventi in ascolto
    // const map = useMapEvents({
    //     click: (e) => console.log(e.latlng),         // click sulla mappa
    //     dblclick: (e) => {},                         // doppio click
    //     mousemove: (e) => {},                        // mouse si muove
    //     zoom: () => console.log(map.getZoom()),      // zoom cambia
    //     zoomend: () => {},                           // zoom finisce
    //     moveend: () => {},                           // mappa finisce di spostarsi
    //     locationfound: (e) => {},                    // GPS trovato
    //     locationerror: (e) => {},                    // GPS non trovato/negato
    // });

    // Metodi che possono essere utilizati 
    // const map = useMap() 

    // Navigazione
    // map.flyTo([lat, lng], zoom)      // animazione fluida verso coordinate
    // map.setView([lat, lng], zoom)    // spostamento istantaneo
    // map.panTo([lat, lng])            // sposta senza cambiare zoom
    // map.flyToBounds(bounds)          // adatta la vista a un'area

    // Zoom
    // map.setZoom(15)
    // map.zoomIn()
    // map.zoomOut()
    // map.getZoom()                    // legge lo zoom attuale

    // Lettura stato
    // map.getCenter()                  // coordinate centro attuale
    // map.getBounds()                  // area visibile attuale
    // map.getSize()                    // dimensioni in pixel

    // Posizione utente
    // map.locate()                     // richiede GPS al browser
    // map.stopLocate()                 // smette di seguire la posizione

    // map.invalidateSize()             // ricalcola dimensioni (utile se il container cambia)