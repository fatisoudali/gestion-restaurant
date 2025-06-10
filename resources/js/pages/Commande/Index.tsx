import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Eye, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Commande {
    id: number;
    numTable: number;
    status: string;
    type: string;
    total: number;
    client: {
        name: string;
    };
}

interface Props {
    commandes: Commande[];
    flash?: {
        success?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Les Commandes',
        href: '/commandes',
    },
];

export default function Index({ commandes, flash }: Props) {
    const { delete: destroy, processing } = useForm();
    const { props } = usePage();
    const [filteredCommandes, setFilteredCommandes] = useState<Commande[]>(commandes);

    useEffect(() => {
        if (props.flash?.success) {
            toast(props.flash.success);
        }
    }, [props.flash, toast]);

    const handleDelete = (id: number) => {
        if (confirm('Voulez-vous vraiment supprimer cette commande ?')) {
            destroy(route('commandes.destroy', id));
        }
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        const filtered = commandes.filter((cmd) => cmd.client.name.toLowerCase().includes(query));
        setFilteredCommandes(filtered);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Les Commandes" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-end">
                    <div className="flex items-center gap-2">
                        <Input type="text" placeholder="Rechercher une commande..." className="w-64" onChange={handleSearch} />
                          <Link
        href={route('commandes.create')}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
    >
         Ajouter Commande
    </Link>

                    </div>
                </div>

                <h1 className="text-xl font-bold">Liste des commandes</h1>

                {filteredCommandes.length === 0 ? (
                    <p className="text-center text-gray-500 italic">Aucune commande trouvée.</p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Nom</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Prix total</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead>Nº table</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCommandes.map((cmd) => (
                                <TableRow key={cmd.id}>
                                    <TableCell>{cmd.id}</TableCell>
                                    <TableCell>{cmd.client?.name || '—'}</TableCell>
                                    <TableCell>{cmd.type}</TableCell>
                                    <TableCell>{cmd.total} MAD</TableCell>
                                    <TableCell>{cmd.status}</TableCell>
                                    <TableCell>{cmd.numTable}</TableCell>
                                    <TableCell className="flex gap-2">
                                        <Link href="" className="flex items-center gap-1 rounded bg-gray-600 px-2 py-1 text-white hover:bg-gray-700">
                                            <Eye className="h-4 w-4" />
                                            Voir
                                        </Link>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(cmd.id)} disabled={processing}>
                                            <Trash className="mr-1 h-4 w-4" />
                                            Supprimer
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </AppLayout>
    );
}
