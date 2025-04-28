/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function TrainController() {
    const [trainId, setTrainId] = useState('express-1');
    const [lat, setLat] = useState(55.751244);
    const [lon, setLon] = useState(37.618423);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState<'auto' | 'manual' | 'geo'>('auto');

    // Автоматическое движение
    useEffect(() => {
        if (!isActive || mode !== 'auto') return;

        const route = [
            { lat: 55.751244, lon: 37.618423 },
            { lat: 59.934280, lon: 30.335099 },
        ];

        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex >= route.length) currentIndex = 0;
            const newLat = route[currentIndex].lat;
            const newLon = route[currentIndex].lon;
            setLat(newLat);
            setLon(newLon);
            sendPosition(route[currentIndex].lat, route[currentIndex].lon);
            currentIndex++;
        }, 3000);

        return () => clearInterval(interval);
    }, [isActive, mode, trainId]);

    const sendPosition = async (lat: number, lon: number) => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/trains`, {
                id: trainId,
                lat,
                lon
            });
            console.log('Позиция отправлена:', { trainId, lat, lon });
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    // Ручное управление
    const move = (direction: 'up' | 'down' | 'left' | 'right') => {
        const step = 0.01;
        const newLat = direction === 'up' ? lat + step : direction === 'down' ? lat - step : lat;
        const newLon = direction === 'right' ? lon + step : direction === 'left' ? lon - step : lon;
        setLat(newLat);
        setLon(newLon);
        sendPosition(newLat, newLon);
    };

    // Реальная геолокация
    const startGeo = () => {
        if (!navigator.geolocation) {
            alert('Геолокация не поддерживается!');
            return;
        }
        navigator.geolocation.watchPosition(
            (pos) => {
                console.log(pos.coords.latitude, pos.coords.longitude)
                setLat(pos.coords.latitude);
                setLon(pos.coords.longitude);
                sendPosition(pos.coords.latitude, pos.coords.longitude);
            },
            (err) => console.error('Ошибка геолокации:', err)
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold mb-6">🚂 Симулятор поезда</h1>

            <div className="mb-4">
                <label className="block mb-2">ID поезда:</label>
                <input
                    type="text"
                    value={trainId}
                    onChange={(e) => setTrainId(e.target.value)}
                    className="p-2 border rounded"
                />
            </div>

            <div className="mb-6">
                <label className="block mb-2">Режим:</label>
                <div className="flex gap-4">
                    <button
                        onClick={() => setMode('auto')}
                        className={`p-2 rounded ${mode === 'auto' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Авто
                    </button>
                    <button
                        onClick={() => setMode('manual')}
                        className={`p-2 rounded ${mode === 'manual' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Ручной
                    </button>
                    <button
                        onClick={() => { setMode('geo'); startGeo(); }}
                        className={`p-2 rounded ${mode === 'geo' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Геолокация
                    </button>
                </div>
            </div>

            {mode === 'manual' && (
                <div className="mb-6 grid grid-cols-3 gap-2 max-w-xs">
                    <button onClick={() => move('up')} className="p-2 bg-gray-200 rounded col-start-2">↑</button>
                    <button onClick={() => move('left')} className="p-2 bg-gray-200 rounded">←</button>
                    <button onClick={() => move('right')} className="p-2 bg-gray-200 rounded">→</button>
                    <button onClick={() => move('down')} className="p-2 bg-gray-200 rounded col-start-2">↓</button>
                </div>
            )}

            <button
                onClick={() => setIsActive(!isActive)}
                className={`p-2 rounded ${isActive ? 'bg-red-500' : 'bg-green-500'} text-white`}
            >
                {isActive ? 'Остановить' : 'Запустить'}
            </button>

            <div className="mt-6">
                <h2 className="text-xl font-semibold">Текущая позиция:</h2>
                <p>Широта: {lat.toFixed(6)}</p>
                <p>Долгота: {lon.toFixed(6)}</p>
            </div>
        </div>
    );
}