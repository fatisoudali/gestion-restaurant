<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PlatController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CommandeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('categories', CategoryController::class);
    Route::resource('plats', PlatController::class);
    Route::get('/clients', [ClientController::class, 'index'])->name('Client.index');

    // Optionnel : pour gérer les autres actions client (CRUD)
    Route::get('/clients/create', [ClientController::class, 'create'])->name('clients.create');
    Route::post('/clients', [ClientController::class, 'store'])->name('clients.store');
    Route::get('/clients/{client}/edit', [ClientController::class, 'edit'])->name('clients.edit');
    Route::put('/clients/{client}', [ClientController::class, 'update'])->name('clients.update');
    Route::delete('/clients/{client}', [ClientController::class, 'destroy'])->name('clients.destroy');
    
    Route::get('/commande', [CommandeController::class, 'index'])->name('Commande.index');

    Route::get('/comande/create', [CommandeController::class, 'create'])->name('commandes.create');
    Route::post('/commande', [CommandeController::class, 'store'])->name('commandes.store');
    Route::get('/commande/{commande}/edit', [CommandeController::class, 'edit'])->name('commandes.edit');
    Route::put('/commande/{commande}', [CommandeController::class, 'update'])->name('commandes.update');
    Route::delete('/commande/{commande}', [CommandeController::class, 'destroy'])->name('commandes.destroy');
    
    
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
