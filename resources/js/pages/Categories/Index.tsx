import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Category {
    id: number;
    name: string;
    image?: string;
}

interface Props  {
    categories: Category[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Les Categorés',
        href: '/categories',
    },
];

export default function Index({ categories }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Les categorés" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className='flex justify-end p-4'>
                    <Link href={route('categories.create')} className='py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>creér un categoré</Link>
                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href="#"
                            className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border"
                        >
                            {category.image ? (                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="absolute inset-0 size-full object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full bg-gray-200 dark:bg-gray-800">
                                    <span className="text-gray-500 dark:text-gray-400">
                                        No Image
                                    </span>
                                </div>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-white">
                                {category.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
