import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
  facture: {
    id: number;
    client: string;
    montant: number;
    status: string;
  };
}

export default function Edit({ facture }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    client: facture.client,
    montant: facture.montant,
    status: facture.status,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    put(route('factures.update', facture.id));
  }

  return (
    <AppLayout>
      <Head title={`Modifier facture #${facture.id}`} />
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 space-y-6 bg-white rounded shadow"
      >
        <div>
          <Label htmlFor="client">Client *</Label>
          <Input
            id="client"
            value={data.client}
            onChange={e => setData('client', e.target.value)}
            type="text"
            required
          />
          {errors.client && <p className="text-red-600">{errors.client}</p>}
        </div>

        <div>
          <Label htmlFor="montant">Montant (€) *</Label>
          <Input
            id="montant"
            value={data.montant}
            onChange={e => setData('montant', parseFloat(e.target.value))}
            type="number"
            step="0.01"
            required
          />
          {errors.montant && <p className="text-red-600">{errors.montant}</p>}
        </div>

        <div>
          <Label htmlFor="status">Statut *</Label>
          <select
            id="status"
            className="w-full border rounded p-2"
            value={data.status}
            onChange={e => setData('status', e.target.value)}
            required
          >
            <option value="en attente">En attente</option>
            <option value="payée">Payée</option>
            <option value="annulée">Annulée</option>
          </select>
          {errors.status && <p className="text-red-600">{errors.status}</p>}
        </div>

        <Button type="submit" disabled={processing}>
          Modifier
        </Button>
      </form>
    </AppLayout>
  );
}
