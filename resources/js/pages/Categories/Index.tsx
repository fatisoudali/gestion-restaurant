import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

interface Category {
    id: number;
    name: string;
    image?: string;
}

interface Props {
    categories: Category[];
    flash?: {
        success?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Les Categorés',
        href: '/categories',
    },
];

export default function Index({ categories, flash }: Props) {
    const { delete: destroy, processing } = useForm();
    const { props } = usePage();

    useEffect(() => {
        if (props.flash?.success) {
            toast(props.flash.success);
        }
    }, [props.flash, toast]);

    const handleDelete = (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
            destroy(route('categories.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Les categorés" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-end p-4">
                    <Link href={route('categories.create')} className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                        Créer une catégorie
                    </Link>
                </div>

                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border"
                        >
                            {category.image ? (
                                <img src={category.image} alt={category.name} className="absolute inset-0 size-full object-cover" />
                            ) : (
                                <div className="flex h-full items-center justify-center bg-gray-200 dark:bg-gray-800">
                                    <span className="text-gray-500 dark:text-gray-400">No Image</span>
                                </div>
                            )}

                            <div className="bg-opacity-50 absolute right-0 bottom-0 left-0 flex items-center justify-between bg-black p-2 text-white">
                                <span>{category.name}</span>
                                <div>
                                    <Link
                                        href={route('categories.edit', category.id)}
                                        className="ml-2 rounded bg-green-600 px-2 py-1 text-sm hover:bg-green-700"
                                    >
                                        Modifier
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(category.id)}
                                        disabled={processing}
                                        className="ml-2 rounded bg-red-600 px-2 py-1 text-sm hover:bg-red-700"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
