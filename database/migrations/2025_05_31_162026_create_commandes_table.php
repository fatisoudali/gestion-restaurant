<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('commandes', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->decimal('price', 8, 2); // Bien définir le type decimal
    $table->integer('quantity');
    $table->unsignedBigInteger('category_id')->nullable();
    $table->foreign('category_id')->references('id')->on('categories')->onDelete('set null');
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commandes');
    }
};
