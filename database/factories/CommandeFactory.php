<?php

namespace Database\Factories;

use App\Enums\CommandeStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Commande>
 */
class CommandeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'client_id' => \App\Models\Client::factory(),
            'status' => $this->faker->randomElement(CommandeStatus::toArray()),
            'type' => $this->faker->randomElement(['emporter', 'sur_place']),
            'numTable' => $this->faker->optional()->numberBetween(1, 20),
            'total' => $this->faker->randomFloat(2, 10, 100),
            'notes' => $this->faker->optional()->sentence(),
        ];
    }
}
