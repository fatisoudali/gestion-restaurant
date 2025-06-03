import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
  client: {
    id: number;
    name: string;
    email?: string;
    phone?: string;
  };
}

export default function Edit({ client }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    name: client.name,
    email: client.email || '',
    phone: client.phone || '',
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    put(route('clients.update', client.id));
  }

  return (
    <AppLayout>
      <Head title={`Modifier client: ${client.name}`} />
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
          {errors.name && <p className="text-red-600">{errors.name}</p>}
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
          Modifier
        </Button>
      </form>
    </AppLayout>
  );
}
