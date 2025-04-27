export interface Train {
    id: string;
    lat: number;
    lon: number;
    status?: 'on_time' | 'delayed' | 'cancelled';
    speed?: number;
}