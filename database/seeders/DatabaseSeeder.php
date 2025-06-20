<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Client;
use App\Models\Commande;
use App\Models\Facture;
use App\Models\LineCommande;
use App\Models\Paiement;
use App\Models\Plat;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
        ]);

        $categories = Category::factory(5)->create();

        $plats = Plat::factory(20)->recycle($categories)->create();

        $Clients = Client::factory(10)->create();

        $commandes = Commande::factory(30)->recycle($Clients)->create();

        //LineCommande::factory(50)->recycle($commandes, $plats)->create();
        LigneCommande::factory()->count(10)->create();

        Paiement::factory(30)->recycle($commandes)->create();

        Facture::factory(30)->recycle($commandes, $Clients)->create();
    }
}
