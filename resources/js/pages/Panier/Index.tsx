import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface PlatPanier {
    id: number;
    nom: string;
    prix: number;
    quantite: number;
}

interface Props {
    panier: Record<number, PlatPanier>;
}

export default function Panier({ panier }: Props) {
    const total = Object.values(panier).reduce(
        (acc, item) => acc + item.prix * item.quantite,
        0
    );

    return (
        <AppLayout>
            <Head title="Mon Panier" />
            <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Mon Panier</h1>
                {Object.keys(panier).length === 0 ? (
                    <p>Votre panier est vide.</p>
                ) : (
                    <>
                        <table className="w-full mb-4">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left">Plat</th>
                                    <th>Quantité</th>
                                    <th>Prix</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.values(panier).map((item) => (
                                    <tr key={item.id} className="border-b">
                                        <td>{item.nom}</td>
                                        <td>{item.quantite}</td>
                                        <td>{item.prix} MAD</td>
                                        <td>{item.prix * item.quantite} MAD</td>
                                        <td>
                                            <form method="POST" action={`/panier/${item.id}`}>
                                                <input type="hidden" name="_method" value="DELETE" />
                                                <button
                                                    type="submit"
                                                    className="text-red-600 hover:underline"
                                                >
                                                    Supprimer
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="text-right font-semibold text-xl">
                            Total : {total} MAD
                        </div>
                    </>
                )}
            </div>
        </AppLayout>
    );
}
