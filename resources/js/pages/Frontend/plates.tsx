
import FrontLayout from '@/layouts/front/front-layout';
import { Head, usePage , router} from '@inertiajs/react';

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
                                <button 
                                 onClick={() => router.visit(`/commander/${plat.id}`)}
                                className="mt-4 w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition">
                                    Commander maintenant
                                </button>
                            </div>
                            
                        ))}
                    </div>
                </div>
                
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Adresse du restaurant</h2>
                        <p className="text-gray-700 mb-4">
                            RestoManager Marocain<br />
                            Centre Ville<br />
                            45800 Tinghir, Maroc
                        </p>

                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Téléphone</h2>
                        <p className="text-gray-700 mb-4">+212 662 234 564</p>

                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Newsletter</h2>
                        <p className="text-gray-700 mb-2">Recevez nos menus du jour et offres spéciales.</p>
                        <input
                            type="email"
                            placeholder="Saisissez votre e-mail"
                            className="border border-gray-300 p-2 rounded w-full mb-2"
                        />
                        <button className="bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700">
                            S'abonner
                        </button>
                        <p className="text-xs text-gray-500 mt-2">
                            Vos informations sont en sécurité. Consultez notre{' '}
                            <a href="#" className="text-orange-600 underline">politique de confidentialité</a>.
                        </p>
                    </div>
            </FrontLayout>
        </>
    );
}
