import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Les Clients', href: '/clients' },
    { title: 'Créer une client', href: '/client/create' },
];

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    phone: '',
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    //post(route('clients.store'));
    post('/clients', {
            forceFormData: true,
            onSuccess: () => reset(),
        });
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Ajouter un client" />
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-6 bg-white rounded shadow">
        <div>
          <Label htmlFor="name">Nom *</Label>
          <Input
            id="name"
            value={data.name}
            onChange={e => setData('name', e.target.value)}
            type="text"
            autoFocus
            required
          />
          {errors.name && 
          (<p className="text-red-600">{errors.name}</p>
            
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            value={data.email}
            onChange={e => setData('email', e.target.value)}
            type="email"
          />
          {errors.email && <p className="text-red-600">{errors.email}</p>}
        </div>

        <div>
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            id="phone"
            value={data.phone}
            onChange={e => setData('phone', e.target.value)}
            type="text"
          />
          {errors.phone && <p className="text-red-600">{errors.phone}</p>}
        </div>

        <Button type="submit" disabled={processing}>
          Ajouter
        </Button>
      </form>
    </AppLayout>
  );
}
