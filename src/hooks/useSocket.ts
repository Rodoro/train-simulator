/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [trains, setTrains] = useState<any[]>([]);

    useEffect(() => {
        const newSocket = io('http://localhost:4000', {
            path: '/socket.io',
            transports: ['websocket']
        });

        newSocket.on('connect', () => {
            console.log('Socket connected:', newSocket.id);
            newSocket.emit('getTrains');
        });

        newSocket.on('trains', (data) => {
            // console.log('Trains data received:', data);
            setTrains(data);
        });

        newSocket.on('disconnect', () => {
            console.log('Socket disconnected');
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    return { socket, trains };
};