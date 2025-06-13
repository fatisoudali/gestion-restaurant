import { Head, useForm } from '@inertiajs/react';

interface Plat {
    id: number;
    name: string;
    description: string;
    price: number;
    image?: string;
}

export default function Show({ plat }: { plat: Plat }) {
    const { data, setData, post, processing } = useForm({
        plat_id: plat.id,
        quantite: 1,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/valider-commande'); // à créer côté backend
    };

    return (
        <>
            <Head title={`Commander ${plat.name}`} />
            <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-10">
                <h1 className="text-2xl font-bold mb-4 text-orange-700">Commande : {plat.name}</h1>
                {plat.image && (
                    <img src={plat.image} alt={plat.name} className="w-full h-64 object-cover rounded mb-4" />
                )}
                <p className="mb-2 text-gray-700">{plat.description}</p>
                <p className="text-orange-600 font-bold text-lg mb-4">{plat.price} MAD</p>

                <form onSubmit={handleSubmit}>
                    <label className="block mb-2 font-medium">Quantité :</label>
                    <input
                        type="number"
                        min={1}
                        value={data.quantite}
                        onChange={(e) => setData('quantite', parseInt(e.target.value))}
                        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
                    />
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition"
                    >
                        Confirmer la commande
                    </button>
                </form>
            </div>
        </>
    );
}

