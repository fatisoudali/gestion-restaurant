import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Les Catégories', href: '/categories' },
    { title: 'Créer une catégorie', href: '/categories/create' },
];

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/categories', {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Créer une catégorie" />

            <div className="flex flex-1 flex-col gap-4 p-4">
                <h1 className="mb-4 text-3xl font-semibold">Créer une nouvelle catégorie</h1>

                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-3xl space-y-4"
                    encType="multipart/form-data"
                >
                    <div>
                        <label htmlFor="name" className="mb-1 block text-sm font-medium">
                            Nom
                        </label>
                        <Input
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="description" className="mb-1 block text-sm font-medium">
                            Description
                        </label>
                        <Textarea
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        {errors.description && (
                            <p className="text-sm text-red-500 mt-1">{errors.description}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="image" className="mb-1 block text-sm font-medium">
                            Image
                        </label>
                        <Input
                            id="image"
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setData('image', e.target.files?.[0] ?? null)}
                        />
                        {errors.image && (
                            <p className="text-sm text-red-500 mt-1">{errors.image}</p>
                        )}
                    </div>

                    <Button type="submit" disabled={processing}>
                        {processing ? 'Enregistrement...' : 'Enregistrer'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
