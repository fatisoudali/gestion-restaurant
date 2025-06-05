import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Les Catégories', href: '/categories' },
    { title: 'Modifier une catégorie', href: '/categories/edit' },
];

interface Props {
    category: {
        id: number;
        name: string;
        description?: string;
        image?: string;
    };
}

export default function Edit({ category }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: category.name || '',
        description: category.description || '',
        image: null as File | null,
    });

    const [preview, setPreview] = useState<string | undefined>(category.image);

    useEffect(() => {
        if (data.image) {
            const objectUrl = URL.createObjectURL(data.image);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setPreview(category.image);
        }
    }, [data.image, category.image]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        put(route('categories.update', category.id), {
            forceFormData: true,
            preserveScroll: true,
        });
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Modifier catégorie" />

            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-900">
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-8">

                    {/* Name */}
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
                        <label htmlFor="description" className="mb-2 block font-medium">
                            Description
                        </label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            disabled={processing}
                            rows={5}
                        />
                        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                    </div>

                    {/* Image Upload */}
                    <div className="w-full md:2/3 lg:w-1/3">
                        <label htmlFor="image" className="mb-2 block font-medium">
                            Image
                        </label>
                        {preview ? (
                            <img src={preview} alt="Preview" className="mb-4 max-h-56 w-full rounded border object-cover" />
                        ) : (
                            <div className="mb-4 flex h-56 w-full items-center justify-center rounded border bg-gray-100 text-gray-400 dark:bg-gray-800">
                                Pas d'image
                            </div>
                        )}
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                setData('image', file);
                            }}
                            disabled={processing}
                            className="block w-full text-sm text-gray-600 file:mr-4 file:rounded file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <Button type="submit" disabled={processing}>
                            Enregistrer
                        </Button>
                        <Link
                            href={route('categories.index')}
                            className="inline-flex items-center rounded border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                            Annuler
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
