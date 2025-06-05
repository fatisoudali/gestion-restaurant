import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Les Clients', href: '/clients' },
    { title: 'Modifier un client', href: '#' },
];

interface Props {
    client: {
        id: number;
        name: string;
        email?: string;
        phone?: string;
        address?: string;
    };
}

export default function Edit({ client }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: client.name || '',
        email: client.email || '',
        phone: client.phone || '',
        address: client.address || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('clients.update', client.id), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Modifier un client" />
            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-900 max-w-2xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Nom */}
                    <div>
                        <label htmlFor="name" className="block font-medium mb-1">Nom *</label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            disabled={processing}
                            required
                        />
                        {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block font-medium mb-1">Email</label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            disabled={processing}
                        />
                        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                    </div>

                    {/* Téléphone */}
                    <div>
                        <label htmlFor="phone" className="block font-medium mb-1">Téléphone</label>
                        <Input
                            id="phone"
                            value={data.phone}
                            onChange={e => setData('phone', e.target.value)}
                            disabled={processing}
                        />
                        {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
                    </div>

                    {/* Adresse */}
                    <div>
                        <label htmlFor="address" className="block font-medium mb-1">Adresse</label>
                        <Textarea
                            id="address"
                            value={data.address}
                            onChange={e => setData('address', e.target.value)}
                            disabled={processing}
                            rows={3}
                        />
                        {errors.address && <p className="text-sm text-red-600">{errors.address}</p>}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            Enregistrer
                        </Button>
                        <Link
                            href={route('Client.index')}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                            Annuler
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
