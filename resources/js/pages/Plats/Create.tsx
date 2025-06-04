import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface Category {
  id: number;
  name: string;
}

interface CreateProps {
  categories: Category[];
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Les Plats', href: '/plats' },
  { title: 'Créer un plat', href: '/plats/create' },
];

export default function Create({ categories }: CreateProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    description: '',
    price: '',
    category_id: '',
    image: null as File | null,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    post('/plats', {
      forceFormData: true,
      onSuccess: () => {
        reset();
        setPreviewImage(null);
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Créer un plat" />

      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-3xl font-semibold mb-4">Créer un nouveau plat</h1>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl space-y-4"
          encType="multipart/form-data"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Nom
            </label>
            <Input
              id="name"
              name="name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
            />
            {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium mb-1">
              Prix (€)
            </label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              value={data.price}
              onChange={(e) => setData('price', e.target.value)}
            />
            {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
          </div>

          <div>
            <label htmlFor="category_id" className="block text-sm font-medium mb-1">
              Catégorie
            </label>
            <select
              id="category_id"
              name="category_id"
              value={data.category_id}
              onChange={(e) => setData('category_id', e.target.value)}
              className="w-full border rounded px-2 py-2"
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category_id && (
              <p className="text-sm text-red-500 mt-1">{errors.category_id}</p>
            )}
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium mb-1">
              Image
            </label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setData('image', file);
                if (file) {
                  setPreviewImage(URL.createObjectURL(file));
                }
              }}
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Aperçu"
                className="w-32 h-32 object-cover mt-2 rounded"
              />
            )}
            {errors.image && <p className="text-sm text-red-500 mt-1">{errors.image}</p>}
          </div>

          <Button type="submit" disabled={processing}>
            {processing ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
        </form>
      </div>
    </AppLayout>
  );
}
