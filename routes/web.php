<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PlatController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\FactureController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PanierController;
use Inertia\Inertia;

// Front routes
Route::get('/', function () {
    return Inertia::render('Frontend/home');
})->name('home');
Route::get('/plates', [PlatController::class, 'frontIndex'])->name('plates');
Route::get('/plats/{plat}/edit', [PlatController::class, 'edit'])->name('plats.edit');
Route::put('/plats/{id}', [PlatController::class, 'update'])->name('plats.update');
Route::get('/plats', function () {
    return Inertia::render('Plats/Index');
});

Route::get('/commandes', function () {
    return Inertia::render('Commande/Index');
});

Route::get('/clients', function () {
    return Inertia::render('Client/Index');
});


Route::get('/contact',function () {
    return Inertia::render('Frontend/contact');
})->name('contact');

Route::post('/contact', [ContactController::class, 'send'])->name('contact.send');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

   

    Route::resource('categories', CategoryController::class);
    Route::resource('plats', PlatController::class);
    route::resource('commande', CommandeController::class);
    

    Route::get('/clients', [ClientController::class, 'index'])->name('Client.index');

    // Optionnel : pour gérer les autres actions client (CRUD)
    Route::get('/clients/create', [ClientController::class, 'create'])->name('clients.create');
    Route::post('/clients', [ClientController::class, 'store'])->name('clients.store');
    Route::get('/clients/{client}/edit', [ClientController::class, 'edit'])->name('clients.edit');
    Route::put('/clients/{client}', [ClientController::class, 'update'])->name('clients.update');
    Route::delete('/clients/{client}', [ClientController::class, 'destroy'])->name('clients.destroy');
    
    Route::post('/panier/ajouter', [PanierController::class, 'ajouter']);
    Route::get('/panier', [PanierController::class, 'index'])->name('panier.index');
    Route::delete('/panier/{id}', [PanierController::class, 'destroy'])->name('panier.destroy');
    
    Route::get('/commande', [CommandeController::class, 'index'])->name('Commande.index');

    Route::get('/comande/create', [CommandeController::class, 'create'])->name('commandes.create');
    Route::post('/commande', [CommandeController::class, 'store'])->name('commandes.store');
    Route::get('/commande/{commande}/edit', [CommandeController::class, 'edit'])->name('commandes.edit');
    Route::put('/commande/{commande}', [CommandeController::class, 'update'])->name('commandes.update');
    Route::delete('/commande/{commande}', [CommandeController::class, 'destroy'])->name('commandes.destroy');
    Route::get('/commander/{id}', [CommandeController::class, 'show'])->name('commander.show');
    Route::get('/commande/{plat}', [CommandeController::class, 'create'])->name('commande.create');
    Route::post('/valider-commande', [CommandeController::class, 'valider']);

    Route::get('/facture', [FactureController::class, 'index'])->name('Facture.index');

    Route::get('/facture/create', [FactureController::class, 'create'])->name('factures.create');
    Route::post('/facture', [FactureController::class, 'store'])->name('factures.store');
    Route::get('/facture/{facture}/edit', [FactureController::class, 'edit'])->name('factures.edit');
    Route::put('/facture/{facture}', [FactureController::class, 'update'])->name('factures.update');
    Route::delete('/facture/{facture}', [FactureController::class, 'destroy'])->name('factures.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
