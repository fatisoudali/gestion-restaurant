import FrontLayout from '@/layouts/front/front-layout';
import { Head } from '@inertiajs/react';

export default function Plates() {
    return (
        <>
            <Head title="Plates"></Head>

            <FrontLayout>
                <div className="relative overflow-hidden">
                    <h1>
                        Hello plates
                    </h1>
                </div>
            </FrontLayout>
        </>
    );
}
