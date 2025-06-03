import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Card, CardAction, CardHeader, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';

interface Plat {
    id: number;
    category_id: number;
    name: string;
    image?: string;
    price: number;
    category: {
        name: string;
    };
}


interface Props {
    plats: Plat[];
    flash?: {
        success?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Les PLlats',
        href: '/plats',
    },
];

export default function Index({ plats, flash }: Props) {
    const { delete: destroy, processing } = useForm();
    const { props } = usePage();

    useEffect(() => {
        if (props.flash?.success) {
            toast(props.flash.success);
        }
    }, [props.flash, toast]);

    const handleDelete = (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce plat ?')) {
            destroy(route('plats.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Les Plats" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-end p-4">
                    <Link href={route('plats.create')} 
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                        Ajouter un plat
                    </Link>
                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {plats.map((plat) => (
                        <Card className="w-full max-w-sm rounded-2xl shadow-md" key={plat.id}>
                            <CardHeader>
                                <img
                                    src={plat.image}
                                    alt={plat.name}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="text-xl font-semibold">{plat.name}</CardTitle>
                                <CardDescription className="text-gray-500">Catégorie: {plat.category?.name}</CardDescription>
                                <span className="text-lg font-bold text-green-600">{plat.price} MAD</span>
                            </CardContent>
                            <CardFooter className="flex justify-end gap-4 items-center">
                                <CardAction>
                                    <button className="px-4 py-1 bg-green-700 text-white rounded hover:bg-green-800 transition">
                                        Modifier
                                    </button>
                                </CardAction>
                                <CardAction>
                                    <button
                                        onClick={() => handleDelete(plat.id)}
                                        disabled={processing}
                                        className="px-4 py-1 bg-red-700 text-white rounded hover:bg-red-800 transition"
                                    >
                                        Supprimer
                                    </button>
                                </CardAction>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
