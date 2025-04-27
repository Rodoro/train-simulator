'use client';
import TrainController from '@/components/TrainController';

export default function SimulatorPage() {
    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">🚂 Симулятор поезда</h1>
            <TrainController />
        </div>
    );
}