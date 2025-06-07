// resources/js/Pages/Plates.tsx
import React from 'react';
import { Head } from '@inertiajs/react';
import FrontLayout from '@/layouts/front/front-layout';

interface Plate {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface PlatesProps {
  plates: Plate[];
}

export default function plates({ plates }: PlatesProps) {
  return (
    <FrontLayout>
      <Head title="Nos Plats" />

      <section className="min-h-screen bg-gray-100 py-12 px-4">
        <h2 className="text-4xl font-bold text-center text-red-600 mb-10">Nos Délicieux Plats</h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
          {plates?.map(plate => (
            <div
              key={plate.id}
              className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden transition"
            >
              <img
                src={`/images/plates/${plate.image}`}
                alt={plate.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{plate.name}</h3>
                <p className="text-sm text-gray-600 mt-2">{plate.description}</p>
                <div className="mt-4 text-lg font-bold text-red-500">{plate.price} MAD</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </FrontLayout>
  );
}
