import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    client_id: '',
    status: 'pending',
    type: 'sur_place',
    numTable: '',
    total: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('factures.store'));
  };

  return (
    <AppLayout>
      <Head title="Créer une facture" />

      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow space-y-6">
        <div>
          <Label htmlFor="client_id">ID Client *</Label>
          <Input
            id="client_id"
            value={data.client_id}
            onChange={(e) => setData('client_id', e.target.value)}
            required
          />
          {errors.client_id && <p className="text-red-600 text-sm">{errors.client_id}</p>}
        </div>

        <div>
          <Label htmlFor="status">Statut</Label>
          <Input
            id="status"
            value={data.status}
            onChange={(e) => setData('status', e.target.value)}
          />
          {errors.status && <p className="text-red-600 text-sm">{errors.status}</p>}
        </div>

        <div>
          <Label htmlFor="type">Type</Label>
          <select
            id="type"
            value={data.type}
            onChange={(e) => setData('type', e.target.value as 'sur_place' | 'emporter')}
            className="w-full border rounded p-2"
          >
            <option value="sur_place">Sur place</option>
            <option value="emporter">À emporter</option>
          </select>
          {errors.type && <p className="text-red-600 text-sm">{errors.type}</p>}
        </div>

        <div>
          <Label htmlFor="numTable">Numéro de Table</Label>
          <Input
            id="numTable"
            value={data.numTable}
            onChange={(e) => setData('numTable', e.target.value)}
          />
          {errors.numTable && <p className="text-red-600 text-sm">{errors.numTable}</p>}
        </div>

        <div>
          <Label htmlFor="total">Total</Label>
          <Input
            id="total"
            type="number"
            step="0.01"
            value={data.total}
            onChange={(e) => setData('total', e.target.value)}
          />
          {errors.total && <p className="text-red-600 text-sm">{errors.total}</p>}
        </div>

        <div>
          <Label htmlFor="notes">Notes</Label>
          <textarea
            id="notes"
            value={data.notes}
            onChange={(e) => setData('notes', e.target.value)}
            className="w-full border rounded p-2"
            rows={3}
          />
          {errors.notes && <p className="text-red-600 text-sm">{errors.notes}</p>}
        </div>

        <Button type="submit" disabled={processing}>
          Créer la facture
        </Button>
      </form>
    </AppLayout>
  );
}
