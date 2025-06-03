import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { type BreadcrumbItem } from '@/types';
import {Table,TableHeader,TableRow,TableHead,TableBody,TableCell,} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';



interface Commande {
  id: number;
  name: string;
  category: {
    name: string;
  };
  price: number;
  quantity: number;
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

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Les Commandes" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="flex justify-end">
          <Link
            href={route('commandes.create')}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Ajouter une commande
          </Link>
        </div>

        <h1 className="text-xl font-bold">Liste des commandes</h1>

        {commandes.length === 0 ? (
          <p className="text-center text-gray-500 italic">Aucune commande trouvée.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Quantité</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commandes.map((cmd) => (
                <TableRow key={cmd.id}>
                  <TableCell>{cmd.id}</TableCell>
                  <TableCell>{cmd.name}</TableCell>
                  <TableCell>{cmd.category?.name || '—'}</TableCell>
                  <TableCell>{cmd.price} MAD</TableCell>
                  <TableCell>{cmd.quantity}</TableCell>
                  <TableCell className="flex gap-2">
                    <Link
                      href={route('commandes.edit', cmd.id)}
                      className="flex items-center gap-1 rounded bg-green-600 px-2 py-1 text-white hover:bg-green-700"
                    >
                      <Pencil className="h-4 w-4" />
                      Modifier
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(cmd.id)}
                      disabled={processing}
                    >
                      <Trash className="h-4 w-4 mr-1" />
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
