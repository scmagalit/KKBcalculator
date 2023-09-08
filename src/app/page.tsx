import KKBTable from '@/components/KKBTable';
import { StrictMode } from 'react';

export default function Home() {
    return (
        <StrictMode>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <div className="flex flex-col w-full">
                    <KKBTable />
                </div>
            </main>
        </StrictMode>
    );
}
