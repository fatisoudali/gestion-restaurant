import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Categorie {
  id: number;
  name: string;
}

interface Props {
  categories: Categorie[];
}

export default function Create({ categories }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    price: '',
    category_id: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('plats.store'));
  };

  return (
    <AppLayout>
      <Head title="Créer un plat" />
      <div className="max-w-md mx-auto mt-8 bg-white shadow p-6 rounded">
        <h1 className="text-2xl font-bold mb-4">Ajouter un plat</h1>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Nom du plat */}
          <div>
            <Label htmlFor="name">Nom du plat</Label>
            <Input
              id="name"
              type="text"
              value={data.name}
              onChange={e => setData('name', e.target.value)}
              required
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Prix */}
          <div>
            <Label htmlFor="price">Prix (MAD)</Label>
            <Input
              id="price"
              type="number"
              value={data.price}
              onChange={e => setData('price', e.target.value)}
              required
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
          </div>

          {/* Catégorie (select) */}
          <div>
            <Label htmlFor="category">Catégorie</Label>
            <Select onValueChange={value => setData('category_id', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.id} value={String(cat.id)}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id}</p>}
          </div>

          {/* Bouton de soumission */}
          <Button type="submit" disabled={processing} className="w-full">
            Créer
          </Button>
        </form>
      </div>
    </AppLayout>
  );
}
