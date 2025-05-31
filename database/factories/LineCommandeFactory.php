<?php

namespace Database\Factories;

use App\Models\Commande;
use App\Models\Plat;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LineCommande>
 */
class LineCommandeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'commande_id' => Commande::factory(),
            'plat_id' => Plat::factory(),
            'quantite' => $qty = $this->faker->numberBetween(1, 5),
            'prix_unitaire' => $prixUnit = $this->faker->randomFloat(2, 5, 50),
            'total' => $qty * $prixUnit,
            'notes' => $this->faker->optional()->sentence(),
        ];
    }
}
