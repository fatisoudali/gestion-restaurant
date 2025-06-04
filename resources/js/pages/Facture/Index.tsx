import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';

interface Client {
  id: number;
  name: string;
}

interface Facture {
  id: number;
  client: Client;
  status: string;
  type: 'emporter' | 'sur_place';
  numTable?: string;
  total: number;
  notes?: string;
}

interface Props {
  factures: Facture[];
}

export default function FactureIndex({ factures }: Props) {
  return (
    <AppLayout>
      <Head title="Liste des Factures" />

      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Liste des Factures</h1>
          <Link href={route('factures.create')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Nouvelle Facture
          </Link>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Table</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total (MAD)</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {factures.map(facture => (
              <TableRow key={facture.id}>
                <TableCell>{facture.id}</TableCell>
                <TableCell>{facture.client?.name}</TableCell>
                <TableCell>{facture.type === 'emporter' ? 'À emporter' : 'Sur place'}</TableCell>
                <TableCell>{facture.numTable ?? '—'}</TableCell>
                <TableCell>{facture.status}</TableCell>
                <TableCell>{facture.total.toFixed(2)}</TableCell>
                <TableCell className="flex gap-2">
                  <Link
                    href={route('factures.edit', facture.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded flex items-center gap-1"
                  >
                    <Pencil className="w-4 h-4" />
                    Modifier
                  </Link>
                  <Button variant="destructive" size="sm">
                    <Trash className="w-4 h-4 mr-1" />
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AppLayout>
  );
}
