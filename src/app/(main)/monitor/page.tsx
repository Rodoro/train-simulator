// app/monitor/page.tsx
'use client';
import { useEffect } from 'react';
import { useSocket } from '@/hooks/useSocket';
import dynamic from 'next/dynamic';

const TrainMap = dynamic(() => import('@/components/TrainMap'), {
    ssr: false,
    loading: () => <p>Загрузка карты...</p>
});

export default function MonitorPage() {
    const { trains, socket } = useSocket();

    useEffect(() => {
        if (!socket) return;

        const interval = setInterval(() => {
            socket.emit('getTrains');
        }, 5000);

        return () => clearInterval(interval);
    }, [socket]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">
                Мониторинг ({trains.length} поездов)
            </h1>
            <TrainMap trains={trains} />
        </div>
    );
}