import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

import {Table,TableHeader,TableRow,TableHead,TableBody,TableCell,} from '@/components/ui/table';

interface Client {
  id: number;
  category_id: number;
  name: string;
  email: string;
  phone?: string;
  address: string;
}

interface Props {
  clients: Client[];
  flash?: {
    success?: string;
  };
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Les Clients',
    href: '/clients',
  },
];

export default function Index({ clients, flash }: Props) {
  const { delete: destroy, processing } = useForm();
  const { props } = usePage();

  console.log(clients);

  useEffect(() => {
    if (props.flash?.success) {
      toast(props.flash.success);
    }
  }, [props.flash, toast]);

  const handleDelete = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      destroy(route('clients.destroy', id));
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Les Clients" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="flex justify-end p-4">
          <Link
            href={route('clients.create')}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Ajouter un client
          </Link>
        </div>
        
        <h1>Liste des clients</h1>

        {clients.length === 0 ? (
          <p className="text-center text-gray-500 italic">Aucun client trouvé.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Adresse</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.id}</TableCell>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.phone || '—'}</TableCell>
                  <TableCell>{client.address}</TableCell>
                  <TableCell className="flex gap-2">
                    <Link
                      href={route('clients.edit', client.id)}
                      className="px-3 py-1 bg-green-700 text-white rounded hover:bg-green-800 transition"
                    >
                      Modifier
                    </Link>
                    <button
                      onClick={() => handleDelete(client.id)}
                      disabled={processing}
                      className="px-3 py-1 bg-red-700 text-white rounded hover:bg-red-800 transition"
                    >
                      Supprimer
                    </button>
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
