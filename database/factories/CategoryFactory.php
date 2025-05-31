<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->word(),
            'description' => $this->faker->sentence(rand(5, 15)),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Category $cat): void {
            $cat->addMedia(database_path('factories/media/'.random_int(1, 5).'.jpg'))
                ->preservingOriginal()
                ->toMediaCollection('images');
        });
    }
}
