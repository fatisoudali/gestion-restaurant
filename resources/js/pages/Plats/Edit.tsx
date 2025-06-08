import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { useState, useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Les Plats', href: '/plats' },
    { title: 'Modifier un plat', href: '#' },
];

interface Category {
    id: number;
    name: string;
}

interface Plat {
    id: number;
    name: string;
    price: string;
    description: string;
    image: string;
    category_id: number;
}

interface Props {
    plat: Plat;
    categories: Category[];
}

export default function Edit({ plat, categories }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: plat.name || '',
        description: plat.description || '',
        price: plat.price || '',
        category_id: plat.category_id || '',
        image: null as File | null,
    });

    const [preview, setPreview] = useState<string | undefined>(plat.image);

    useEffect(() => {
        if (data.image) {
            const objectUrl = URL.createObjectURL(data.image);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setPreview(plat.image);
        }
    }, [data.image, plat.image]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('plats.update', plat.id), {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Modifier un plat" />
            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-900 max-w-2xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
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

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block font-medium mb-1">Description</label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            disabled={processing}
                            rows={3}
                        />
                        {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                    </div>

                    {/* Prix */}
                    <div>
                        <label htmlFor="price" className="block font-medium mb-1">Prix *</label>
                        <Input
                            id="price"
                            type="number"
                            min="0"
                            step="0.01"
                            value={data.price}
                            onChange={e => setData('price', e.target.value)}
                            disabled={processing}
                            required
                        />
                        {errors.price && <p className="text-sm text-red-600">{errors.price}</p>}
                    </div>

                    {/* Catégorie */}
                    <div>
                        <label htmlFor="category_id" className="block font-medium mb-1">Catégorie *</label>
                        <select
                            id="category_id"
                            value={data.category_id}
                            onChange={e => setData('category_id', Number(e.target.value))}
                            className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
                            disabled={processing}
                            required
                        >
                            <option value="">-- Sélectionner une catégorie --</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && <p className="text-sm text-red-600">{errors.category_id}</p>}
                    </div>

                    {/* Image */}
                    <div>
                        <label htmlFor="image" className="block font-medium mb-1">Image (optionnelle)</label>
                        {preview ? (
                            <img
                                src={preview}
                                alt="Aperçu"
                                className="mb-4 max-h-56 w-full rounded border object-cover"
                            />
                        ) : (
                            <div className="mb-4 flex h-56 w-full items-center justify-center rounded border bg-gray-100 text-gray-400 dark:bg-gray-800">
                                Pas d'image
                            </div>
                        )}
                        <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setData('image', e.target.files?.[0] || null)}
                            disabled={processing}
                        />
                        {errors.image && <p className="text-sm text-red-600">{errors.image}</p>}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            Enregistrer
                        </Button>
                        <Link
                            href={route('plats.index')}
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
