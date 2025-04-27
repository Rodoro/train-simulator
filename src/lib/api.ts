import axios from 'axios';

export const sendPosition = async (
    trainId: string,
    lat: number,
    lon: number
) => {
    try {
        await axios.post('http://localhost:3000/trains', {
            id: trainId,
            lat,
            lon,
        });
    } catch (error) {
        console.error('Ошибка отправки позиции:', error);
    }
};