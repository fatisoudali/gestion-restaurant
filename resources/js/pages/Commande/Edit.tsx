import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Props {
  commande: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    category_id?: number;
  };
  categories: { id: number; name: string }[];
}

export default function Edit({ commande, categories }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    name: commande.name,
    price: commande.price,
    quantity: commande.quantity,
    category_id: commande.category_id || '',
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    put(route('commandes.update', commande.id));
  }

  return (
    <AppLayout>
      <Head title={`Modifier la commande: ${commande.name}`} />
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-6 bg-white rounded shadow">
        <div>
          <Label htmlFor="name">Nom *</Label>
          <Input
            id="name"
            value={data.name}
            onChange={e => setData('name', e.target.value)}
            type="text"
            required
          />
          {errors.name && <p className="text-red-600">{errors.name}</p>}
        </div>

        <div>
          <Label htmlFor="price">Prix *</Label>
          <Input
            id="price"
            value={data.price}
            onChange={e => setData('price', parseFloat(e.target.value))}
            type="number"
            required
          />
          {errors.price && <p className="text-red-600">{errors.price}</p>}
        </div>

        <div>
          <Label htmlFor="quantity">Quantité *</Label>
          <Input
            id="quantity"
            value={data.quantity}
            onChange={e => setData('quantity', parseInt(e.target.value))}
            type="number"
            required
          />
          {errors.quantity && <p className="text-red-600">{errors.quantity}</p>}
        </div>

        <div>
          <Label htmlFor="category_id">Catégorie</Label>
          <Select
            value={data.category_id?.toString()}
            onValueChange={(value) => setData('category_id', parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id.toString()}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category_id && <p className="text-red-600">{errors.category_id}</p>}
        </div>

        <Button type="submit" disabled={processing}>
          Modifier
        </Button>
      </form>
    </AppLayout>
  );
}
