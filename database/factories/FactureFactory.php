<?php

namespace Database\Factories;

use App\Models\Client;
use App\Models\Commande;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Facture>
 */
class FactureFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'numero' => $this->faker->unique()->numerify('FAC-#####'),
            'date_emission' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'commande_id' => Commande::factory(),
            'client_id' => Client::factory(), 
        ];
    }
}
