<?php

namespace Database\Factories;

use App\Models\Commande;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Paiement>
 */
class PaiementFactory extends Factory
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
            'montant' => $this->faker->randomFloat(2, 10, 1000),
            'methode' => $this->faker->randomElement(['carte', 'espèces']),
            'statut' => $this->faker->randomElement(['Payé', 'Non payé']),
        ];
    }
}
