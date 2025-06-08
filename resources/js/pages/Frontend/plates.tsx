import FrontLayout from '@/layouts/front/front-layout';
import { Head, usePage } from '@inertiajs/react';

interface Plat {
    id: number;
    name: string;
    description: string;
    price: number;
    image?: string;
    rating: number;
    reviews: number;
}

interface Props {
    plats: Plat[];
}

export default function Plats({ plats }: Props) {
    return (
        <>
            <Head title="Nos Plats" />
            <FrontLayout>
                <div className="max-w-7xl mx-auto px-4 py-10">
                    <h1 className="text-3xl font-bold text-orange-700 mb-4 text-center">Célébration des Saveurs du Maroc</h1>
                    <p className="text-center text-gray-700 mb-10">
                        Explorez notre menu diversifié, des tagines savoureux aux pâtisseries délicates, chaque plat rendant hommage aux riches traditions marocaines.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {plats.map((plat, index) => (
                            <div key={index} className="border rounded-lg shadow p-4 bg-white">
                                <img src={plat.image} alt={plat.name} className="w-full h-48 object-cover rounded mb-4" />
                                <h2 className="text-xl font-semibold text-gray-800">{plat.name}</h2>
                                <p className="text-sm text-gray-600">{plat.description}</p>
                                <div className="flex items-center justify-between mt-3">
                                    <span className="text-orange-700 font-bold">{plat.price} MAD</span>
                                    <span className="text-sm text-yellow-600">⭐ {plat.rating} ({plat.reviews})</span>
                                </div>
                                <button className="mt-4 w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition">
                                    Commander maintenant
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </FrontLayout>
        </>
    );
}
