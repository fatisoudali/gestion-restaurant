<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Plat;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Plat>
 */
class PlatFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'category_id' => Category::factory(),
            'name' => $this->faker->word(),
            'description' => $this->faker->sentence(rand(5, 15)),
            'price' => $this->faker->randomFloat(2, 5, 100),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Plat $plat): void {
            $plat->addMedia(database_path('factories/media/'.random_int(1, 5).'.jpg'))
                ->preservingOriginal()
                ->toMediaCollection('images');
        });
    }
}
