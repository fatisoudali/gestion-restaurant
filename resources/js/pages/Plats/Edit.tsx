import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Category {
  id: number;
  name: string;
}

interface Plat {
  id: number;
  name: string;
  price: number;
  category_id: number;
  image?: string;
}

interface EditProps {
  plat: Plat;
  categories: Category[];
}

const Edit: React.FC<EditProps> = ({ plat, categories }) => {
  const [previewImage, setPreviewImage] = useState(plat.image || '');

  const { data, setData, put, processing, errors } = useForm({
    name: plat.name,
    price: plat.price,
    category_id: plat.category_id,
    image: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('plats.update', plat.id), {
      forceFormData: true,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setData('image', file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Modifier le plat</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Nom du plat</Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
          />
          {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
        </div>

        <div>
          <Label htmlFor="price">Prix</Label>
          <Input
            id="price"
            type="number"
            value={data.price}
            onChange={(e) => setData('price', parseFloat(e.target.value))}
          />
          {errors.price && <div className="text-red-500 text-sm">{errors.price}</div>}
        </div>

        <div>
          <Label htmlFor="category">Catégorie</Label>
          <Select
            defaultValue={String(data.category_id)}
            onValueChange={(value) => setData('category_id', parseInt(value))}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Choisir une catégorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={String(cat.id)}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category_id && (
            <div className="text-red-500 text-sm">{errors.category_id}</div>
          )}
        </div>

        <div>
          <Label htmlFor="image">Image</Label>
          <Input type="file" onChange={handleImageChange} />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="h-24 mt-2 rounded shadow"
            />
          )}
          {errors.image && (
            <div className="text-red-500 text-sm">{errors.image}</div>
          )}
        </div>

        <Button type="submit" disabled={processing}>
          Modifier le plat
        </Button>
      </form>
    </div>
  );
};

export default Edit;
