import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react'; 
import { type BreadcrumbItem } from '@/types';
import dishImg from '@/assets/un.jpg';
import orderImg from '@/assets/Capture.png';
import clientImg from '@/assets/marrakech.jpg';
import Img from '@/assets/gestion.jpeg';
import images from '@/assets/ist.jpg';
import order from '@/assets/photo.jpg';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Tableau de bord', href: '/dashboard' },
];

export default function Dashboard() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tableau de bord" />
      <div className="p-6 bg-gradient-to-tr from-red-100 to-orange-50 min-h-screen">
        <h1 className="text-3xl font-bold text-red-700 mb-6">Tableau de bord - Gestion du Restaurant</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Section Plats */}
          <Link href="/plats">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer">
              <img src={dishImg} alt="Plats" className="h-40 w-full object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">Nos Plats</h2>
                <p className="text-gray-600">Gérez les plats disponibles dans le menu du restaurant.</p>
              </div>
            </div>
          </Link>

          {/* Section Commandes */}
          <Link href="/commande">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer">
              <img src={orderImg} alt="Commandes" className="h-40 w-full object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">Commandes</h2>
                <p className="text-gray-600">Suivez les commandes des clients en temps réel.</p>
              </div>
            </div>
          </Link>

           <Link href="/facture">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer">
              <img src={Img} alt="Facture" className="h-40 w-full object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">Factures</h2>
                <p className="text-gray-600">Suivez les factures des clients .</p>
              </div>
            </div>
          </Link>

          {/* Section Clients */}
          <Link href="/clients">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer">
              <img src={clientImg} alt="Clients" className="h-40 w-full object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">Clients</h2>
                <p className="text-gray-600">Consultez et gérez les informations de vos clients fidèles.</p>
              </div>
            </div>
          </Link>
            <Link href="/categories">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer">
              <img src={images} alt="Categories" className="h-40 w-full object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
                <p className="text-gray-600">Consultez et gérez vos catégories de produits.</p>
              </div>
            </div>
          </Link>
           <Link href="/panier">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer">
              <img src={order} alt="Panier" className="h-40 w-full object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">Paniers</h2>
                <p className="text-gray-600">Consultez et gérez le contenu de votre panier.</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
