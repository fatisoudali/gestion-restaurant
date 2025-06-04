import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Eye, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Facture {
  id: number;
  client: {
    name: string;
  };
  montant: number;
  status: string;
  created_at: string;
}

interface Props {
  factures: Facture[];
  flash?: {
    success?: string;
  };
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Les Factures',
    href: '/factures',
  },
];

export default function Index({ factures, flash }: Props) {
  const { delete: destroy, processing } = useForm();
  const { props } = usePage();
  const [filteredFactures, setFilteredFactures] = useState<Facture[]>(factures);

  useEffect(() => {
    if (props.flash?.success) {
      toast(props.flash.success);
    }
  }, [props.flash, toast]);

  const handleDelete = (id: number) => {
    if (confirm('Voulez-vous vraiment supprimer cette facture ?')) {
      destroy(route('factures.destroy', id));
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    const filtered = factures.filter(f => f.client.name.toLowerCase().includes(query));
    setFilteredFactures(filtered);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Les Factures" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="flex justify-end">
          <Input
            type="text"
            placeholder="Rechercher une facture par client..."
            className="w-64"
            onChange={handleSearch}
          />
        </div>

        <h1 className="text-xl font-bold">Liste des factures</h1>

        {filteredFactures.length === 0 ? (
          <p className="text-center text-gray-500 italic">Aucune facture trouvée.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFactures.map(facture => (
                <TableRow key={facture.id}>
                  <TableCell>{facture.id}</TableCell>
                  <TableCell>{facture.client?.name || '—'}</TableCell>
                  <TableCell>{facture.montant} MAD</TableCell>
                  <TableCell>{facture.status}</TableCell>
                  <TableCell>{new Date(facture.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="flex gap-2">
                    <Link
                      href=""
                      className="flex items-center gap-1 rounded bg-gray-600 px-2 py-1 text-white hover:bg-gray-700"
                    >
                      <Eye className="h-4 w-4" />
                      Voir
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(facture.id)}
                      disabled={processing}
                    >
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
