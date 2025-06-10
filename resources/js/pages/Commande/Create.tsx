import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        type: '',
        status: '',
        price: '',
        numTable: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('commandes.store'), {
            onSuccess: () => {
                toast('Commande ajoutée avec succès.');
                reset();
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Créer une commande" />
            <h1 className="text-xl font-bold mb-4">Créer une commande</h1>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
                <div>
                    <Label htmlFor="name">Nom du client</Label>
                    <Input
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div>
                    <Label htmlFor="type">Type</Label>
                    <select
                        id="type"
                        value={data.type}
                        onChange={(e) => setData('type', e.target.value)}
                        className="w-full border rounded px-2 py-1"
                    >
                        <option value="">Choisir un type</option>
                        <option value="sur place">Sur place</option>
                        <option value="à emporter">À emporter</option>
                    </select>
                    {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
                </div>

                <div>
                    <Label htmlFor="status">Statut</Label>
                    <select
                        id="status"
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                        className="w-full border rounded px-2 py-1"
                    >
                        <option value="">Choisir un statut</option>
                        <option value="en attente">En attente</option>
                        <option value="servi">Servi</option>
                    </select>
                    {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
                </div>

                <div>
                    <Label htmlFor="price">Prix total (MAD)</Label>
                    <Input
                        id="price"
                        type="number"
                        value={data.price}
                        onChange={(e) => setData('price', e.target.value)}
                    />
                    {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                </div>

                <div>
                    <Label htmlFor="numTable">Nº de table</Label>
                    <Input
                        id="numTable"
                        type="number"
                        value={data.numTable}
                        onChange={(e) => setData('numTable', e.target.value)}
                    />
                    {errors.numTable && <p className="text-red-500 text-sm">{errors.numTable}</p>}
                </div>

                <Button type="submit" disabled={processing}>
                    Créer la commande
                </Button>
            </form>
        </AppLayout>
    );
}
