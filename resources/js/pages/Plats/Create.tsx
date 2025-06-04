import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Props {
  categories: { id: number; name: string }[];
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Les Plats', href: '/plats' },
  { title: 'Créer un plat', href: '/plats/create' },
];

export default function Create({ categories }: Props) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    description: '',
    price: '',
    image: null as File | null,
    category_id: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    post('/plats', {
      forceFormData: true,
      onSuccess: () => reset(),
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Créer un plat" />

      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="mb-4 text-3xl font-semibold">Créer un nouveau plat</h1>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl space-y-4"
          encType="multipart/form-data"
        >
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Nom du plat
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
            <label htmlFor="description" className="mb-1 block text-sm font-medium">
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
            <label htmlFor="price" className="mb-1 block text-sm font-medium">
              Prix
            </label>
            <Input
              id="price"
              name="price"
              type="number"
              value={data.price}
              onChange={(e) => setData('price', e.target.value)}
            />
            {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Catégorie</label>
            <Select
              value={data.category_id}
              onValueChange={(value) => setData('category_id', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choisir une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category_id && <p className="text-sm text-red-500 mt-1">{errors.category_id}</p>}
          </div>

          <div>
            <label htmlFor="image" className="mb-1 block text-sm font-medium">
              Image
            </label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={(e) => setData('image', e.target.files?.[0] ?? null)}
            />
            {errors.image && <p className="text-sm text-red-500 mt-1">{errors.image}</p>}
          </div>

          <Button type="submit" disabled={processing}>
            {processing ? 'Ajout en cours...' : 'Ajouter le plat'}
          </Button>
        </form>
      </div>
    </AppLayout>
  );
}
