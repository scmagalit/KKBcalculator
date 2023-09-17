import KKBTable from '@/components/KKBTable';
import { StrictMode } from 'react';

export default function Home() {
    return (
        <StrictMode>
            <main className="flex min-h-screen flex-col p-3">
                {/* <div className="w-full h-[50vh] overflow-x-auto overflow-y-auto  border"> */}
                <KKBTable />
                {/* </div> */}
            </main>
        </StrictMode>
    );
}
