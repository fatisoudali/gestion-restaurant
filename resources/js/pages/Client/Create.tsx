import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { BreadcrumbItem } from '@/types';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Les Clients', href: '/clients' },
  { title: 'Créer un client', href: '#' },
];

export default function Create() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    post(route('clients.store'), {
      onSuccess: () => reset(),
      preserveScroll: true,
    });
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Ajouter un client" />
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 space-y-6 bg-white dark:bg-gray-900 rounded shadow"
      >
        {/* Nom */}
        <div>
          <Label htmlFor="name">Nom *</Label>
          <Input
            id="name"
            value={data.name}
            onChange={e => setData('name', e.target.value)}
            type="text"
            autoFocus
            required
            disabled={processing}
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            value={data.email}
            onChange={e => setData('email', e.target.value)}
            type="email"
            disabled={processing}
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Téléphone */}
        <div>
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            id="phone"
            value={data.phone}
            onChange={e => setData('phone', e.target.value)}
            type="text"
            disabled={processing}
          />
          {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
        </div>

        {/* Adresse */}
        <div>
          <Label htmlFor="address">Adresse</Label>
          <Input
            id="address"
            value={data.address}
            onChange={e => setData('address', e.target.value)}
            type="text"
            disabled={processing}
          />
          {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
        </div>

        {/* Bouton Ajouter */}
        <div className="flex justify-between items-center">
          <Button type="submit" disabled={processing}>
            Ajouter
          </Button>
        </div>
      </form>
    </AppLayout>
  );
}
