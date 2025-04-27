// components/TrainMap.tsx
'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Train } from '@/types';

const DefaultIcon = L.icon({
    iconUrl: '/images/marker-icon.png',
    iconRetinaUrl: '/images/marker-icon-2x.png',
    shadowUrl: '/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

export default function TrainMap({ trains }: { trains: Train[] }) {
    return (
        <MapContainer
            center={[55.751244, 37.618423]} // Москва
            zoom={5}
            style={{ height: '600px', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />

            {trains.map((train) => (
                <Marker
                    key={train.id}
                    position={[train.lat, train.lon]}
                    icon={DefaultIcon}
                >
                    <Popup>
                        <div className="p-2">
                            <h3 className="font-bold">Поезд {train.id}</h3>
                            <p>Широта: {train.lat.toFixed(4)}</p>
                            <p>Долгота: {train.lon.toFixed(4)}</p>
                            {train.status && <p>Статус: {train.status}</p>}
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}