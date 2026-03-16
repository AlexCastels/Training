import styles from './Map.module.css'
import 'leaflet/dist/leaflet.css';
import type { LatLngTuple } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, Polygon } from 'react-leaflet'
import { useState } from 'react';
import { FlyToPosition } from '../flyToPosition/FlyToPosition';
import { ModalComponent } from '../modal/Modal';

export function Map(){

    // 1. Array tuple [lat, lng] — il più usato
    // <Marker position={[51.505, -0.09]}>

    // 2. Oggetto con lat/lng
    // <Marker position={{ lat: 51.505, lng: -0.09 }}>

    // 3. Oggetto con lat/alt
    // <Marker position={{ lat: 51.505, alt: -0.09 }}></Marker> 

    // <Popup>Testo nel popup al click</Popup>
    // <Tooltip>Testo al hover</Tooltip>

    // Hook esterni disponibili useMap | useMapEvents

    interface MarkerInterface {
        id: number, 
        position: LatLngTuple ,
        label: string,
        description : string
    }

    const center: LatLngTuple = [38.1350, 13.3310]; //Palermo

    const markers : MarkerInterface[] = [
        { id: 1, position: [38.1391023, 13.3393202], description : 'Palestra', label: 'Via Principe di Paternò, 135' },
        { id: 2, position: [38.1344018, 13.3278734], description : 'Palestra', label: 'Via Ing. Nicolò Mineo, 31' },
        { id: 3, position: [38.1276396, 13.3257735], description : 'Palestra', label: 'Viale Leonardo Da Vinci, 424' },
        { id: 4, position: [38.1320638, 13.3323492], description : 'Parcheggio', label: 'Piazzale Giotto' },
    ]; 

    const places: MarkerInterface[] = [
        { id: 1, position: [38.13333, 13.18159], description: 'Castello',     label: 'Castello di Carini' },
        { id: 2, position: [38.13139, 13.18126], description: 'Piazza',       label: 'Piazza Duomo, Carini' },
        { id: 3, position: [38.15897, 13.16903], description: 'Sito storico', label: 'Catacombe di Villagrazia' },
        { id: 4, position: [38.1554, 13.1810],   description: 'Centro',       label: 'Centro di Carini' },
        { id: 5, position: [38.1796, 13.0910],   description: 'Aeroporto',    label: 'Aeroporto Falcone-Borsellino' },
    ];

    const [ place , setPlace ] = useState<MarkerInterface | null>() ;
    const [ openModal , setOpenModal ] = useState<boolean>(false) ;
    const [ selectMarker , setSelectMarker ] = useState<MarkerInterface | null>(null)

    return (
        <div className={styles.sectionContainer}>
            <h2>Map</h2>
            <div className={styles.container}>
                <div className={styles.listContainer}>
                    <h3>Places list</h3>
                    <div className={styles.elementContainer}>
                        { places.map((place) => (
                            <div key={place.id} onClick={() => setPlace(place) } className={styles.elementList}>
                                <p>{place.id} {place.label}</p>
                            </div>
                        )) }
                    </div>
                </div>
                <MapContainer className={styles.mapContainer} 
                    center={center}             // coordinate iniziali [lat, lng]
                    zoom={15}                   // zoom iniziale
                    scrollWheelZoom={false}     // disabilita zoom con rotella
                >
                    <TileLayer 
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        // sfondo della mappa openstreetmap gratuito
                    />

                    { markers.map((marker)=>(
                        <Marker key={marker.id} 
                            position={marker.position} // tupla [lat , long]
                            eventHandlers={{ click: () => setSelectMarker(marker) }} // attr che permette di gestire diversi eventi
                        >
                            <Popup>{marker.label}</Popup>
                            <Tooltip permanent>{marker.description}</Tooltip>
                        </Marker>
                    )) }

                    {/* Componente personalizzato */}
                    { place && <FlyToPosition place={place} setSelectMarker={setSelectMarker}/> } 

                    {/* <Circle 
                        center={center}  // centro del cerchio
                        radius={500}     // raggio
                        color="green"    // colore
                        /> */}
                    <Polygon 
                        positions={[ markers.map((marker)=> marker.position )]} // array di tuple con le posizioni per tracciare il poligono
                    />
                </MapContainer>
            </div>
            <ModalComponent marker={selectMarker} onClose={() => setSelectMarker(null)} />
        </div>
    )
}